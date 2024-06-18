# Setup

-   Execute the following command to install dependencies:

```
$ npm install
```

-   Edit `.env` and update the following variables (also available in the `.env.example` file):

```
## JsonWebToken secret for minting access tokens
## JsonWebToken secret for minting access tokens
JWT_SECRET					=	''

## JsonWebToken secret for minting refresh tokens
JWT_REFRESH_SECRET			=	''

## Self-explanatory
BACKEND_PORT				=	3000

## Retrieve this from your Database providor's project API settings
## ! '?pgbouner' suffix is required for Prisma ORM to connect to Supabase
POSTGRES_URL				=	''

## Logging level, 0: none, 1-5: FATAL, ERROR, WARNING, INFO, DEBUG
LOG_LEVEL					=	1

## Node Environment, either set to 'production' to suppress errors from being sent out to clients, or 'development' to enable errors as responses to REST requests.
NODE_ENV					=	''
```

Note: All variables must be set, otherwise it will throw a fatal error on request.

-   For development:

```
$ npx tsc --watch

(in another TTY)
$ nodemon build/server.js
```

Or:

```
$ concurrently "npx tsc --watch" "nodemon build/server.js"
```

(requires `concurrently` and `nodemon` to be installed from `npm`)

-   For deployment:

```
$ npx tsc
$ node build/server.js
```
