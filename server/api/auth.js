const router = require('express').Router();
let User = require('../models/user').User,
    Token = require('../models/token').Token,
    Profile = require('../models/profile').Profile,
    async = require('async'),
    nodemailer = require('nodemailer');

var fromEmailAddress = 'yoyo100295@hotmail.com'
var toEmailAddress = 'kerpith@gmail.com'

let transporter = nodemailer.createTransport({
    series: 'hotmail',
    auth: {
        user: fromEmailAddress,
        password: '12n*qx10//'
    }
})

let mailOptions = {
    from: fromEmailAddress, // sender address
    to: toEmailAddress, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

router.post('/registration', (req, res) => {
    let user = new User(req.body);
    async.series([
        (cb)=>{
            user.save((err, user, affected) => cb());
        },
        (cb)=>{
            let emptyProfile = new Profile({email:req.body.email})
            emptyProfile.save(err=>cb())
        },
        (cb)=>{
            transporter.sendMail(mailOptions,(err,inf)=>{
                if (err){
                    console.log(err);
                    cb();
                } else console.log(inf);
            })
        }],
        (err,result)=>{
            if (err){
                res.end(JSON.stringify({done:false}));
            } else {
                res.end(JSON.stringify({done:true}));
            }
    })
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
                res.end(JSON.stringify({done:false}));
            };
        } else {
            res.end(JSON.stringify({done:false}));
        }
    })

})

router.post('/logout', (req, res) => {
    console.log(req.body);
})

module.exports = router;