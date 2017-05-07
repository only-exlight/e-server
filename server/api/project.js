const router = require('express').Router();
let Project = require('../models/project').Project;

router.post('/project-new',(req,res)=>{
    console.log(req.body);
    let project = new Project(req.body);
    project.save(err=>{
        console.log(err);
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify({done:true}));
    })
})

router.post('/project-remove',(req,res)=>{
    console.log(req.body);
    Project.remove(req.body,err=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify({done:true}));
    })
})

router.post('/projects-get-all',(req,res)=>{
    console.log(req.body);
    Project.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify(docs));
    })
})

router.post('/projects-get',(req,res)=>{
    console.log(req.body);
    Project.find(req.body,(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify(docs));
    })
})

router.post('/projects-update',(req,res)=>{
    Project.update(req.body.title,req.body, err=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify({done:true}));
    })
})

module.exports = router;