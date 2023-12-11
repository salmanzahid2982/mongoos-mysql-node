var db=require('../models');
var User=db.user;
var Contact=db.contact;
var Education=db.education;
var addUser=async(req,res)=>{
    const jane=User.build({firstName:"Salman",lastName:"Salman"});
    console.log(jane instanceof User);
    console.log(jane.name);
    await jane.save();
    console.log('Jane was saved to the database!');
    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON());
}

var getUsers=async(req,res)=>{
    const data=await User.findAll({});
    res.status(200).json({data:data})
}

var getUser=async(req,res)=>{
    const data=await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}

var postUsers=async(req,res)=>{
    let postData=req.body;
    let data;
    if(postData.length>1){
         data=await User.bulkCreate(postData);
    }else{
            data=await User.create(postData);
    }
    res.status(200).json({data:data})
}

var deleteUser=async(req,res)=>{
    const data=await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data})
}


var queryUser=async(req,res)=>{
    res.status(200).json({data:1})
}


var oneToOneUser=async(req,res)=>{
    try{
        var data=await User.create({firstName:'Anuj',lastName:'Gerg'})

        if(data && data.id)
        {
            await Contact.create({permanent_address:"Batala",current_address:"Qadian",user_id:data.id})
        }

        // var data=await Contact.findAll({
        //     include:[
        //         {model:User,
        //         as:'userDetails'}
        //     ]
        // })
        data=JSON.parse(JSON.stringify(data));
        console.log(data);
        res.status(200).json({data:data});
    }
    catch(err){
        console.log(err,"err");
    }
}

var oneToManyUser=async(req,res)=>{
    try{
        var data=await Contact.findAll({
            include:[
                {model:User,
                as:'userDetails'}
            ]
        })
         res.status(200).json({data:data});
    }
    catch(err){
        console.log(err,"err");
    }
}

var manyToMany=async(req,res)=>{
    try{
        // var data=await User.create({firstName:'Anuj',lastName:'Gerge'})

        // if(data && data.id)
        // {
        //     await Contact.create({permanent_address:"Dehradun",current_address:"Bangalore",user_id:data.id})
        // }
       
        var data=await Contact.findAll({
            include:[
                {model:User,
                }
            ]
        })
            res.status(200).json({data:data});
        }
    catch(err){
        console.log(err,"err");
    }
}

var eagerLoading=async(req,res)=>{
    try{
        // var data=await User.create({firstName:'Anuj',lastName:'Gerge'})

        // if(data && data.id)
        // {
        //     await Contact.create({permanent_address:"Dehradun",current_address:"Bangalore",user_id:data.id})
        // }
       
        var data=await User.findAll({
            include:[
                {
                    model:Contact,

                },
                {
                    model:Education,
                }
            ]
        })
            res.status(200).json({data:data});
        }
    catch(err){
        console.log(err,"err");
    }
}

module.exports={
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    queryUser,
    oneToOneUser,
    oneToManyUser,
    manyToMany,
    eagerLoading
}