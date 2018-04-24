var express =require('express');
var router=express.Router();
var sequelize=require('../db');
var User=sequelize.import('../models/user');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs')

router.post('/createuser', function(req, res){

    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username:username,
        passwordhash:bcrypt.hashSync(pass,10)
    })
    .then(
        createSuccess =(user)=>{
            var token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:60*60*24});

            res.json({
                user:user,
                message:"created",
                sessionToken:token
            });
        },
        createFail=(err)=>{
            console.log(err,'The user was not created. Check header or body');
        }
    );

});
router.post('/login', function(req, res){
    User.findOne({where:{username:req.body.user.username}})
        .then(
            function(user){
                if(user){
                    bcrypt.compare(req.body.user.password, user.passwordhash, 
                        function(err,matches){
                            if(matches){
                                var token=jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:60*60*24});
                                res.json({
                                    user:user,
                                    message:'Successfully Authenticated',
                                    sessionToken:token
                                });
                            }else{
                                res.status(502).send({error:'Token does not match'})
                            }
                        }
                    );
                }else{
                    res.status(500).send({error:'Password does not match'})
                }
            },
            function(err){
                res.status(501).send('Did not find Username')
            }

    )
})
module.exports=router;