# basketball-backend

## About
This API uses the MongoDB database to store and retrieve data.
This API provides two functionalities:
1. User authentication through jwt and httpOnly cookie.
2. Saving and retrieving match and player data.

## Routes
..*'/users/authenticate',
..*'/users/register',
..*'/users/name',
..*'/users',
..*'/matches/single',
..*'/matches/all',
..*'/matches/create',
..*'/matches/update',
..*'/users/update',
..*'/matches/saveMatch',
..*'/matches/startMatch',
..*'/common/all',
..*'/common/twoPlayer'

## Note
For the time being, almost all the routes are public, but depending on the business logic, their security can be changed to private (which will then require a httpOnly cookie to authenticate) from `helper/jwt.js`
