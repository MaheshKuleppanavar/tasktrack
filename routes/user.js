const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const User=require('../models/user.js');
const passport = require('passport');
const { saveUrl } = require('../middlewrae.js');

router.get('/',(req,res)=>{
    res.render('user/signup.ejs')
});

router.get('/signup',(req,res)=>{
    res.render('user/signup.ejs');
});

router.post('/signup',wrapAsync(async (req,res,next)=>{
    let {username,email,password}=req.body;
    let newUser=new User({username:username,email:email});
    let registeredUser=await User.register(newUser,password);       
    if(registeredUser){
        req.login(registeredUser,(e)=>{
            if(e)return next(e);
             req.flash('success',"Welcome to-do app");
            return res.redirect('/tasks');
        })
    }else{
    return res.redirect('/signup');
    }
}));

router.get('/login',wrapAsync(async (req,res)=>{
    res.render('user/login.ejs');
}));

router.post('/login',saveUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),
    (req,res)=>{
        res.redirect('/tasks');
    });

router.get('/logout',(req,res,next)=>{
    req.logout((e)=>{
        if(e)return next(e);
        res.redirect('/tasks');
    })
})
 
module.exports=router;