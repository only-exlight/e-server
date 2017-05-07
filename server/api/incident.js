const router = require('express').Router();
let Incident = require('../models/incident').Incident;

router.post('/incident-new',(req,res)=>{
    let incident = new Incident(req.body);
    incident.save(err=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify({done:true}));
    })
});

router.post('/incident-update',(req,res)=>{
    Incident.update({ title : req.body.title }, req.body ,err=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify({done:true}));
    })
});

router.post('/incident-get-all',(req,res)=>{
    Incident.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify(docs));
    })
})

router.post('/incident-by-email', (req,res)=>{
    Incident.find(req.body,(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify(docs));
    })
})

module.exports = router;