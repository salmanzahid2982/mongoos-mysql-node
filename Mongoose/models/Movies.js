const mongoose = require('mongoose');

const moviesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required field'],
        unique:true,
        trim:true
    },
    description:{
        type:String,
        required:[true,'Description is required field'],
        trim:true
    },
    duration:{
        type:Number,
        required:[true,'duration is required field']
    },
    ratings:{
        type:Number,
    },
    totalRating:{
        type:Number
    },
    releaseYear:{
        type:Number,
        required:[true,'Release Year is required field'],
    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    genres:{
        type:[String],
        required:[true,'Genes is required filed']
    },
    directors:{
        type:[String],
        required:[true,'Directors is required filed']
    },
    coverImage:{
        type:String,
        required:[true,'Cover image is required filed']
    },
    actors:{
        type:[String],
        required:[true,'Actors is required field']
    },
    price:{
        type:Number,
        reuired:[true,"Pice is required field"]
    }
})


module.exports= mongoose.model('Movies',moviesSchema);