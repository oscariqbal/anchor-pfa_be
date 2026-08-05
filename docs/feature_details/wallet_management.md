[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Wallet Management

Wallet define user's money location and act as an identity to a transaction records and plans that represent user's financial decision's money location.

Decisions made:
1. About fields  
    - none

2. About edit and delete  
    - Edit and/or delete wallet are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and/or delete decision are all on user's hand. User must be aware of the consequences before committing to edit and/or delete the wallet. Surely we will warn and explain all the consequences.
    - Edit wallet may affect: Transaction Records (Will also change transaction records money location), Transaction Plan (Will also change transaction plan money location)
    - Delete wallet may affect: Transaction Records (Will also delete transaction records related), Transaction Plan (Will also delete transaction plan related)
    - There will be kind of hard confirmation on wallet deletion: "This wallet contains 2.708 records and 24 plans. Destroying this wallet will permanently remove all related data. Are you sure? Type DESTROY to confirm"
    - On the other hand, we provide 'archive' action to hide and block wallet from being used again, while maintaining the transaction related.

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

- userId automatically collect from user session
- color must be one of color list provided
- archived automatically set to 0 (no)

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

- If type was changed, type is required
- If name was changed, name is required
- If color was changed, color is required

### **System Precondition**

- User must be active
- There must be at least one wallet
- If color was changed, color is required
- If color was changed, color must be one of color list provided

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

- Delete on wallet will also delete the related transaction records and/or transaction plan

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet data
- (user confirm deletion)
- If the wallet have transaction records and/or transaction plan, delete them first
- Delete wallet data

### **System Postcondition**

- Wallet deleted
- If the wallet have transaction records and/or transaction plan, related transaction records and/or transaction plan deleted

## 4. Archive wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |
| archived | boolean | required | Wallet's status (active/archived) |

### **Business Rule**  

- After archived, wallet will be hide and blocked from any other action except de-archive
- Wallet's archived must be 0 (no)

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet records data
- (user confirm archive)
- set wallet's archived to 1 (yes)

### **System Postcondition**

- Wallet's archived set to 1

## 5. Dearchive wallet

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| walletId | number | required | Wallet's id |
| archived | boolean | required | Wallet's status (active/archived) |

### **Business Rule**  

- After dearchived, wallet will not be hide and blocked and can be actively used for any other action
- Wallet's archived must be 1 (yes)

### **System Precondition**

- User must be active
- There must be at least one wallet

### **System Process**

- Identificate user
- Get wallet records data
- (user confirm archive)
- set wallet's archived to 0 (no)

### **System Postcondition**

- Wallet's archived set to 0

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