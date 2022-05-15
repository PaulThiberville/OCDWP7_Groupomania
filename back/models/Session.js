module.exports = (sequelize,DataTypes) =>{
    
    const Session = sequelize.define("Session",{

        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        refreshToken:{
            type: DataTypes.STRING,
            allowNull:false
        }
    })

    Session.associate = models =>{
        Session.belongsTo(models.User);
    };

    Session.tokenExist = async (token) =>{
        const dbResult = await Session.findOne({where: {refreshToken: token}});
        if(dbResult === null){
            return false;
        }
        return true;
    } 
    
    return Session;
}

