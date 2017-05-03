const router = require('express').Router();
let Profile = require('../models/profile').Profile,
    Project = require('../models/project').Project,
    Group = require('../models/group').Group;

router.post('/search-profiles', (req,res)=>{
    Profile.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}))
        else res.end(JSON.stringify(docs));
    })
})

router.post('/search-groups', (req,res)=>{
    Group.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}))
        else res.end(JSON.stringify(docs));
    })
})

router.post('/search-projects', (req,res)=>{
    Project.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}))
        else res.end(JSON.stringify(docs));
    })
})

module.exports = router;