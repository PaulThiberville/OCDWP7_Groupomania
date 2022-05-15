const fm = require('../modules/fileManager');
module.exports = (sequelize,DataTypes) =>{
    const Post = sequelize.define("Post",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        text:{
            type: DataTypes.STRING,
            allowNull:false

        },
        imageUrl:{
            type: DataTypes.STRING,
            allowNull:false
        },
        likes:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        usersLiked:{
            type: DataTypes.JSON,
            allowNull:false
        }
    },{
        hooks: {
            beforeDestroy: function(post, options) {
              fm.deleteImageByUrl(post.imageUrl);
              return;
            }
        }}
    );

    Post.associate = models =>{
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment,{onDelete:"cascade",hooks:true});
    };      

    return Post;
}

