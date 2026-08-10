# Wallet

## API Design

---

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST |  `/wallets` | Create a wallet |
| PATCH | `/wallets/:id` | Edit a wallet |
| DELETE | `wallets/:id` | Delete a wallet |
| POST | `/wallets/:id/archive` | Archive a wallet |
| POST | `wallets/:id/unarchive` | Unarchive a wallet |
| GET | `/wallets/:id` | View a wallet
| GET | `/wallets` | View all wallets |
