| field | type | nullable | default | contstraint | description |
|-------|------|------------|-------------|
| id | uuid | no | uuid() | pk | user id |
| name | string | no | - | - | user name |
| email | string | no | - | - | user email |
| password | string | no | - | - |user password |
| createdAt | dateTime | no | now() | - | creation date |
| updatedAt | dateTime | no | now() | - | last update |