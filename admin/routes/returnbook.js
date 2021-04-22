/* ===================  





 ======================================    BU YERDA MUOMO bor   ======================================







=================== */

const express = require('express');
const Sequelize = require('sequelize');

var Op = Sequelize.Op

// load Models 
var userModel = require('../models').users;
const router = express.Router();

/* =======  GET admin PAGE  ======= */
router.get('/admin/return-a-book',  function (req, res, next) {
    var all_users =  userModel.findAll({
        where:{
            status: {
                [Op.eq]: '1'
            }
        }
    });
    res.render("admin/return-a-book", {
        users: all_users
    })    
})
router.get('/admin/return-list', function (req, res, next) {
    res.render("admin/return-list")
})

module.exports = router