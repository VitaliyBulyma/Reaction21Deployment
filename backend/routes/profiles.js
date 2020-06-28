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
module.exports = router;