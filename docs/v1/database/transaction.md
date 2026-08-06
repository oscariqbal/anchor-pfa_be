| field | type | nullable | default | contstraint | description |
|-------|------|------------|-------------|
| id | uuid | no | uuid() | pk | wallet id |
| sourceWalletId | uuid | yes | - | fk | transaction source wallet |
| destinationWalletId | uuid | yes | - | fk | transaction destination wallet |
| type | enum | no | - | - | transaction type |
| amount | number | no | - | - | transaction amount |
| note | string | no | - | - | transaction note |
| createdAt | dateTime | no | now() | - | creation date |
| updatedAt | dateTime | no | now() | - | last update |