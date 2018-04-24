const Sequelize = require('sequelize');

const sequelize = new Sequelize('ToddlerCloudArt', 'postgres', '01tweety',{
    host:'localhost',
    dialect:'postgres'
});
sequelize.authenticate().then(
    function(){
        console.log('Connected to DB');
    },
    function(err){
        console.log(err, 'The DB is not connected')
    }
);
module.exports=sequelize;