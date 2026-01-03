const Joi=require('joi')

const taskSchema=Joi.object({
    task:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().allow('',null),
        priority:Joi.string().required().valid('low','medium','high'),
        status:Joi.string().required().valid('pending','completed'),
        duedate:Joi.date().required()
    }).required()
});

module.exports=taskSchema;