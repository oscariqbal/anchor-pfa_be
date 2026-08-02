[Back](https://github.com/oscariqbal/anchor-pfa_be/tree/main)

### Authentication

#### Create account

Create user account

1. **Input Spesification**

| Field | Type | Properties |
|-------|------|------------|
| name | string |Required |
| email | string | Required |
| password | string | required, min 8 |

2. **Business Rule**  


3. **System Process**

| Precondition | Process | Postcondition |
|--------------|---------|---------------|

#### View account
#### Edit account
#### Remove account

    | Feature | Description | Input | Precondition | Process | Output |
    |---------|-------------|-------|--------------|---------|--------|
    | Create account | Create user account | • Name<br>• Email<br>• Password | • Name is required<br>• Email is required<br>• Email must be unique<br>• Password is required | • Validate data<br>• Hash password<br>• Save account | • Account successfully created |
    | Read account information |
    | Edit account information |
    | Remove account |

    Feature
    Description
    Input
    Validasi input
    Business Rule
    System Precondition
    Process
    System Postcondition