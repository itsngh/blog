# Setup

-   Execute the following command to install dependencies:

```
$ npm install
```

-   Edit `.env` and update the following variables (also available in the `.env.example` file):

```
# JsonWebToken secret for minting access tokens
JWT_SECRET					=	''

# JsonWebToken secret for minting refresh tokens
JWT_REFRESH_SECRET			=	''

# Self-explanatory
BACKEND_PORT				=	3000

# Retrieve this from your Supabase's project API settings
# '?pgbouner' suffix is required for Prisma ORM
SUPABASE_RLS_BYPASS_KEY		=	''
SUPABASE_URL				=	'postgres://postgres.[PROJECT-ID]:[PROJECT-PASSWORD]@[PROJECT-LOCATION].pooler.supabase.com:6543/postgres?pgbouncer=true'

# Logging level, 0: none, 1-5: FATAL, ERROR, WARNING, INFO, DEBUG
LOG_LEVEL					=	1
```

Note: All variables must be set, otherwise it will refuse to run.

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
