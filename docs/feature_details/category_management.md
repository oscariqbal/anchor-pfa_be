[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Category Management

Category define user's transactions category and act as a tool to help users classify. There are no strict rules to provide flexibility that align with the app main purpose.

Decisions made:
- 

## 1. Create wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | Wallet's ownership |
| type | enum | required | Wallet's type (CASH, BANK, E_MONEY) |
| name | string | required | Wallet's name |
| description | string | optional | Wallet's description |
| color | enum | required | Wallet's color |
| archived | boolean | required | Wallet's status (active/archived) |

### **Business Rule**  

- color must be one of color list provided

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Validate wallet data
- Create new wallet data

### **System Postcondition**

- Wallet created

## 2. Edit wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |
| type | enum | optional | Wallet's type (CASH, BANK, E_MONEY) |
| name | string | optional | Wallet's name |
| description | string | optional | Wallet's description |
| color | enum | optional | Wallet's color |

### **Business Rule**  

- Wallet acting as an identity to transaction records and transaction plan. Updating the wallet may affect some transaction records and transaction plan. User must be aware of the consequences before committing to edit the wallet

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet data
- Send wallet data
- (user input new data and confirm update)
- Validate changed wallet data
- Save wallet data
- Send new wallet data

### **System Postcondition**

- Wallet updated

## 3. Delete wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |

### **Business Rule**  

- Wallet acting as an identity to transaction records and transaction plan. Deleting the wallet that already has transaction records or transaction plan is prohibited. As a solution, there are "Archive" option to hide and block the wallet. User can also delete all the connected transaction before deleting the wallet

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet records data
- (user confirm deletion)
- Delete wallet records data

### **System Postcondition**

- wWllet records deleted

## 4. View wallet detail

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get all data from one wallet
- Send wallet data

### **System Postcondition**

- Wallet detailed data displayed

## 5. See wallet list

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet data gradually
- Send wallet data

### **System Postcondition**

- Wallet data list displayed