# Tourist-Guide
A PERN Stack project. The project allows users to add details about places that they have visited, so that  it becomes helpful for other users to look up the places, which could help them decide their next tourist place.


# Requirements
- npm v6.14.12
- node v14.16.1
- React Js
- PostgreSQL

# Installing
- Install <a href="https://www.postgresql.org/">PostgreSQL</a> 
- Clone this repo
```
git clone https://github.com/rakshith-crm/Tourist-Guide
```


# Usage

- Setup Postgre Database
  - Create Database 'JWT'
  - Create Tables (refer schema.sql)
  - Create procedures (refer plsql.sql)
  - Start PostgreSQL server at port 5432
- Navigate to project folder
- cd Tourist-Guide
- Open 2 Terminals
  - Terminal 1
    - cd server
    - node app.js (or) nodemon
  - Terminal 2
    - cd client
    - npm start
- Navigate to http://<span></span>localhost:3000 to view application

# Screenshots
![Alt text](/screenshots/login.png?raw=true "Optional Title")
![Alt text](/screenshots/register.png?raw=true "Optional Title")
![Alt text](/screenshots/all_locations.png?raw=true "Optional Title")
![Alt text](/screenshots/add_location.png?raw=true "Optional Title")
