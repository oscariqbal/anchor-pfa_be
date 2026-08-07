# Authentication

## 1. Register

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

## 2. Login

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| email | string | Required | User's email |

### **Business Rule**  

- none

### **System Precondition**

- none

### **System Process**

- Validate data
- Generate token
- Send cookie
- Logging in

### **System Postcondition**

- Logged in

## 3. Logout

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|

### **Business Rule**  

- none

### **System Precondition**

- none

### **System Process**

- Clear cookie
- Logging out

### **System Postcondition**

- Logged out

## 4. View account

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
- Get user's account data from database
- Send user's account data

### **System Postcondition**

- User's account information displayed