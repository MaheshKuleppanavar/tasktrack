require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const Task=require('./models/task.js');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const Joi=require('joi')
const wrapAsync=require('./utils/wrapAsync.js');
const ExpressError=require('./utils/ExpressError.js');
const taskSchema=require('./Schema.js');
const session=require('express-session');
const flash=require('connect-flash');

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    // await mongoose.connect('mongodb://127.0.0.1:27017/tracker');
}

main().then(()=>console.log('Database connected🔗'))
.catch(e=>{
    console.log(e);
})

const sessionOptions={
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true
    }
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    sessionOptions.cookie.secure = true;
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
});

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        throw new ExpressError(
            error.details.map(e => e.message).join(','),
            400
        );
    }
    next();
};


app.get('/',(req,res)=>{
    res.send('Root Working🤞');
});

//index route
app.get('/tasks',wrapAsync(async (req,res)=>{
    const tasks=await Task.find({status:'pending'});
    const completed=await Task.find({status:'completed'});
    res.render('tasks/index.ejs',{tasks,completed});
}));

//new route
app.get('/tasks/new',async(req,res)=>{
    res.render('tasks/new.ejs')
});

app.post('/tasks',validateTask,async (req,res)=>{
    let task=new Task({...req.body.task});
    task=await task.save();
    if(task){
        req.flash('success','Task Added Succesfully✅');
    }
    res.redirect('/tasks');
});

app.get('/tasks/edit',async(req,res)=>{
    res.render('tasks/edit.ejs');
});

app.put('/tasks/:id/update',wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let task=await Task.findByIdAndUpdate(id,{status:'completed'},{new:true});
    if(!task){
        req.flash('error','Task you requested does not exist!');
    }
    else{
        req.flash('success','Task Completed🎯');
    }
    res.redirect('/tasks');
}));

//delete route
app.delete('/tasks/:id',async(req,res)=>{
    let {id}=req.params;
    let task=await Task.findByIdAndDelete(id);
    if(task){
        req.flash('success','Task Deleted Successfully');
    }
    else{
        req.flash('error','Task you requested does not exist!');
    }  
    res.redirect('/tasks');  
})

app.use((req,res,next)=>{
    res.status(404).render('error.ejs', {
    message: 'Page Not Found',
    statusCode: 404
});

})

//error handling middleware
app.use((err,req,res,next)=>{
    let {message='Some error occured',statusCode=500}=err;
    res.render('error.ejs',{message,statusCode});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
    console.log(`Server Started at ${PORT}🚀`);
});