const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// gets back all workouts
router.get('/', async (req,res)=>{
   try{
    const workouts = await Workout.find();
    res.json(workouts);
   }catch(err){
    res.json({message: err});
   }
});
// Get all workouts by user
router.get('/getby/:username', async (req,res)=>{
   try{
    const workouts = await Workout.find({user: req.params.username});
    console.log(workouts);
    res.json(workouts);
   }catch(err){
    res.json({message: err});
   }
});
// Submits the workout
router.post('/', async (req, res)=>{
    const workout = new Workout({
        title: req.body.title,
        length: req.body.length,
        user: req.body.user        
    });
    try {
        const savedWorkouts = await workout.save();
        res.json(savedWorkouts);
    }catch (err){
        res.json({message:err});
    }
    

});

// Specific workout

router.get('/edit/:workoutId', async (req, res)=>{
    try{
    const workout = await Workout.findById(req.params.workoutId);
    res.json(workout);
    }catch (err){
        res.json({message: err});
    }
});

// Delete a Specific workout
router.delete('/:workoutId', async (req, res)=>{
    try{
    const removedWorkout = await Workout.deleteOne({_id: req.params.workoutId});
    res.json(removedWorkout);
    }catch (err){
        res.json({message: err});
    }
});

// Update a Specific workout
router.patch('/edit/:workoutId', async (req, res)=>{
    try{
    const updatedWorkout = await Workout.updateOne(
        {_id: req.params.workoutId},
        {$set:{title: req.body.title, length: req.body.length}}
        );
    res.json(updatedWorkout);
    }catch (err){
        res.json({message: err});
    }
});
module.exports = router;