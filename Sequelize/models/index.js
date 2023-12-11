const {Sequelize, DataTypes, Model}=require('sequelize');

const sequelize=new Sequelize("myemployeeDb",'root','AE1234iou',{
    host:'localhost',
    dialect:'mysql'
})

try{
    sequelize.authenticate();
    console.log('connection has been established successfully');
}
catch(error){
    console.log("Error",error);
}

const db={};
db.Sequelize=Sequelize ;
db.sequelize=sequelize;

db.user=require('./user')(sequelize,DataTypes,Model);
db.contact=require('./contact')(sequelize,DataTypes,Model);
db.education=require('./education')(sequelize,DataTypes,Model);

console.log(db.user,db.contact,"db");

// 1-- One TO One 
db.user.hasOne(db.contact,{foreignKey:'UserId'});
db.contact.belongsTo(db.user,{foreignKey:'UserId'});


db.user.hasOne(db.education,{foreignKey:'UserId'});
db.education.belongsTo(db.user,{foreignKey:'UserId'});


// 2 -- one To Many
// db.user.hasMany(db.contact,{foreignKey:'user_id',as:'contactDetails'});
// db.contact.belongsTo(db.user,{foreignKey:'user_id',as:'userDetails'});

// 3 -- Many To Many
// db.user.belongsToMany(db.contact,{through:'user_contacts'})
// db.contact.belongsToMany(db.user,{through:'user_contacts'})

db.sequelize.sync({force:true});
module.exports=db ;