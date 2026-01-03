const mongoose=require('mongoose');
const { type } = require('node:os');
const { title } = require('node:process');
const {Schema}=mongoose;

const taskSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    priority:{
        type:String,
        enum:['low','medium','high']
    },
    duedate:{
        type:Date,
        require:true
    },
    status:{
        type:String,
        enum:['pending','completed']
    }},
    { timestamps: true }
);

module.exports=mongoose.model('Task',taskSchema);