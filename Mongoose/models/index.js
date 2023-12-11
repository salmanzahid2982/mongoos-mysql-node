const mongoose = require('mongoose');
const db=mongoose.connect('mongodb://localhost:27017/mongotutorial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(data=>{
    console.log("mongoDb is connected >>>");
}).catch((err)=>{
    console.log(err,"err");
})
module.exports=db;