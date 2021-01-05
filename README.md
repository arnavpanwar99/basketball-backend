# basketball-backend

## About
This API uses the MongoDB database to store and retrieve data.
This API provides two functionalities:
1. User authentication through jwt and httpOnly cookie.
2. Saving and retrieving match and player data.

## Routes

### /GET
#### `/users`
#### `/users/name`
#### `/users/current`
#### `/users/:id`
#### `/matches/single`
#### `/matches/all`
#### `/common/all`
#### `/common/twoPlayer`

### /POST
#### `/users/authenticate`
#### `/users/register`
#### `/matches/create`
#### `/matches/startMatch`

### /PUT
#### `/users/update`
#### `/matches/update`
#### `/matches/saveMatch`

### /DELETE
#### `/users/:id`

## Note
For the time being, almost all the routes are public, but depending on the business logic, their security can be changed to private (which will then require a httpOnly cookie to authenticate) from `helper/jwt.js`
