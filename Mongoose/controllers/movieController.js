var Movies =require('../models/Movies');

var addMovies=async(req,res)=>{
   try{
     const movie = await Movies.create(req.body);
     res.status(201).json({
        status:'success',
        data:{
            movie
        }
     })
   }
   catch(err){
    res.status(400).json({
      status:'failed',
      message:err.message
    })
   }
}

var getAllMovies=async(req,res)=>{
  try{
    const movie = await Movies.find();
     res.status(201).json({
        status:'success',
        data:{
            movie
        }
     })
  }
  catch(err){
    res.status(400).json({
      status:'failed',
      message:err.message
    })
  }
}

var getMovie=async(req,res)=>{
  try{
    // const movie=await Movies.find({_id:req.params.id})
    const movie=await Movies.findById(req.params.id)
    res.status(200).json({
      status:'succes',
      data:{
        movie
      }
    })

  }catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
}


var updateMovie=async(req,res)=>{
  try{
    const updatedMovie=await Movies.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(200).json({
      status:'succes',
      data:{
        updatedMovie
      }
    })

  }catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
}

var deleteMovie=async(req,res)=>{
  try{
    const deleteMovie=await Movies.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status:'succes',
      data:{
        deleteMovie
      }
    })

  }catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
}

var filterQuery=async(req,res)=>{
  try{
      //http://localhost:3000/mongo/filter-query/?duration=165&&ratings=8.6

      const filterMovie=await Movies.find(req.query)
      res.status(200).json({
        status:'succes',
        data:{
          filterMovie
        }
      })
  }
  catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
}

var advancedQuery=async(req,res)=>{
  try{
    let query=Movies.find()

    //Logic for Sorting
    //http://localhost:3000/mongo/sort-query/?sort=releaseYear,ratings
    if(req.query.sort){
      let sortBy=req.query.sort.split(',').join(' ')
      console.log(sortBy,"sotBy")
      query=query.sort(sortBy)
    }

    // Limiting Fields/attributes
    if(req.query.fields){
      const fields=req.query.fields.split(',').join(' ');
      query=query.select(fields)
    }

    //Pagination
    const page=req.query.page*1|| 1;
    const limit=req.query.limit*1||10;
    query=query.skip(10).limit(limit);

    
    const movies=await query;
    res.status(200).json({
      status:'succes',
      data:{
        movies
      }
    })
  }
  catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
}

var aggregateQuery=async(req,res)=>{
  try{
    const movie=await Movies.aggregate([
      {$match:{ratings:{$gte:4.5}}},
      {$group:{
        _id:'$releaseYear',
        avgRating:{$avg:'$ratings'},
        avgPrice:{$avg:'$price'},
        minPrice:{$min:'$price'},
        maxPrice:{$max:'$price'}
      }},
      {$sort:{minPrice:-1}}
    ])
    res.status(200).json({
      status:'success',
      count:movie.length,
      data:{
        movie
      }
    })
  }
  catch(err){
    res.status(404).json({
      status:"failed",
      message:err.message
    })
  }
}

module.exports={
    addMovies,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    filterQuery,
    advancedQuery,
    aggregateQuery
}