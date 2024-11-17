const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginSchema = new Schema({
    sno:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

const LoginModel = mongoose.model('logins', LoginSchema)
module.exports = LoginModel