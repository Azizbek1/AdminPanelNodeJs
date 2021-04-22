const express = require('express');
const  bcrypt = require('bcrypt');


const Sequileze = require('sequelize');
var adminModel = require('../models').admin

const {redirectHome, redirectLogin} = require("../middleware/redirect");

var Op = Sequileze.Op
const router = express.Router();

/* =======  GET admin PAGE  ======= */
router.get('/admin/login', redirectHome, function (req, res, next) {
    res.render("login")
})
router.post('/admin/login', function (req, res, next) {
    adminModel.findOne({
        where: {
            email: {
                [Op.eq]: req.body.email
            }
        }
    }).then(user => {
         if(user) {
            // means we have data
            bcrypt.compare(req.body.password, user.password, function (error, result) {
                if(result) {
                    // User has data
                    req.session.isLoggedIn = true;
                    req.session.userId = user.id;
                    console.log(req.session)

                    res.redirect("/admin");
                }
                else{
                    req.flash('error', "Invalid login details");
                    res.redirect('/admin/login')
                }
            })
         }else{
            req.flash('error', "user not Found")
            res.redirect('/admin/login')
         }
    })
})



router.get('/admin/registr', function(req, res) {
    adminModel.create({
        name: "Online",
        email : "admin@m.com",
        password: bcrypt.hashSync('12345', 10)
    }).then(data => {
        if(data) {
            res.json({
                status: 1
            })  
        }else{
            res.json({
                status: 0
            })
        }
    })
})

router.get('/admin/logout' , redirectLogin,  function(req, res) {
    req.session.destroy(error => {
        if(error) {
            res.redirect('/admin')
        }
        res.redirect('/admin/login')
    })
})
module.exports = router