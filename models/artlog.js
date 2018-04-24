module.exports=function(sequelize, DataTypes){
    return sequelize.define('artlog',{
        owner:DataTypes.INTEGER,
        artpng:DataTypes.TEXT,
        notes:DataTypes.STRING
    })
}