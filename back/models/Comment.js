module.exports = (sequelize,DataTypes) =>{
    const Comment = sequelize.define("Comment",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        text:{
            type: DataTypes.STRING,
            allowNull:false
        }
    })

    Comment.associate = models =>{
        Comment.belongsTo(models.Post);
        Comment.belongsTo(models.User);
    };
    
    return Comment;
}

