require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const User=require('./models/user.js');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const userRoutes=require('./routes/user.js');
const taskRoutes=require('./routes/task.js');

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    // await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}

main().then(()=>console.log('Database connected🔗'))
.catch(e=>{
    console.log(e);
});

const sessionOptions={
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    next();
});

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use('/',userRoutes);
app.use('/tasks',taskRoutes);

//index route
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