# Wallet

## Database Design

---

| field | type | nullable | default | contstraint | description |
|-------|------|------------|-------------|
| id | uuid | no | uuid() | pk | wallet id |
| userId | uuid | no | uuid() | fk | owner |
| type | enum | no | wallet type |
| name | string | no | wallet name |
| description | string | yes | wallet description |
| isArchived | boolean | no | wallet status |
| createdAt | dateTime | no | now() | - | creation date |
| updatedAt | dateTime | no | now() | - | last update |