const router = require('express').Router();
let Profile = require('../models/profile').Profile;

router.post('/get-profile',(req,res)=>{
    Profile.find(req.body,(err,doc)=>{
        res.end(JSON.stringify(doc[0]));
    })
})

router.post('/update-profile',(req,res)=>{
    Profile.update({email:req.body.email},req.body,(err)=>{
        if (err){
            res.end(JSON.stringify({done:false}));
        } else {
            res.end(JSON.stringify({done:true}));
        }
    })
})

module.exports = router;