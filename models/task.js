const mongoose=require('mongoose');
const { type } = require('node:os');
const { title } = require('node:process');
const { required } = require('../Schema');
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
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    },
    { timestamps: true }
);

module.exports=mongoose.model('Task',taskSchema);