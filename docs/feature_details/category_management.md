[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Category Management

Category define user's transactions category and act as a tool to help users classify. 

Decisions made:
1. About fields  
    - Name must be unique from the same user to prevent double category that might be ambiguous when used in transaction records, transaction plan, and/or budget
    - There will be two option in category's type matching transaction records and transaction plan's type

2. About edit and delete  
    - Edit and delete category are allowed because we want to give as much flexibility as we can while respecting user's decision.
    - Edit and/or delete decision are all on user's hand. User must be aware of the consequences before committing to edit and/or delete the wallet. Surely we will warn and explain all the consequences.
    - Edit category may affect: Transaction Records (Will also change transaction records classification), Transaction Plan (Will also change transaction plan classification), Budget (Will also change budget identity)
    - Category's type will be prohibited to edit if there are already transaction records, transaction plan and/or budget related to it. We aware that this may limit user's flexibility and became, strangely, contrary to our main purpose and principle. However, we did not find any common use cases in editing category's type, so that by considering the disadvantage (such as ambiguous data, for example FOOD being a category with type EXPENSE and then user decide to change to INCOME), we decide to prohibit the edit action.
    - Delete category may affect: Transaction (Will also remove transaction records classification), Transaction Plan (Will also remove transaction records classification), Budget (Will also delete budget related)
    - There will be kind of hard confirmation on category deletion: "This category contains 6 budget data, 534 transaction records and 12 transaction plan. Destroying this category will permanently remove all budget and clearing transaction records and transaction plan category's data. Are you sure? Type DESTROY to confirm"

## 1. Create category

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | Category's ownership |
| name | string | required | Category's name |
| type | enum | required | Category's type (INCOME, EXPENSE) |
| description | string | optional | Category's description |
| color | enum | required | Category's color |

### **Business Rule**  

- userId automatically collect from user session
- name must be unique if come from the same user
- color must be one of color list provided

### **System Precondition**

- User must be active

### **System Process**

- Identificate user
- Validate category data
- Create new category data

### **System Postcondition**

- Category created

## 2. Edit category

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| categoryId | number | required | Category's id |
| name | string | optional | Category's name |
| type | enum | optional/immutable | Category's type (INCOME, EXPENSE) |
| description | string | optional | Category's description |
| color | enum | optional | Category's color |

### **Business Rule**  

- If name is changed, name must be unique from the same user
- Category's type cannot be change if there are already transaction records, transaction plan and/or budget related to it
- If color was changed, color is required
- If color is changed, color must be one of color list provided

### **System Precondition**

- User must be active
- There must be at least one category

### **System Process**

- Identificate user
- Get category data
- Send category data
- (user input new data and confirm update)
- Validate changed category data
- Save category data
- Send new category data

### **System Postcondition**

- Category updated

## 3. Delete category

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| categoryId | number | required | Category's id |

### **Business Rule**

- Delete on category will make related transaction records and/or transaction plan category to NULL
- Delete on category will also delete all the related budgets

### **System Precondition**

- User must be active
- There must be at least one category

### **System Process**

- Identificate user
- Get category data
- (user confirm deletion)
- If the category have related budgets, delete them first
- Delete category data

### **System Postcondition**

- Category deleted

## 4. View category detail

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| categoryId | number | required | Category's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one category

### **System Process**

- Identificate user
- Get all data from one category
- Send category data

### **System Postcondition**

- Category detailed data displayed

## 5. See category list

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| categoryId | number | required | Category's id |

### **Business Rule**  

- none

### **System Precondition**

- User must be active
- There must be at least one category

### **System Process**

- Identificate user
- Get category data gradually
- Send category data

### **System Postcondition**

- Category data list displayed