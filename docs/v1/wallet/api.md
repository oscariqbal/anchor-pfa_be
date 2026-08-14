# Wallet

## API Design

---

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST |  `/wallets` | Create a wallet |
| PATCH | `/wallets/:id` | Edit a wallet |
| DELETE | `wallets/:id` | Delete a wallet |
| GET | `/wallets/:id` | View a wallet
| GET | `/wallets` | View all wallets |
| POST | `/wallets/:id/archive` | Archive a wallet |
| POST | `wallets/:id/dearchive` | Dearchive a wallet |

## 1. Request

### Create

```text
{
    "type": "",
    "name": "",
    "description": ""
}
```

### Edit

```text
{
    "description": ""
}
```

### Delete

```text

```

### View a wallet

```text

```

### View all wallets

```text

```

### Archive a wallet

```text

```

### Dearchive a wallet

```text

```

## 2. Response

### Success

```text
{
    "message": "",
    "data": {
        "id": ,
        "type": "",
        "name": "",
        "description": "",
        "isArchived": ,
        "createdAt": "",
        "updatedAt": "",
        "userId": 
    },
    "errors": null
}
```

### Validation error

```text
{
    "message": "Request validation failed",
    "data": null,
    "errors": {
        "field": {
            "description": [
                "Wallet description must be a string"
            ]
        }
    }
}
```

### Business error

```text
{
    "message": "Wallet not found",
    "data": null,
    "errors": null
}
```

### Exceptional error

```text
{
    "message": "Internal server error",
    "data": null,
    "errors": null
}
```