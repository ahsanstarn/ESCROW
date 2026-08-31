import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{
  connected: boolean;
  conn: typeof mongoose | null;
  error?: string;
}> {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!uri) {
    return {
      connected: false,
      conn: null,
      error: 'MONGODB_URI environment variable is not defined',
    };
  }

  if (cached!.conn) {
    return { connected: true, conn: cached!.conn };
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached!.promise = mongoose.connect(uri, opts).then((m) => m);
  }

  try {
    cached!.conn = await cached!.promise;
    return { connected: true, conn: cached!.conn };
  } catch (e: any) {
    cached!.promise = null;
    return { connected: false, conn: null, error: e?.message || 'Database connection error' };
  }
}

export default connectToDatabase;
