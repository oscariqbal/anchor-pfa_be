# Wallet

## API Design

---

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST |  `/wallets` | Create a wallet |
| PATCH | `/wallets/:id` | Edit a wallet |
| DELETE | `wallets/:id` | Delete a wallet |
| POST | `/wallets/:id/archive` | Archive a wallet |
| POST | `wallets/:id/dearchive` | Dearchive a wallet |
| GET | `/wallets/:id` | View a wallet
| GET | `/wallets` | View all wallets |


### View wallet
```text
{
    "data": {
        "id": 0,
        "type": "",
        "name": "",
        "description": ""
    }
}
```

### View all wallets
```text
{
    "data": [
        {
            "id": 0,
            "type": "",
            "name": "",
            "description": ""
        },
        {
            "id": 0,
            "type": "",
            "name": "",
            "description": ""
        },
    ]
}
```