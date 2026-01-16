const express=require('express');
const router=express.Router();
const Task=require('../models/task.js');
const {validateTask,isLoggedin, saveUrl}=require('../middlewrae.js');
const wrapAsync=require('../utils/wrapAsync.js')

router.get('/', isLoggedin, wrapAsync(async (req, res) => {
  const tasks = await Task.find({
    status: 'pending',
    user: req.user._id
  });

  const completed = await Task.find({
    status: 'completed',
    user: req.user._id
  });

  res.render('tasks/index.ejs', { tasks, completed });
}));


//new route
router.get('/new',isLoggedin,wrapAsync(async(req,res)=>{
    console.log(req.user);
    console.log(res.locals.redirectUrl);

    return res.render('tasks/new.ejs');
}));

router.post('/',isLoggedin,validateTask,wrapAsync(async (req,res)=>{
    let currentUser=res.locals.currentUser._id;
    let task=new Task({...req.body.task,user:currentUser});
    task=await task.save();
    if(task){
        req.flash('success','Task Added Succesfully✅');
    }
    res.redirect('/tasks');
}));

router.get('/edit',isLoggedin,wrapAsync(async(req,res)=>{
    res.render('tasks/edit.ejs');
}));

router.put('/:id/update',isLoggedin,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { status: 'completed' },
    { new: true }
    );

    if(!task){req.flash('error','Task you requested does not exist!');}
    else{req.flash('success','Task Completed🎯');}
    res.redirect('/tasks');
}));

router.put('/:id/incomplete',isLoggedin,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let task = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { status: 'pending' },
    { new: true }
    );
    if(!task){req.flash('error','Task you requested does not exist!');}
    else{req.flash('success','Task marked as incompleted');}
    res.redirect('/tasks');
}));
//delete route
router.delete('/:id',isLoggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let task = await Task.findOneAndDelete({
    _id: id,
    user: req.user._id
    });
    if(task){
        req.flash('success','Task Deleted Successfully');
    }
    else{
        req.flash('error','Task you requested does not exist!');
    }  
    res.redirect('/tasks');  
}));

module.exports=router;