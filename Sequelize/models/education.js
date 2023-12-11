module.exports=(sequelize,DataTypes,Model)=>{
    const Education=sequelize.define('educations',{
      // Model attributes are defined here
         class_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        grade: {
          type: DataTypes.STRING
          // allowNull defaults to true
        },
        passing_year: {
            type: DataTypes.INTEGER
            // allowNull defaults to true
        },
        UserId:DataTypes.INTEGER
    }, {
    
      // Other model options go here
    });
    
    return Education
    }