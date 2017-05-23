const router = require('express').Router();
let Profile = require('../models/profile').Profile,
    Interest = require('../models/interest').Interest,
    multiparty = require('multiparty'),
    fs = require('fs'),
    jwt = require('jwt-simple'),
    secret = 'mysecretword',
    async = require('async'),
    EventEmitter = require('events');
const addToContacts = new EventEmitter();

router.post('/get-profile', (req, res) => {
    Profile.find(req.body, (err, doc) => {
        if (err) res.end(JSON.stringify({
            done: false
        }))
        else res.end(JSON.stringify(doc[0]));
    })
})

router.post('/get-profile-all', (req,res)=>{
    Profile.find({},(err,docs)=>{
        if (err) res.end(JSON.stringify({done: false}))
        else res.end(JSON.stringify(docs));
    })
})

router.post('/avatar-load', (req, res) => {
    const FOOLDER = './storage/';
    let form = new multiparty.Form();
    let uploadFile = {
        uploadPath: '',
        type: '',
        size: 0
    };
    let maxSize = 2 * 1024 * 1024; //2MB
    let supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    let errors = [];
    let email = "";

    form.on('error', (err) => {
        if (fs.existsSync(uploadFile.path)) {
            //если загружаемый файл существует удаляем его
            fs.unlinkSync(uploadFile.path);
            console.log('error');
        }
    });

    form.on('close', () => {
        if (errors.length == 0) {
            res.send(JSON.stringify({done:false }));
            fs.rename(uploadFile.path, FOOLDER + email + ".jpg", err => {
                Profile.update({email:email},{avatar:email + ".jpg"},err => console.log(err))
            })
        } else {
            if (fs.existsSync(uploadFile.path)) {
                //если загружаемый файл существует удаляем его
                fs.unlinkSync(uploadFile.path);
            }
            res.send({
                status: 'bad',
                errors: errors
            });
        }
    });

    form.on('field', (name, value) => {
        email = value;
    })
    // при поступление файла
    form.on('part', (part) => {
        //читаем его размер в байтах
        uploadFile.size = part.byteCount;
        //читаем его тип
        uploadFile.type = part.headers['content-type'];
        //путь для сохранения файла
        uploadFile.path = FOOLDER + part.filename;
        //проверяем размер файла, он не должен быть больше максимального размера
        if (uploadFile.size > maxSize) {
            errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
        }
        //проверяем является ли тип поддерживаемым
        if (supportMimeTypes.indexOf(uploadFile.type) == -1) {
            errors.push('Unsupported mimetype ' + uploadFile.type);
        }
        //если нет ошибок то создаем поток для записи файла
        if (errors.length == 0) {
            var out = fs.createWriteStream(uploadFile.path);
            part.pipe(out);
        } else {
            //пропускаем вообще здесь нужно как-то остановить загрузку и перейти к onclose
            part.resume();
        }
    });
    form.parse(req);
})

router.post('/update-profile', (req, res) => {
    Profile.update({
        email: req.body.email
    }, req.body, (err) => {
        if (err) res.end(JSON.stringify({
            done: false
        }));
        else res.end(JSON.stringify({
            done: true
        }));
    })
})

router.post('/profile-add-to-contacts', (req,res)=>{
    async.series([
        cb=>{
            Profile.update(req.body,{$push: {contacts: {
                email: jwt.decode(req.headers.token,secret).email,
                status: false
            }}},err=>{
                cb(err);
            })
        },
        cb=> {
            Profile.update({email: jwt.decode(req.headers.token,secret).email},{$push: {contacts: {
                email: req.body.email,
                status: false
            }}},err=>{
                cb(err);
            })
        }
    ],err=>{
        if (err) res.end(JSON.stringify({done:true}));
        else {
            res.end(JSON.stringify({done:true}))
            addToContacts.emit('addToContacts');
        }
    })
})

module.exports = router;
module.exports.addToContacts = addToContacts;