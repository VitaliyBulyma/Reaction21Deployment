const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// gets back all workouts
router.get('/:first/:second', async (req,res)=>{
   try{
    const workouts = await Workout.find({ date: { $gte: req.params.first, $lte: req.params.second }});
    res.json(workouts);
   }catch(err){
    res.json({message: err});
   }
});



module.exports = router;