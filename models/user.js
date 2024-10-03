const mongooes = require('mongoose')

// Connect to MongoDB
mongooes.connect('mongodb://localhost:27017/project0')

const userSchema=mongooes.Schema({
    name: String,
    email: String,
    image: String
})

module.exports=mongooes.model('User', userSchema)