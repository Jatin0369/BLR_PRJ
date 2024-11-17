const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    createDate:{
        type:Date,
        default:Date.now,
        required:true
    }
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema)
module.exports = EmployeeModel
