module.exports=function(sequelize, DataTypes){
    return sequelize.define('cloudnote',{
        owner:DataTypes.INTEGER,
        cloudnote:DataTypes.STRING
    })
}