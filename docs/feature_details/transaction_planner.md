[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Transaction Planner

Transaction planner define user's financial plan that can be executed into real transaction records easily.

Decisions made:
- Transaction planner acting like a 'draft' before executed and recorded
- Transaction plan and transaction record are not connected in a relation to simplify the transaction lifecycle
- Transaction plan that have successfully executed are then removed

## 1. Plan transaction

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| type | enum | required | Transaction plan's type (INCOME, EXPENSE, TRANSFER, SAVING_ALLOCATE, SAVING_RELEASE) |
| amount | number | required | Amount of money |
| description | string | optional | Transaction plan's note |
| plannedFor | dateTime | required | Transaction plan's planned date |
| categoryId | number | optional | Transaction plan's category |
| sourceWalletId | number | optional | Transaction plan's source wallet |
| destinationWalletId | number | optional | Transaction plan's destination wallet |
| savingId | number | optional | Transaction plan's destination saving plan |

### **Business Rule**  

- If type is INCOME / SAVING_RELEASE, sourceWalletId is null
- If type is INCOME / SAVING_RELEASE, destinationWallet is required

- If type is EXPENSE / SAVING_ALLOCATE, sourceWallet is required
- If type is EXPENSE / SAVING_ALLOCATE, destinationWallet is null

- If type is TRANSFER, sourceWalletId and destinationWalletid is required
- If type is TRANSFER, sourceWalletId and destinationWalletid cannot be the same

- If type is INCOME / EXPENSE / TRANSFER, savingId is null
- If type is SAVING_ALLOCATE / SAVING_RELEASE, savingId is required

- sourceWalletId must provided in wallet
- destinationWalletId must provided in wallet

- amount is required and must be positive
- plannedFor is required
- plannedFor date must be later than the date the plan was created
- categoryId must provided in category

### **System Precondition**

- User must be active
- There must be at least one wallet belongs to user

### **System Process**

- Identificate user
- Validate transaction plan data
- Create new transaction plan data

### **System Postcondition**

- Transaction plan created

## 2. Edit transaction plan

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionPlanId | number | required | Transaction plan's id |
| type | enum | required | Transaction plan's type (INCOME, EXPENSE, TRANSFER, SAVING_ALLOCATE, SAVING_RELEASE) |
| amount | number | required | Amount of money |
| description | string | optional | Transaction plan's note |
| plannedFor | dateTime | required | Transaction plan's planned date |
| categoryId | number | optional | Transaction plan's category |
| sourceWalletId | number | optional | Transaction plan's source wallet |
| destinationWalletId | number | optional | Transaction plan's destination wallet |
| savingId | number | optional | Transaction plan's destination saving plan |

### **Business Rule**  

- If type changed to INCOME / SAVING_RELEASE, sourceWalletId is null
- If type changed to INCOME / SAVING_RELEASE, destinationWallet is required

- If type changed to EXPENSE / SAVING_ALLOCATE, destinationWallet is null
- If type changed to EXPENSE / SAVING_ALLOCATE, sourceWallet is required

- If type changed to TRANSFER, sourceWalletId and destinationWalletId is required
- If type changed to TRANSFER, sourceWalletId and destinationWalletId cannot be the same

- If type changed to INCOME / EXPENSE / TRANSFER, savingId is null
- If type changed to SAVING_ALLOCATE / SAVING_RELEASE, savingId is required

- If sourceWalletId is changed, sourceWalletId must provided in wallet
- If destinationWalletId is changed, destinationWalletId must provided in wallet

- If amount is changed, amount is required and must be positive
- If plannedFor is changed, plannedFor is required
- If plannedFor is changed, plannedFor date must be later than the date the plan was updated
- If categoryId is changed, categoryId must provided in category

### **System Precondition**

- User must be active
- There must be at least one transaction plan

### **System Process**

- Identificate user
- Get transaction plan data
- Send transaction plan data
- (user input new data and confirm update)
- Validate changed transaction plan data
- Save transaction plan data
- Send new transaction plan data

### **System Postcondition**

- Transaction records updated

## 3. Delete transaction plan

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionPlanId | number | required | Transaction plan's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transaction plan

### **System Process**

- Identificate user
- Get transaction plan data
- (user confirm deletion)
- Delete transaction plan data

### **System Postcondition**

- Transaction plan deleted

## 4. Execute transaction plan

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionPlanId | number | required | Transaction plan's id |
| type | enum | required | Transaction plan's type (INCOME, EXPENSE, TRANSFER, SAVING_ALLOCATE, SAVING_RELEASE) |
| amount | number | required | Amount of money |
| description | string | optional | Transaction plan's note |
| categoryId | number | optional | Transaction plan's category |
| sourceWalletId | number | optional | Transaction plan's source wallet |
| destinationWalletId | number | optional | Transaction plan's destination wallet |
| savingId | number | optional | Transaction plan's destination saving plan |

### **Business Rule**  

- If type is TRANSFER / EXPENSE / SAVING_ALLOCATE, amount cannot exceed sourceWalletId available balance

### **System Precondition**

- User must be active
- There must be at least one transaction plan

### **System Process**

- Identificate user
- Get transaction plan data
- (user confirm execution)
- Create new transaction records data based on transaction plan data
- Check if new transaction created successfully
- Delete transaction plan data
- Send new transaction data

### **System Postcondition**

- Transaction records created
- Transaction plan deleted

## 5. View transfer plan detail

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionPlanId | number | required | Transaction plan's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transaction plan

### **System Process**

- Identificate user
- Get all data from one transfer plan
- Send transfer plan data

### **System Postcondition**

- Transfer plan detailed data displayed

## 6. See transfer plan list

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| transactionPlanId | number | required | Transaction plan's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one transaction plan

### **System Process**

- Identificate user
- Get transfer plan data gradually
- Send transfer plan data

### **System Postcondition**

- Transfer plan data list displayed

