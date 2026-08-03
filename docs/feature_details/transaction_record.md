[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Transaction Record

## 1. Record transaction

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| type | enum | required | Transaction's type |
| amount | number | required | Amount of money |
| description | string | optional | Transaction's note |
| categoryId | number | optional | Transaction's category |
| sourceWalletId | number | optional | Transaction's source wallet |
| destinationWalletId | number | optional | Transaction's destination wallet |
| savingId | number | optional | Transaction's destination saving plan |
| plannedTransactionId | number | optional | Transaction's realization from transaction planner |

### **Business Rule**  

- If type is INCOME / SAVING_RELEASE, sourceWalletId is null
- If type is INCOME / SAVING_RELEASE, destinationWallet is required

- If type is EXPENSE / SAVING_ALLOCATE, sourceWallet is required
- If type is EXPENSE / SAVING_ALLOCATE, destinationWallet is null

- If type is TRANSFER, sourceWalletId and destinationWalletid is required
- If type is TRANSFER, sourceWalletId and destinationWalletid cannot be the same

- If type is TRANSFER / EXPENSE / SAVING_ALLOCATE, amount cannot exceed sourceWalletId available balance

- If type is INCOME / EXPENSE / TRANSFER, savingId is null
- If type is SAVING_ALLOCATE / SAVING_RELEASE, savingId is required

- sourceWalletId must provided in wallet
- destinationWalletId must provided in wallet

- amount must be positive
- categoryId must provided in category
- If transaction records doesn't generated from transaction planner, plannedTransactionId is null

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Validate transaction's data
- Create new transaction's data

### **System Postcondition**

- Transaction's created

## 2. Edit transaction records

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |
| type | enum | optional | Transaction's type |
| amount | number | optional | Amount of money |
| description | string | optional | Transaction's note |
| categoryId | number | optional | Transaction's category |
| sourceWalletId | number | optional | Transaction's source wallet |
| destinationWalletId | number | optional | Transaction's destination wallet |
| savingId | number | optional | Transaction's destination saving plan |

### **Business Rule**  

- Transaction records is the main source of calculation and acting like a core to another features. Updating the transaction record may affect some other features. User must be aware of the consequences before committing to edit the transaction records
- If transaction records generated from transaction planner, transaction records cannot be changed

- If type changed to INCOME / SAVING_RELEASE, sourceWalletId is null
- If type changed to INCOME / SAVING_RELEASE, destinationWallet is required

- If type changed to EXPENSE / SAVING_ALLOCATE, destinationWallet is null
- If type changed to EXPENSE / SAVING_ALLOCATE, sourceWallet is required

- If type changed to TRANSFER, sourceWalletId and destinationWalletId is required
- If type changed to TRANSFER, sourceWalletId and destinationWalletId cannot be the same

- If type is TRANSFER / EXPENSE / SAVING_ALLOCATE and amount is changed, amount cannot exceed sourceWalletId available balance
- If type is TRANSFER / EXPENSE / SAVING_ALLOCATE and sourceWalletId is changed, amount cannot exceed sourceWalletId available balance

- If type changed to INCOME / EXPENSE / TRANSFER, savingId is null
- If type changed to SAVING_ALLOCATE / SAVING_RELEASE, savingId is required

- If sourceWalletId is changed, sourceWalletId must provided in wallet
- If destinationWalletId is changed, destinationWalletId must provided in wallet

- If amount is changed, amount must be positive
- If categoryId is changed, categoryId must provided in category

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Get transaction records data
- Send transaction records data
- (user input new data and confirm update)
- Validate changed transaction records data
- Save transaction records data
- Send new transaction records data

### **System Postcondition**

- Transaction records updated

## 3. Delete transaction

### **Input Spesification**

| Field | Properties |
|-------|------------|
| transferId | required |

### **Business Rule**  

- Transaction records is the main source of calculation and acting like a core to another features. Deleting the transaction record may affect some other features. User must be aware of the consequences before committing to delete the transaction records
- If transaction records generated from transaction planner, transaction plan's type changed to CANCELLED

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Get transaction records data
- (user confirm deletion)
- Delete transaction records data

### **System Postcondition**

- Transaction records deleted
- If transaction records generated from transaction plan, change transaction plan's status in transaction plan to CANCELLED

## 4. View transfer record's detail

### **Input Spesification**

| Field | Properties |
|-------|------------|
| transferId | required |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transferId

### **System Process**

- Identificate user
- Get all data from one transfer record
- Send transfer record's data

### **System Postcondition**

- Transfer record's detailed data displayed

## 5. See transfer record's list

### **Input Spesification**

| Field | Properties |
|-------|------------|
| transferId | required |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transferId

### **System Process**

- Identificate user
- Get transfer record's data gradually
- Send transfer record's data

### **System Postcondition**

- Transfer record's data list displayed