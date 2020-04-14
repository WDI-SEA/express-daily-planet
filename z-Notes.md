# General Notes
- Remember to install postgres
    - npm i pg
- When calling Sequelize commands, preface with 'npx'
    - npx sequelize COMMAND
- Creating a DB appears to also create a migration folder and a models/user.js file
    - createdb NAME
- Creating a new database from the command line using sequalize
    - sequelize model:create --name user --attributes firstName:string,lastName:string,age:integer,email:string;
- I can't remember everything that this did, but it's the next step
    - Remember to switch the 'dialect' of the config.json to 'postgres'
    - sequelize db:migrate
    - sequelize db:migrate:undo
        - If you messed something up
- Creating a new row in a database table
    -   let db = require('./models')
        db.user.create({
            firstname: 'Lars',
            lastName: 'Nelson',
            age: 24,
            email: 'Random.string@nothing.bro'
        })
- 