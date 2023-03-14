const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const userController = require('../controllers/userController');
const helper = require('../controllers/helper');

const fbappID = process.env.fbappID;
const fbSecret = process.env.fbSecret;

const ALERT_DANGER = 'alert-danger';
const LOGIN_ERR_MSG = 'Incorrect username or password';
const FB_NOT_LINK = "This FB account is not link with any account"

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',async (req,res,next)=>{
    try    {
        const {username,password} = req.body;

        let keepLoggedIn = (req.body.keepLoggedIn != undefined);
        let user = await userController.getUserByEmail(username);
        if (!user) {
            return res.render('login', {
                message: LOGIN_ERR_MSG,
                type: ALERT_DANGER
            })
        }

        let isMatch = userController.comparePassword(password,user.password)
        if (isMatch) {
            req.session.cookie.maxAge = keepLoggedIn ? 30*23*60*60*100 : null;
            req.session.user = user;
            return res.redirect('/');
        }
        else {
            return res.render('login', {
                message: LOGIN_ERR_MSG,
                type: ALERT_DANGER,
            })
        }
        } catch (e) {
                console.error(`Can not login with error ${String(e)}`)
                next(e)
    }
})

router.get('/logout',(req,res,next)=>{
    req.session.destroy(error => {
        if (error) return next(error);
        return res.redirect('/');
    })
})

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/profile',(req,res)=>{
    res.render('profile');
})


router.get('/facebook',async (req,res,next)=>{
    try {
        const nameCookie = `fbsr_${fbappID}`;
        let sign_request = req.cookies[nameCookie];
        let {FBID} = await helper.getFBID(sign_request);
        let user = await userController.getUserByFBID(FBID);

        // Sign-in Not OK -> Give a text for please sign in by the web-account and link the account
        if (!user) {
            return res.render('login', {
                message: FB_NOT_LINK,
                type: ALERT_DANGER
            })
        }
        // Sign-in OK
        req.session.cookie.maxAge = 30*23*60*60*100;
        req.session.user = user;
        return res.redirect('/');
    } catch (e) {
        console.error(`Can not login with error ${String(e)}`)
        next(e)
    }
})

router.get('/linkFB',async (req,res,next)=> {
    try {
        const nameCookie = `fbsr_${fbappID}`;
        let sign_request = req.cookies[nameCookie];
        let {FBID} = await helper.getFBID(sign_request);
        let user = await userController.getUserByFBID(FBID);

        // This FB ID is link with another account - Front-end will handle
        if (user) {
            return res.send({FBID: null});
        }

        // Link the curent user with the FB ID.
        let currentUser = req.session.user;
        let userDB = await userController.getUserByEmail(currentUser.username);
        userDB.fbID = FBID;
        await userDB.save();
        return res.send({FBID});
    } catch (e) {
        console.error(`Can not login with error ${String(e)}`)
        next(e)
    }})

router.post('/register', async (req,res)=>{
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword
    let keepLoggedIn = (req.body.keepLoggedIn != undefined)
    //Check password confirm
    if (password != confirmPassword) {
        return res.render('register', {
            message: 'Confirm password does not match',
            type: 'alert-danger'
        });
    }
    // Check username exists
    let user = await userController.getUserByEmail(username)
    if (user) {
        return res.render('register', {
            message: `Username ${username} is using`,
            type: 'alert-danger'
        });
    }
    user = {
        fullname,
        username,
        password
    }
    user = await userController.createUser(user);
    if (keepLoggedIn) {
        req.session.cookie.maxAge = 30*23*60*60*100;
        req.session.user = user;
        return res.redirect('/');
    }
    return res.render('login', {
        message: "You have register, Please loggged in",
        type: 'alert-primary'
    });
})

const storage = multer.diskStorage(
    {
        destination: './public/img/product',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname );
        }
    }
);

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

let uploadInstance = upload.single('photos')
const multerMiddeware = (req,res,next) => {
    uploadInstance(req,res,function (err) {
        if (err instanceof multer.MulterError) {
            res.status(404);
            return res.send(err.message);
        }
        next()
})}

router.post('/photoUpload',multerMiddeware, async (req,res,next)=>{
    try {
        const user = req.session.user;
        let userDB = await userController.getUserByEmail(user.username);
        userDB.avatarPath = `/img/product/${req.file.filename}`;
        await userDB.save();
        req.session.user = userDB;
        let result = {}
        result.status = true;
        result.path = userDB.avatarPath;
        return res.send(result);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;