let db = require('./models')
db.user.create({
    firstname: 'Lars',
    lastName: 'Nelson',
    age: 24,
    email: 'Random.string@nothing.bro'
})