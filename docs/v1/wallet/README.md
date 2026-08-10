# Wallet Management

Wallet define user's money location and act as an identity to a transaction that represent user's financial decision's money location.

Decisions made:
1. About fields  
    - none

2. About edit and delete  
    - Edit and/or delete wallet are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and/or delete decision are all on user's hand. User must be aware of the consequences before committing to edit and/or delete the wallet. Surely we will warn and explain all the consequences.
    - Edit wallet may affect: Transaction (Will also change transaction money location)
    - Delete wallet may affect: Transaction (Will also delete transaction related)
    - There will be kind of hard confirmation on wallet deletion: "This wallet contains 2.708 transaction. Destroying this wallet will permanently remove all related data. Are you sure? Type DESTROY to confirm"
    - On the other hand, we provide 'archive' action to hide and block wallet from being used again, while maintaining the transaction related.

## 1. Create wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | Wallet's ownership |
| type | enum | required | Wallet's type (CASH, BANK, E_MONEY) |
| name | string | required | Wallet's name |
| description | string | optional | Wallet's description |
| isArchived | boolean | required | Wallet's status (active/archived) |

### **Business Rule**  

- userId automatically collect from user session
- isArchived automatically set to FALSE

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

### **Business Rule**  

- If type was changed, type is required
- If name was changed, name is required

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

- Delete on wallet will also delete the related transaction

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet data
- (user confirm deletion)
- If the wallet have transaction, delete them first
- Delete wallet data

### **System Postcondition**

- Wallet deleted
- If the wallet have transaction, related transaction deleted

## 4. Archive wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |
| isArchived | boolean | required | Wallet's status (active/archived) |

### **Business Rule**  

- After archived, wallet will be hide and blocked from any other action except de-archive
- Wallet's isArchived must be FALSE

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet data
- (user confirm archive)
- set wallet's isArchived to TRUE

### **System Postcondition**

- Wallet's isArchived set to TRUE

## 5. Unarchive wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |
| isArchived | boolean | required | Wallet's status (active/archived) |

### **Business Rule**  

- After unarchived, wallet will not be hide and blocked and can be actively used for any other action
- Wallet's isArchived must be TRUE

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet data
- (user confirm archive)
- set wallet's isArchived to FALSE

### **System Postcondition**

- Wallet's isArchived set to FALSE

## 6. View wallet detail

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

## 7. See wallet list

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