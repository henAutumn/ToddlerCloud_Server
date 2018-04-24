var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var ArtLog = sequelize.import('../models/artlog');

router.post('/', function(req, res){
    console.log(req.body);
    var owner = req.user.id;
    var artpng = req.body.artlog.artpng;
    var notes = req.body.artlog.notes;

    ArtLog.create({
        owner:owner,
        artpng:artpng,
        notes:notes
    })
    .then(function createSuccess(artpng,notes){
        res.json({
            artpng:artpng,
            notes:notes
        });
    },
    function createError(err){
        res.send(500, err.message);
    }
);
});
router.get('/', function(req, res){
    var userid= req.user.id;

    ArtLog
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
    var notes = req.body.artlog.notes;

    ArtLog
    .update({
        notes:notes
    },
    {where:{id:owner}}
).then(
    function updateSuccess(updatedLog){
        res.json({
            notes:notes
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

    ArtLog
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
