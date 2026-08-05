[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Transaction Record

Transaction record define user's financial decision that users want to record. Build pretty straighforward with no strict rules to provide flexibility that align with the app main purposes.

Decisions made:
1. About record's type  
    - All transaction type be in one use case because there are not many different system process

2. About record's note and category  
    - Record's note being required and record's category being optional because one records must have at least one identity that can represent user's financial decision's reason. 
    - We aware that not every financial decision's reason can be represent by one simple category, so that the required one is note
    - Category can be utilized to classify records. Category also being the base of 'Budget' feature that can be used to monitor user's records.
    - With all the category's purpose, we want to give as much flexibility as we can so that category being optional. The decision are all on user's hand

3. About edit and delete  
    - Edit and delete records are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and delete records may affect another feature like the validity of the data used in analytics can be questioned, but the decision are all on user's hand. Surely we will warn and explain all the consequences.
    - On the other hands, restricting edit and delete have negative effect that cannot be avoided. Records that made not based on financial decisions, like just to 'reversing' some wrong records, surely do harm to analytics result.

- In the end, we want to ensure that records can represent user's financial decision as pure as possible, while maintaining the flexibility, simplicity and convenience which is align with the app main purposes.

## 1. Record transaction

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| type | enum | required | Transaction's type (INCOME, EXPENSE, TRANSFER, SAVING_ALLOCATE, SAVING_RELEASE) |
| amount | number | required | Amount of money |
| note | string | required | Transaction's note |
| categoryId | number | optional | Transaction's category |
| sourceWalletId | number | optional | Transaction's source wallet |
| destinationWalletId | number | optional | Transaction's destination wallet |
| savingId | number | optional | Transaction's destination saving plan |

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

- amount is required and must be positive
- note is required
- categoryId must provided in category

### **System Precondition**

- User must be active
- There must be at least one wallet belongs to user

### **System Process**

- Identificate user
- Validate transaction's data
- Create new transaction's data

### **System Postcondition**

- Transaction records created

## 2. Edit transaction records

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |
| type | enum | optional | Transaction's type (INCOME, EXPENSE, TRANSFER, SAVING_ALLOCATE, SAVING_RELEASE) |
| amount | number | optional | Amount of money |
| note | string | optional | Transaction's note |
| categoryId | number | optional | Transaction's category |
| sourceWalletId | number | optional | Transaction's source wallet |
| destinationWalletId | number | optional | Transaction's destination wallet |
| savingId | number | optional | Transaction's destination saving plan |

### **Business Rule**  

- Updating the transaction record may affect some other features. User must be aware of the consequences before committing to edit the transaction records

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

- If amount is changed, amount is required and must be positive
- If categoryId is changed, categoryId must provided in category

### **System Precondition**

- User must be active
- There must be at least one transaction

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

## 3. Delete transaction records

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionId | number | required | Transaction's id |

### **Business Rule**  

- Deleting the transaction record may affect some other features. User must be aware of the consequences before committing to delete the transaction records

### **System Precondition**

- User must be active
- There must be at least one transaction

### **System Process**

- Identificate user
- Get transaction records data
- (user confirm deletion)
- Delete transaction records data

### **System Postcondition**

- Transaction records deleted

## 4. View transfer records detail

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
- Get all data from one transaction record
- Send transaction record's data

### **System Postcondition**

- Transaction record's detailed data displayed

## 5. See transaction records list

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
- Get transaction record's data gradually
- Send transaction record's data

### **System Postcondition**

- Transaction record's data list displayed