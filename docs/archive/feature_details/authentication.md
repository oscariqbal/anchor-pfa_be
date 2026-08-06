[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Authentication

## 1. Create account

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| name | string | Required | User's name |
| email | string | Required | User's email |
| password | string | Required | User's password |

### **Business Rule**  

- none

### **System Precondition**

- none

### **System Process**

- Validate data
- Hash password
- Create new account data

### **System Postcondition**

- Account created

## 2. View account

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | User's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Get account data from database
- Send account data

### **System Postcondition**

- Account information displayed

## 3. Edit account

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | User's id |
| name | string | optional | User's name |
| email | string | optional | User's email |
| password | string | optional | User's password |

### **Business Rule**  

- If name is changed, name must be filled
- If email is changed, email must be filled
- If password is changed, password must be filled
- If password is changed, new password must be different from old password

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Get user's account data
- (user input new data)
- Validate changed account data
- Save new account data
- Send user's new account data

### **System Postcondition**

- User's account updated

## 4. Remove account

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | User's id |

### **Business Rule**  

-

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Delete account

### **System Postcondition**

- Account deleted
- User's login session removed