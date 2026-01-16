const user = require('./models/user.js');
const User=require('./models/user.js');
const taskSchema=require('./Schema.js');

module.exports.validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        throw new ExpressError(
            error.details.map(e => e.message).join(','),
            400
        );
    }
    next();
};

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash('error','You must be login');
        return res.redirect('/login');
    }
    next();
}

module.exports.saveUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}