const Joi = require('joi')
const Users = require('../models/Users');


exports.users = (req,res)=>{

    var previous_page=parseInt(req.params.page)-1;
    var order=req.query.order;
    var mod=req.query.mod || 'asc';
    var perPage=parseInt(req.query.perPage) || 1;
    
    var mySort={}
    if(order=='name'){
        mySort={name: mod}
    }else if(order=='surname'){
        mySort={surname:mod}
    }

    Users.find()
        .sort(mySort)
        .skip(perPage * previous_page)
        .limit(perPage)
        .exec(function (err, doc) {
            if(err) { 
                res.status(400).json(err);
                return; 
            };
            res.status(200).json({"users" : doc});
        });
    };
    

exports.numberOfUsers = function(req, res) {

    Users.countDocuments(function(err, count) {
        if (err)
            res.send(err)

        res.json({'allUsers' : count});
        });
    };

    
exports.general_add = (async (req,res) => {

    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = new Users(req.body);
    user = await user.save();

    return res.status(200).send(user);
    });
    
function validateUser(user) {

    var numberSchema = Joi.object().keys({
        type: Joi.string().valid('Personal','Work').required(),
        phoneNumber: Joi.string().regex(/^[0-9*#+-]+$/).required()
    });

    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        numbers: Joi.array().items(numberSchema)

    });
    
    return schema.validate(user);
    } 