# Wallet

## Database Design

---

| field | type | nullable | default | contstraint | description |
|-------|------|------------|-------------|
| id | uuid | no | int | pk | wallet id |
| userId | uuid | no | int | fk | owner |
| type | enum | no | wallet type |
| name | string | no | wallet name |
| description | string | yes | wallet description |
| createdAt | dateTime | no | now() | - | creation date |
| updatedAt | dateTime | no | now() | - | last update |

### Type Enum
- CASH
- BANK
- E_MONEY