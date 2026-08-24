# MongoDB Setup Guide for Escro Platform

This application includes full MongoDB and Mongoose database integration for storing users, escrow contracts, disputes, transactions, and bank accounts.

---

## 1. Get a MongoDB Connection String

You can use **MongoDB Atlas** (Free cloud database) or a local MongoDB instance:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 Cluster**.
3. Under **Database Access**, create a database user and password.
4. Under **Network Access**, add IP `0.0.0.0/0` (allow from anywhere so Vercel can connect).
5. Click **Connect** → **Drivers** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/escro_db?retryWrites=true&w=majority
   ```

---

## 2. Configure Environment Variables

### In Vercel:
1. Go to your **Vercel Dashboard** → Select **ESCROW** project.
2. Go to **Settings** → **Environment Variables**.
3. Add:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/escro_db?retryWrites=true&w=majority`
4. Redeploy or trigger a build.

### In Local Development (`.env`):
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/escro_db?retryWrites=true&w=majority
```

---

## 3. Test & Seed Database

Once `MONGODB_URI` is added, you can test connectivity and seed initial data using the built-in API endpoints:

- **Check Database Status**:
  `GET https://escrow-trust-platform.vercel.app/api/db/status`
  
- **Seed Initial Collections**:
  `POST https://escrow-trust-platform.vercel.app/api/db/seed`

---

## 4. Mongoose Data Models

The following schemas are defined in `src/lib/models/index.ts`:

| Model | Collection | Description |
|---|---|---|
| `UserModel` | `users` | User profiles, roles, KYC status, and balance stats |
| `EscrowModel` | `escrows` | Escrow contracts, milestone payments, status tracking |
| `DisputeModel` | `disputes` | Dispute cases, evidence uploads, and resolutions |
| `TransactionModel` | `transactions` | Immutable financial ledger entries |
