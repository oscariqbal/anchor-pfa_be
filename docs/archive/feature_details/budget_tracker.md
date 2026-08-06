[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Budget Tracker

Budget is a tool to help user's track and monitor their expense based on category.

Decisions made:
1. About fields  
    - none

2. About edit and delete  
    - Edit and delete budget are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and/or delete decision are all on user's hand. User must be aware of the consequences before committing to edit and/or delete the budget. Surely we will warn and explain all the consequences.
    - Edit budget may affect: Analytics (Will also make change to analytic result)
    - Delete category may affect: Analytics (Will also make change to analytic result)

## 1. Create budget

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| categoryId | number | required | Budget's category |
| description | string | optional | Budget's description |
| limitAmount | number | required | Budget's limit amount |
| startDate | dateTime | required | Budget's start date |
| endDate | dateTime | required | Budget's end date |

### **Business Rule**  

- Two budget with same category and overlapping period cannot be created
- endDate must be later than startDate
- categoryId must provided in category

### **System Precondition**

- User must be active
- There must be one category belongs to user

### **System Process**

- Identificate user
- Validate budget data
- Create new budget data

### **System Postcondition**

- Budget created

## 2. Edit category

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| budgetId | number | required | Budget's id |
| categoryId | number | optional | Budget's category |
| description | string | optional | Budget's description |
| limitAmount | number | optional | Budget's limit amount |
| startDate | dateTime | optional | Budget's start date |
| endDate | dateTime | optional | Budget's end date |

### **Business Rule**

- If categoryId was changed, categoryId is required
- If categoryId was changed, categoryId must provided in category
- If categoryId was changed, two budget with same category, startDate, and endDate cannot be existed
- If limitAmount was changed, limitAmount is required
- If startDate was changed, startDate is required
- If startDate was changed, endDate must be later than startDate
- If startDate was changed, two budget with same category and overlapping period cannot be existed
- If endDate was changed, endDate is required
- If endDate was changed, endDate must be later than startDate
- If endDate was changed, two budget with same category and overlapping period cannot be existed

### **System Precondition**

- User must be active
- There must be at least one budget

### **System Process**

- Identificate user
- Get budget data
- Send budget data
- (user input new data and confirm update)
- Validate changed budget data
- Save budget data
- Send new budget data

### **System Postcondition**

- Budget updated

## 3. Delete budget

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| budgetId | number | required | Budget's id |

### **Business Rule**

- none

### **System Precondition**

- User must be active
- There must be at least one budget

### **System Process**

- Identificate user
- Get budget data
- (user confirm deletion)
- Delete budget data

### **System Postcondition**

- Budget deleted

## 4. View budget detail

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| budgetId | number | required | Budget's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one budget

### **System Process**

- Identificate user
- Get all data from one budget
- Send budget data

### **System Postcondition**

- Budget detailed data displayed

## 5. See budget list

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| budgetId | number | required | Budget's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one budget

### **System Process**

- Identificate user
- Get budget data gradually
- Send budget data

### **System Postcondition**

- Budget data list displayed