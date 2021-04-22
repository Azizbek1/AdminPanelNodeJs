const express = require('express');

const router = express.Router();
const Sequelize = require('sequelize');
var Op = Sequelize.Op

// load Model
var userModel = require('../models').users

/* =======  GET admin PAGE  ======= */
router.get('/admin/add-user', function (req, res, next) {
    res.render("admin/add-user")
})

/* =======  POST    ======= ADD_USER admin PAGE  ======= */
router.post('/admin/add-user', function (req, res, next) {

    // Email address check

    userModel.findOne({
        where: {
            email: {
                [Op.eq] : req.body.email
            }
        }
    }).then(data => {
        if(data) {
            // User already exists with that email adress //  Пользователь уже существует с этим адресом электронной почты
            req.flash('error', 'Email adress already exists');
            res.redirect('/admin/add-user')
        }else {
            userModel.create({
                name: req.body.name,
                email: req.body.email,
                mobile : req.body.mobile,
                gender : req.body.dd_gender,
                adress :req.body.adress,
                status: req.body.status,
            }).then(status => {
                if(status) {
                    req.flash('success', 'user has been created')
                    res.redirect('/admin/add-user')
        
                }else{
                    req.flash('error', 'Failed to save users');
                    res.redirect('/admin/add-user')
                }
            }) 
        }
    })




    // userModel.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     mobile : req.body.mobile,
    //     gender : req.body.dd_gender,
    //     adress :req.body.adress,
    //     status: req.body.status,
    // }).then(status => {
    //     if(status) {
    //         req.flash('success', 'user has been created')
    //         res.redirect('/admin/add-user')

    //     }else{
    //         req.flash('error', 'Failed to save users');
    //         res.redirect('/admin/add-user')
    //     }
    // }) 


   
})







/*==========  LIST USER   ========== */
router.get('/admin/list-user', async function (req, res, next) {

    var user_data = await userModel.findAll();
    res.render("admin/list-user", {
        users: user_data
    })
})


/* ========== EDIT USER ==========  */
router.get('/admin/edit-user/:userId', async function (req, res) {
    var userdata = await userModel.findOne({
        where: {
            id: {
                [Op.eq] : req.params.userId
            }
        }
    })
    res.render("admin/edit-user", {
        user: userdata
    })
})

// * ========== UPDATE USER  post ==========  */
router.post('/admin/edit-user/:userId', function(req, res)   {
    userModel.update({
        name: req.body.name,
        mobile : req.body.mobile,
        gender : req.body.dd_gender,
        adress :req.body.adress,
        status: req.body.status,
    }, {
        where: {
            id: {
                [Op.eq] : req.params.userId
            }
        }
    }).then(status => {
        if(status) {
            req.flash('success', 'User has been update successfly')
        }else{ 
            req.flash('error' , 'Failed to update user')
        }
        res.redirect('/admin/edit-user/' + req.params.userId)
    })
})


/* =========== DELETE =========== */
router.post('/admin/delete-user', function(req, res) {
    userModel.destroy({
        where: {
            id: {
                [Op.eq]: req.body.user_id
            }
        }
    }).then(status => { 
        if(status) {
            req.flash('success', "user deleted successfuly")
        }
        else{
            req.flash('error', 'Failed to delete user')
        }
         res.redirect('/admin/list-user')
    })
})





module.exports = router