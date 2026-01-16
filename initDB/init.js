const mongoose=require('mongoose');
const tasks=require('./data.js');
const Task=require('../models/task.js');
const data = require('./data.js');

async function main() {
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}

main().then(()=>console.log('Database connected🔗'))
.catch(e=>{
    console.log(e);
});


// console.log(tasks); 6969da3273d3749ebf7b5c0f

async function initData(){
    await Task.deleteMany({});
    // let tasks=data.map((obj)=>({...obj,user:'6969da3273d3749ebf7b5c0f'}))
    let tasks=await Task.insertMany(data);
    console.log(tasks);
}

initData()