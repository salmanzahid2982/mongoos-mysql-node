const { INTEGER } = require("sequelize");

module.exports=(sequelize,DataTypes,Model)=>{
const User=sequelize.define('User',{
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    user_id:DataTypes.INTEGER
  }, {
  
    // Other model options go here
  });

  return User
}
