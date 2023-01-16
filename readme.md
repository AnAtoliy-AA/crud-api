### to start project in dev mode use `npm run start:dev`
### to start project in prod mode use `npm run start:prod`
### to start project with horizontal scaling: `npm tun start:multi`

### to start tests (3 scenarios) use `npm run test`

## api/users `GET` 
### get all users
`http://localhost:4000/api/users`

## api/users `POST` 
### add user
`http://localhost:4000/api/users`
JSON example: 
`{
  "age": 18,
  "username": "some_username",
  "hobbies": ["1","2"]
}`

## api/users/{id} `GET` 
### get user by id
`http://localhost:4000/api/users/{id}`

## api/users/{id} `PUT`
### update user by id
`http://localhost:4000/api/users/{id}`
JSON example: 
`{
  "age": 25,
  "username": "another_username",
  "hobbies": ["first","second"]
}`

## api/users/{id} `DELETE`
### delete user by id
`http://localhost:4000/api/users/{id}`
