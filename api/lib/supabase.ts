const getBaseUrl = () => `${process.env.SUPABASE_URL}/rest/v1`;
const getKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY!;
const getHeaders = () => ({
  apikey: getKey(),
  Authorization: `Bearer ${getKey()}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
});

export async function sbQuery(table: string, params?: { select?: string; filters?: Record<string, string>; order?: string; limit?: number; single?: boolean; countOnly?: boolean }) {
  const url = new URL(`${getBaseUrl()}/${table}`);
  url.searchParams.set('select', params?.select || '*');
  if (params?.filters) {
    for (const [k, v] of Object.entries(params.filters)) {
      url.searchParams.set(k, v);
    }
  }
  if (params?.order) url.searchParams.set('order', params.order);
  if (params?.limit) url.searchParams.set('limit', String(params.limit));

  const headers: Record<string, string> = { ...getHeaders() };
  if (params?.countOnly) {
    headers.Prefer = 'count=exact';
    headers.Range = '0-0';
  }

  const res = await fetch(url.toString(), { headers });
  if (params?.countOnly) {
    const cr = res.headers.get('content-range');
    const total = cr ? parseInt(cr.split('/')[1]) : 0;
    return { data: null, count: total, error: null };
  }
  const text = await res.text();
  const rows = text ? JSON.parse(text) : [];
  if (!res.ok) return { data: null, error: { message: text || res.statusText } };
  if (params?.single) return { data: rows[0] || null, error: null };
  return { data: rows, error: null };
}

export async function sbInsert(table: string, row: Record<string, any> | Record<string, any>[], opts?: { single?: boolean }) {
  const res = await fetch(`${getBaseUrl()}/${table}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(row),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : [];
  if (!res.ok) return { data: null, error: { message: text } };
  if (opts?.single) return { data: Array.isArray(data) ? data[0] : data, error: null };
  return { data, error: null };
}

export async function sbUpdate(table: string, updates: Record<string, any>, filter: { col: string; val: string }) {
  const url = `${getBaseUrl()}/${table}?${filter.col}=eq.${encodeURIComponent(filter.val)}`;
  const res = await fetch(url, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(updates) });
  const text = await res.text();
  const data = text ? JSON.parse(text) : [];
  if (!res.ok) return { data: null, error: { message: text } };
  return { data: data[0] || null, error: null };
}

export async function sbDelete(table: string, filter: { col: string; val: string }) {
  const url = `${getBaseUrl()}/${table}?${filter.col}=eq.${encodeURIComponent(filter.val)}`;
  const res = await fetch(url, { method: 'DELETE', headers: getHeaders() });
  if (!res.ok) { const t = await res.text(); return { data: null, error: { message: t } }; }
  return { data: null, error: null };
}

export async function sbRpc(fnName: string, params?: Record<string, any>) {
  const url = `${getBaseUrl()}/rpc/${fnName}`;
  const res = await fetch(url, { method: 'POST', headers: getHeaders(), body: JSON.stringify(params || {}) });
  if (!res.ok) return { data: null, error: { message: res.statusText } };
  const data = await res.json();
  return { data, error: null };
}

class Query {
  table: string;
  _select = '*';
  _filters: [string, string, string][] = [];
  _single = false;
  _countOnly = false;
  _order?: string;
  _limit?: number;

  constructor(table: string) { this.table = table; }
  select(cols = '*', opts?: { count?: string; head?: boolean }) { this._select = cols; if (opts?.head) this._countOnly = true; return this; }
  eq(col: string, val: string) { this._filters.push([col, 'eq', val]); return this; }
  single() { this._single = true; return this; }
  order(col: string, opts?: { ascending?: boolean }) { this._order = `${col}.${opts?.ascending !== false ? 'asc' : 'desc'}`; return this; }
  limit(n: number) { this._limit = n; return this; }

  then(resolve: any, reject?: any): any {
    const filters: Record<string, string> = {};
    for (const [col, op, val] of this._filters) filters[col] = `${op}.${val}`;
    const p: any = { select: this._select, filters, single: this._single, countOnly: this._countOnly };
    if (this._order) p.order = this._order;
    if (this._limit) p.limit = this._limit;
    return sbQuery(this.table, p).then(resolve, reject);
  }
}

class Insert {
  table: string;
  rows: Record<string, any>[];
  constructor(table: string, rows: Record<string, any>[]) { this.table = table; this.rows = rows; }
  select(cols = '*') {
    const self = this;
    return {
      single() {
        return { then(resolve: any, reject?: any) { return sbInsert(self.table, self.rows.length === 1 ? self.rows[0] : self.rows, { single: true }).then(resolve, reject); } };
      },
      then(resolve: any, reject?: any) { return sbInsert(self.table, self.rows.length === 1 ? self.rows[0] : self.rows).then(resolve, reject); },
    };
  }
  single() { return this.select().single(); }
  then(resolve: any, reject?: any) { return sbInsert(this.table, this.rows.length === 1 ? this.rows[0] : this.rows).then(resolve, reject); }
}

class Update {
  table: string;
  updates: Record<string, any>;
  _col?: string;
  _val?: string;
  constructor(table: string, updates: Record<string, any>) { this.table = table; this.updates = updates; }
  eq(col: string, val: string) { this._col = col; this._val = val; return this; }
  then(resolve: any, reject?: any) { return sbUpdate(this.table, this.updates, { col: this._col!, val: this._val! }).then(resolve, reject); }
}

class Del {
  table: string;
  _col?: string;
  _val?: string;
  constructor(table: string) { this.table = table; }
  eq(col: string, val: string) { this._col = col; this._val = val; return this; }
  then(resolve: any, reject?: any) { return sbDelete(this.table, { col: this._col!, val: this._val! }).then(resolve, reject); }
}

class Table {
  constructor(private table: string) {}
  select(cols = '*', opts?: { count?: string; head?: boolean }) { return new Query(this.table).select(cols, opts); }
  insert(row: Record<string, any> | Record<string, any>[]) { return new Insert(this.table, Array.isArray(row) ? row : [row]); }
  update(updates: Record<string, any>) { return new Update(this.table, updates); }
  delete() { return new Del(this.table); }
}

function from(table: string) { return new Table(table); }

export const supabase = { from };
