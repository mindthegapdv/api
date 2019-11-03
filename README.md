# need2feed web app

Hi, welcome to the need2feed.us API. I'm deployed at (https://api.need2feed.us)[https://api.need2feed.us]

## Powered by
This API is powered by the following libraries:

- express is HTTP framework
- sequelize 5 is the ORM
- celebrate and Joi is used for input validation
- momentjs is used for sane date management
- axios is used for downstream API requests

It uses 3 downstream services:

- need2feed AI - the AI powering the order size recommendation
- Postmark - a transactional email service
- Auth0 - for auth(n|z)

## Code layout

The code is split into 3 functional components (`models`, `routers` and `services`). `./models` represent database tables. `routers` are somewhat similar to `controllers` in other frameworks - they are responsible to implementing business logic, etc. `services` are wrappers around external services. In this case it's `ml` for wrapping the AI service and `email` for wrapping postmark (a transactional email service).

## Getting started
#### Clone the repo
```
$ git clone git@github.com:mindthegapdv/monorepo.git
```
#### Install dependencies
```
$ yarn install
```

#### Setup a database
```
$ createdb need2feed
```

#### Migrate the database
```
$ yarn migrate
```

#### Run the app
```
$ yarn start
```

## Deploying

This API is deployed on heroku and backed by a heroku postgres instance. Simply `git push heroku master` to deploy. After deploying, if any migrations must be applied run: `heroku run:detached node migrate`.


## Contributing

#### Creating migrations

Run the following command:
```
$ npx sequelize-cli migration:generate --name $MIGRATION_NAME
```
It will generate a new migration file in `db/migrations`. Run `yarn migrate` to apply the changes.

