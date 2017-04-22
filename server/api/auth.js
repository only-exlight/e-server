const router = require('express').Router();
let User = require('../models/user').User,
    Token = require('../models/token.js').Token,
    async = require('async');

router.post('/registration', (req, res) => {
    let user = new User(req.body);
    user.save((err, user, affected) => {
        res.end();
    });
})

router.post('/login', (req, res) => {
    let user = new User();
    User.findOne({email: req.body.email},(err,findUser)=>{
        if (findUser){
            let user = new User(findUser);
            if (user.checkPassowrd(req.body.password)){
                let token = new Token ({owner:req.body.email});
                token.save((err,token,affected)=>{
                    res.end(JSON.stringify(token));
                });
            } else {
                res.status(403);
                res.end();
            };
        } else {
            res.status(403);
            res.end();
        }
    })

})

router.post('/logout', (req, res) => {
    console.log(req.body);
})

module.exports = router;