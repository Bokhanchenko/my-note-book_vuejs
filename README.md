# note-book-vue

## Project setup
```
npm install
```
### You need to create local DB (need to check)
```
Create database
Install PostgreSql
Connect to PostgreSql as admin
$ sudo -u postgres bash
$ psql
Create database and user
CREATE DATABASE tokenauth;
CREATE USER tester WITH ENCRYPTED PASSWORD 'dbpass';
GRANT ALL PRIVILEGES ON DATABASE tokenauth TO tester;
Disconnect from database and connect again as user tester
\q
$ exit
psql -d tokenauth -U tester

```

### Compiles and hot-reloads for development
```
server
./api/ npm run dev
front
./ui/npm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
