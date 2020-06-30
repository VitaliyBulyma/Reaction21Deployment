const express = require('express');
const router = express.Router();
// const Profile = require('../models/Profile');

// gets back all profiles
router.get('/:user', async (req,res)=>{
   try{
    const profiles = await Profile.find({user: req.params.user});
    res.json(profiles);
   }catch(err){
    res.json({message: err});
   }
});
// Edit profile
router.get('/editprofile/:id', async (req,res)=>{
    try{
     const profiles = await Profile.findById(req.params.id);
     res.json(profiles);
    }catch(err){
     res.json({message: err});
    }
 });

// Submits the profile
router.post('/', async (req, res)=>{
    const profile = new Profile({
        user: req.body.user, 
        gender: req.body.gender,   
        age: req.body.age,
        city: req.body.city    
    });
    try {
        const savedProfiles = await profile.save();
        res.json(savedProfiles);
    }catch (err){
        res.json({message:err});
    }
});

// Specific profile

router.get('/:profileId', async (req, res)=>{
    try{
    const profile = await Profile.findById(req.params.profileId);
    res.json(profile);
    }catch (err){
        res.json({message: err});
    }
});

// Delete a Specific profile
router.delete('/:profileId', async (req, res)=>{
    try{
    const removedProfile = await Profile.deleteOne({_id: req.params.profileId});
    res.json(removedProfile);
    }catch (err){
        res.json({message: err});
    }
});

// Update a Specific profile
router.patch('/:profileId', async (req, res)=>{
    try{
    const updatedProfile = await Profile.updateOne(
        {_id: req.params.profileId},
        {$set:{user: req.body.user, gender: req.body.gender, age: req.body.age,  city: req.body.city}},
        );
    res.json(updatedProfile);
    }catch (err){
        res.json({message: err});
    }
});
module.exports = router;