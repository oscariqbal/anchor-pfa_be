[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Saving Planner

Saving planner is a tool to help user's saving plan and progress.

Decisions made:
1. About fields  
    - targetAmount can created and edited to less than the total saving allocated. We find some use cases that some users still saving up even the amount are surpassed
    - targetDate can created and edited to a date less than the saving plan created. We find some use cases that some users still saving up even the amount and the date are surpassed
    - targetDate being optional because we find some people saving up with no target date

2. About edit and delete  
    - Edit and delete saving are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and/or delete decision are all on user's hand. User must be aware of the consequences before committing to edit and/or delete the saving. Surely we will warn and explain all the consequences.
    - Edit saving may affect: Transaction Records (Will also change transaction records money purpose), Transaction Plan (Will also change transaction plan money purpose), Analytics (Will also make change to analytic result)
    - Delete saving may affect: Transaction Records (Will also delete transaction records related), Transaction Plan (Will also delete transaction plan related) Analytics (Will also make change to analytic result)
    - There will be kind of hard confirmation on saving deletion: "This saving contains 345 records and 24 plans. Destroying this saving will permanently remove all related data. Are you sure? Type DESTROY to confirm"
    - On the other hand, we provide 'archive' action to hide and block saving from being used again, while maintaining the transaction related.

## 1. Create saving

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | User's id |
| name | string | required | Saving's name |
| description | string | optional | Saving's description |
| targetAmount | number | required | Saving's target amount |
| targetDate | dateTime | optional | Saving's target date |
| archived | boolean | required | Saving's status (active/archived) |

### **Business Rule**  

- userId automatically collect from user session
- archived automatically set to 0 (no)

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Validate saving data
- Create new saving data

### **System Postcondition**

- Saving created

## 2. Edit category

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| savingId | number | required | Saving's id |
| name | string | optional | Saving's name |
| description | string | optional | Saving's description |
| targetAmount | number | optional | Saving's target amount |
| targetDate | dateTime | optional | Saving's target date |

### **Business Rule**

- userId automatically collect from user session
- If name was changed, name is required
- If targetAmount was changed, targetAmount is required

### **System Precondition**

- User must be active
- There must be at least one saving

### **System Process**

- Identificate user
- Get saving data
- Send saving data
- (user input new data and confirm update)
- Validate changed saving data
- Save saving data
- Send new saving data

### **System Postcondition**

- Saving updated

## 3. Delete saving

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| savingId | number | required | Saving's id |

### **Business Rule**

- Deleting the saving plan that already has transaction records and/or transaction plan may affect some of them. User must be aware of the consequences before committing to delete the saving plan
- Delete on saving plan will also delete the related transaction records and/or transaction plan

### **System Precondition**

- User must be active
- There must be at least one saving

### **System Process**

- Identificate user
- Get saving data
- (user confirm deletion)
- Delete saving data

### **System Postcondition**

- Saving deleted

## 4. Archive saving

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| savingId | number | required | Saving's id |
| archived | boolean | required | Saving's status (active/archived) |

### **Business Rule**  

- After archived, saving will be hide and blocked from any other action except de-archive
- Saving's archived must be 0 (no)

### **System Precondition**

- User must be active
- There must be at least one saving

### **System Process**

- Identificate user
- Get saving records data
- (user confirm archive)
- set saving's archived to 1 (yes)

### **System Postcondition**

- Saving's archived set to 1

## 5. Dearchive saving

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| savingId | number | required | Saving's id |
| archived | boolean | required | Saving's status (active/archived) |

### **Business Rule**  

- After dearchived, saving will not be hide and blocked and can be actively used for any other action
- Saving's archived must be 1 (yes)

### **System Precondition**

- User must be active
- There must be at least one saving

### **System Process**

- Identificate user
- Get saving records data
- (user confirm archive)
- set saving's archived to 0 (no)

### **System Postcondition**

- Saving's archived set to 0

## 6. View saving detail

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| savingId | number | required | Saving's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one saving

### **System Process**

- Identificate user
- Get all data from one saving
- Send saving data

### **System Postcondition**

- Saving detailed data displayed

## 7. See saving list

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| savingId | number | required | Saving's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one saving

### **System Process**

- Identificate user
- Get saving data gradually
- Send saving data

### **System Postcondition**

- Saving data list displayed