# Transaction

Transaction define user's financial decision that users want to track.

Decisions made:
1. About fields 
    - All transaction type be in one use case because there are not many different system process

2. About edit and delete  
    - Edit and/or delete are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and/or delete decision are all on user's hand. User must be aware of the consequences before committing to edit and/or delete the transaction. Surely we will warn and explain all the consequences.

In the end, we want to ensure that transaction can represent user's financial decision as pure as possible, while maintaining the flexibility, simplicity and convenience which is align with the app main purposes.

## 1. Create transaction

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| type | enum | required | Transaction's type (INCOME, EXPENSE, TRANSFER) |
| amount | number | required | Amount of money |
| note | string | required | Transaction's note |
| sourceWalletId | number | optional | Transaction's source wallet |
| destinationWalletId | number | optional | Transaction's destination wallet |

### **Business Rule**  

- If type is INCOME, sourceWalletId is null
- If type is INCOME, destinationWallet is required

- If type is EXPENSE, sourceWallet is required
- If type is EXPENSE, destinationWallet is null

- If type is TRANSFER, sourceWalletId and destinationWalletid is required
- If type is TRANSFER, sourceWalletId and destinationWalletid cannot be the same

- If type is TRANSFER / EXPENSE, amount cannot exceed sourceWalletId available balance

- sourceWalletId must provided in wallet
- destinationWalletId must provided in wallet

- amount is required and must be positive
- note is required

### **System Precondition**

- User must be active
- There must be at least one wallet belongs to user

### **System Process**

- Identificate user
- Validate transaction's data
- Create new transaction's data

### **System Postcondition**

- Transaction created

## 2. Edit transaction

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |
| type | enum | optional | Transaction's type (INCOME, EXPENSE, TRANSFER) |
| amount | number | optional | Amount of money |
| note | string | optional | Transaction's note |
| sourceWalletId | number | optional | Transaction's source wallet |
| destinationWalletId | number | optional | Transaction's destination wallet |

### **Business Rule**

- If type was changed to INCOME, sourceWalletId is null
- If type was changed to INCOME, destinationWallet is required

- If type was changed to EXPENSE, destinationWallet is null
- If type was changed to EXPENSE, sourceWallet is required

- If type was changed to TRANSFER, sourceWalletId and destinationWalletId is required
- If type was changed to TRANSFER, sourceWalletId and destinationWalletId cannot be the same

- If type is TRANSFER and amount was changed, amount cannot exceed sourceWalletId available balance
- If type is TRANSFER and sourceWalletId was changed, amount cannot exceed sourceWalletId available balance

- If sourceWalletId was changed, sourceWalletId must provided in wallet
- If destinationWalletId was changed, destinationWalletId must provided in wallet

- If amount was changed, amount is required and must be positive
- If categoryId was changed, categoryId must provided in category

### **System Precondition**

- User must be active
- There must be at least one transaction

### **System Process**

- Identificate user
- Get transaction data
- Send transaction data
- (user input new data and confirm update)
- Validate changed transaction data
- Save transaction data
- Send new transaction data

### **System Postcondition**

- Transaction updated

## 3. Delete transaction

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transaction

### **System Process**

- Identificate user
- Get transaction data
- (user confirm deletion)
- Delete transaction data

### **System Postcondition**

- Transaction deleted

## 4. View transfer detail

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transaction

### **System Process**

- Identificate user
- Get all data from one transaction
- Send transaction data

### **System Postcondition**

- Transaction detailed data displayed

## 5. See transaction list

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transaction

### **System Process**

- Identificate user
- Get transaction data gradually
- Send transaction data

### **System Postcondition**

- Transaction data list displayed