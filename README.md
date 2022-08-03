# Student Management System - Application Server
The backend server for Student Management System. This was made back in college as part of a project for one of my subjects.

## Prerequisites
- Node.js v16 or higher
- PostgreSQL

## Setup
1. **Clone repo & install dependencies**

```shell
$ git clone https://github.com/wrthm/SMS-AppServer.git
$ cd SMS-AppServer
$ npm install
```

2. **Initialize database schema and user/role**

```shell
$ psql -U <superuser name> -f ./src/database/sql/dbSchema.sql
```

- (Optional but recommended) Change the login password for `sms_appserver` role in Postgres

3. **Configure app server**

```shell
$ cp ./src/config/index.example.ts ./src/config/index.ts
$ cp ./src/config/docsConfig.example.js ./src/config/docsConfig.js
```
- And edit the copied files as necessary.

4. **Create initial client & faculty**

```shell
$ npm run db-init-component
$ npm run db-generate-faculty
```

## Run
**App Server**

```shell
$ npm start
```

**API Documentation Server**

```shell
$ npm run docs-server
```