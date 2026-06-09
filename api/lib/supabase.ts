type Result = { data: any; count: number | null; error: { message: string } | null };

const URL_BASE = () => {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL is not set');
  return `${url}/rest/v1`;
};

const KEY = () => {
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!k) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  return k;
};

function headers(extra?: Record<string, string>) {
  return {
    apikey: KEY(),
    Authorization: `Bearer ${KEY()}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
    ...extra,
  };
}

class QueryBuilder {
  table: string;
  _select = '*';
  _filters: [string, string, string][] = [];
  _inFilters: [string, string[]][] = [];
  _order?: { col: string; asc: boolean };
  _limit?: number;
  _offset?: number;
  _countOnly = false;
  _single = false;

  constructor(table: string) { this.table = table; }

  select(cols = '*', opts?: { count?: string; head?: boolean }) {
    this._select = cols;
    if (opts?.head) this._countOnly = true;
    return this;
  }

  eq(col: string, val: string) { this._filters.push([col, 'eq', val]); return this; }
  in(col: string, vals: string[]) { this._inFilters.push([col, vals]); return this; }
  gte(col: string, val: string) { this._filters.push([col, 'gte', val]); return this; }
  single() { this._single = true; return this; }
  order(col: string, opts?: { ascending?: boolean }) { this._order = { col, asc: opts?.ascending ?? true }; return this; }
  range(from: number, to: number) { this._offset = from; this._limit = to - from + 1; return this; }
  limit(n: number) { this._limit = n; return this; }

  private buildUrl(countMode = false): string {
    let url = `${URL_BASE()}/${this.table}?select=${this._select}`;
    for (const [col, op, val] of this._filters) url += `&${col}=${op}.${encodeURIComponent(val)}`;
    for (const [col, vals] of this._inFilters) url += `&${col}=in.(${vals.map(v => encodeURIComponent(v)).join(',')})`;
    if (this._order && !countMode) url += `&order=${this._order.col}.${this._order.asc ? 'asc' : 'desc'}`;
    if (this._limit != null && !countMode) url += `&limit=${this._limit}`;
    if (this._offset != null && !countMode) url += `&offset=${this._offset}`;
    return url;
  }

  then(resolve: any, reject?: any): any {
    return this.execute().then(resolve, reject);
  }

  async execute(): Promise<Result> {
    try {
      if (this._countOnly) {
        const res = await fetch(this.buildUrl(true), { headers: headers({ Prefer: 'count=exact', Range: '0-0' }) });
        const countHeader = res.headers.get('content-range');
        const total = countHeader ? parseInt(countHeader.split('/')[1]) : 0;
        return { data: null, count: total, error: null };
      }

      const res = await fetch(this.buildUrl(), { headers: headers() });
      const text = await res.text();
      const rows = text ? JSON.parse(text) : [];

      if (!res.ok) return { data: null, count: null, error: { message: text || res.statusText } };
      if (this._single) return { data: rows[0] || null, count: null, error: null };
      return { data: rows, count: null, error: null };
    } catch (err: any) {
      return { data: null, count: null, error: { message: err.message } };
    }
  }
}

class InsertBuilder {
  private table: string;
  private rows: Record<string, any>[];

  constructor(table: string, rows: Record<string, any>[]) {
    this.table = table;
    this.rows = rows;
  }

  select(cols = '*') {
    const q = new QueryBuilder(this.table);
    q._select = cols;
    q._single = true;
    return q;
  }

  single() {
    return this.select();
  }

  then(resolve: any, reject?: any): any {
    return this.execute().then(resolve, reject);
  }

  async execute(): Promise<Result> {
    try {
      const res = await fetch(`${URL_BASE()}/${this.table}`, {
        method: 'POST', headers: headers(), body: JSON.stringify(this.rows),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      if (!res.ok) return { data: null, count: null, error: { message: text } };
      return { data: Array.isArray(this.rows) && this.rows.length === 1 ? data[0] : data, count: null, error: null };
    } catch (err: any) {
      return { data: null, count: null, error: { message: err.message } };
    }
  }
}

class UpdateBuilder {
  private table: string;
  private updates: Record<string, any>;
  private _col?: string;
  private _val?: string;

  constructor(table: string, updates: Record<string, any>) {
    this.table = table;
    this.updates = updates;
  }

  eq(col: string, val: string) { this._col = col; this._val = val; return this; }

  then(resolve: any, reject?: any): any {
    return this.execute().then(resolve, reject);
  }

  async execute(): Promise<Result> {
    try {
      const url = `${URL_BASE()}/${this.table}?${this._col}=eq.${encodeURIComponent(this._val!)}`;
      const res = await fetch(url, { method: 'PATCH', headers: headers(), body: JSON.stringify(this.updates) });
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      if (!res.ok) return { data: null, count: null, error: { message: text } };
      return { data: data[0] || null, count: null, error: null };
    } catch (err: any) {
      return { data: null, count: null, error: { message: err.message } };
    }
  }
}

class DeleteBuilder {
  private table: string;
  private _col?: string;
  private _val?: string;

  constructor(table: string) { this.table = table; }

  eq(col: string, val: string) { this._col = col; this._val = val; return this; }

  then(resolve: any, reject?: any): any {
    return this.execute().then(resolve, reject);
  }

  async execute(): Promise<Result> {
    try {
      const url = `${URL_BASE()}/${this.table}?${this._col}=eq.${encodeURIComponent(this._val!)}`;
      const res = await fetch(url, { method: 'DELETE', headers: headers() });
      if (!res.ok) { const t = await res.text(); return { data: null, count: null, error: { message: t } }; }
      return { data: null, count: null, error: null };
    } catch (err: any) {
      return { data: null, count: null, error: { message: err.message } };
    }
  }
}

class TableOp {
  constructor(private table: string) {}

  select(cols = '*', opts?: { count?: string; head?: boolean }) {
    const q = new QueryBuilder(this.table);
    return q.select(cols, opts);
  }

  insert(row: Record<string, any> | Record<string, any>[]) {
    return new InsertBuilder(this.table, Array.isArray(row) ? row : [row]);
  }

  update(updates: Record<string, any>) {
    return new UpdateBuilder(this.table, updates);
  }

  delete() {
    return new DeleteBuilder(this.table);
  }
}

function rpc(fnName: string, params?: Record<string, any>) {
  return {
    maybeSingle: async (): Promise<Result> => {
      const url = `${URL_BASE()}/rpc/${fnName}`;
      const res = await fetch(url, { method: 'POST', headers: headers(), body: JSON.stringify(params || {}) });
      if (!res.ok) return { data: null, count: null, error: { message: res.statusText } };
      const data = await res.json();
      return { data, count: null, error: null };
    }
  };
}

function from(table: string) { return new TableOp(table); }

export const supabase = { from, rpc };
