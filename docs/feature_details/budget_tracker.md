[Back](https://github.com/oscariqbal/anchor-pfa_be/blob/main/docs/FEATURE_DETAILS.md)

---

# Budget Tracker

Budget is a tool to help user's track and monitor their expense based on category.

Decisions made:
- 

## 1. Create budget

### **Input Spesification**

| Field | Type | Properties | Description |
|-------|------|------------|-------------|
| userId | number | required | Category's ownership |
| name | string | required | Category's name |
| description | string | optional | Category's description |
| color | enum | required | Category's color |

### **Business Rule**  

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
| description | string | optional | Category's description |
| color | enum | optional | Category's color |

### **Business Rule**  

- Updating the category that already has transaction records and/or transaction plan and/or budget may affect some of them. User must be aware of the consequences before committing to edit the category

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