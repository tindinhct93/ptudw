const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',async (req,res,next)=>{
    try    {
        let email = req.body.username;
        let password = req.body.password;
        let keepLoggedIn = (req.body.keepLoggedIn != undefined);
        let user = await userController.getUserByEmail(email);
        if (!user) {
            return res.render('login', {
                message: "Incorrect username or password",
                type: 'alert-danger'
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
                message: "Incorrect username or password",
                type: 'alert - danger'
            })
        }
        } catch (e) {next(e)}
})

router.get('/logout',(req,res,next)=>{
    req.session.destroy(error => {
        if (error) return next(error);
        return res.render('login');
    })
})

router.get('/register',(req,res)=>{
    res.render('register');
})


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
        username: username,
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


module.exports = router;


