const router = require('express').Router();
let Ivent = require('../models/ivent').Ivent;

router.post('/ivents-get',(req,res)=>{
    console.log(req.body);
    Ivent.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done:false}));
        else res.end(JSON.stringify(docs));
    })
})

module.exports = router;