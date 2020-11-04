Basic CRUD Backend Server using NodeJS, MySQL, and Express.

Dependencies needed:
- Nodemon: for server automatic referesh.
    - npm i --save-dev nodemon
- MySQL: for database.
    - npm i --save mysql
- Express: for routing.
    - npm i --save express
- DotEnv: for enviroment variables.
    - npm i --save dotenv
- BodyParser: for request body parsing.
    - npm i body-parser
- Moment: for time formatting.
    - npm i moment

Note:
* To run the server you must run first npm install after cloning the repository.

Database:
-   db_node
    - Table: tasks
        - id (primary, auto increment)
        - title (varchar (255))
        - activity (text)
        - status (tiny integer)
        - date (datetime)

Run the Script:
* nodemon index.js [ipaddress via ipconfig] 3000