const fm = require('../modules/fileManager');

module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define("User",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail:true}
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        bio:{
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    User.associate = models =>{
        User.hasMany(models.Post,{onDelete:"cascade",hooks:true});
        User.hasMany(models.Comment,{onDelete:"cascade",hooks:true});
        User.hasOne(models.Session,{onDelete:"cascade",hooks:true});
    };
    
    return User;
}

