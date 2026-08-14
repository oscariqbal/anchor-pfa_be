# Authentication API Design

---

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | View account |

## 1. Request

### Register

```text
{
    "name": "",
    "email": "",
    "password": ""
}
```

### Login

```text
{
    "email": "",
    "password": ""
}
```
### Logout

```text
{

}
```
### View account

```text
{
  
}
```

## 2. Response

### Success

```text
{
    "message": "View account success",
    "data": {
      "id": ,
      "name": "",
      "email": ""
    },
    "errors": null,
}
```

### Validation error

```text
{
    "message": "Validation failed",
    "data": null,
    "errors": {
        "field": {
            "email": [
                "Invalid email address",
            ]
        }
    }
}
```

### Business error

```text
{
    "message": "Email already exist",
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