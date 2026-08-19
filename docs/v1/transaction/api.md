# Transaction

## API Design

---

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST |  `/transactions` | Create a transaction |
| PATCH | `/transactions/:id` | Update a transaction |
| DELETE | `transactions/:id` | Delete a transaction |
| GET | `/transactions/:id` | View a transaction
| GET | `/transactions` | View all transactions |

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

### View a transaction

```text

```

### View all transactions

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