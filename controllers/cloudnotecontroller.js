var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var CloudNote = sequelize.import('../models/cloudnote');

router.post('/', function(req, res){
    var owner = req.user.id;
    var cloudnote = req.body.cloudnote.cloudnote;

    CloudNote.create({
        owner:owner,
        cloudnote:cloudnote
    })
    .then(function createSuccess(cloudnote){
        res.json({
            cloudnote:cloudnote
        });
    },
    function createError(err){
        res.send(500, err.message);
    }
);
});
router.get('/', function(req, res){
    var userid= req.user.id;

    CloudNote
    .findAll({
        where: {owner:userid}
    })
    .then(
        function findAllSuccess(data){
          res.json(data);  
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
});
router.put('/update/:id', function(req, res){
    var owner= req.params.id;
    var cloudnote = req.body.cloudnote.cloudnote;

    CloudNote
    .update({
        cloudnote:cloudnote
    },
    {where:{id:owner}}
).then(
    function updateSuccess(updatedLog){
        res.json({
            cloudnote:cloudnote
        });
    },
    function updateError(err){
        res.send(500, err.message);
    }
)
});
router.delete('/delete/:id',function(req, res){
    var data = req.params.id;
    var userid = req.user.id;

    CloudNote
    .destroy({
        where:{id:data, owner:userid}
    }).then(
        function deleteLogSuccess(data){
            res.send('you removed a log');
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );

});
module.exports=router;
