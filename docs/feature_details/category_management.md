[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Category Management

Category define user's transactions category and act as a tool to help users classify. 

Decisions made:
- Edit and delete category are allowed because we want to give as much flexibility as we can while respecting user's decision.
- Edit and delete category that already have tied to some records or plans are allowed, but the decision are all on user's hand. Surely we will warn and explain all the consequences.
- Delete category that already have tied to some budget will trigger kind of hard confirmation: 'This category contains 6 budget data, 534 transaction records and 12 transaction plan. Destroying this category will permanently remove all budget and clearing transaction records and transaction plan data. Are you sure? Type DESTROY to confirm'

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

- Updating the category that already has transaction records and/or transaction plan and/or budget may affect some of them. User must be aware of the consequences before committing to edit the category
- Category's type cannot be change if there are already transaction records and/or transaction plan and/or budget connected to it. We aware that this may limit user's flexibility and became, strangely, contrary to our main purpose and principle. However, we did not find any common use case in editing category's type, so that by considering the disadvantage such as damaged data, we decide to prohibit change to category's type.

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

- Deleting the category that already has transaction records and/or transaction plan and/or budget may affect some of them. User must be aware of the consequences before committing to delete the category
- Delete on category will make connected transaction records and/or transaction plan category to NULL
- Delete on category will also delete all the connected budgets

### **System Precondition**

- User must be active
- There must be at least one category

### **System Process**

- Identificate user
- Get category data
- (user confirm deletion)
- If the category have connected budgets, delete them first
- Delete category data

### **System Postcondition**

- wWllet records deleted

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