/* ===================  





 ======================================    BU YERDA MUOMO bor   ======================================







=================== */


const express = require('express');
const Sequelize = require('sequelize');

// Load Model 
var optionModel = require("../models").options

var Op = Sequelize.Op;
const router = express.Router();

/* =======  GET admin PAGE  ======= */
router.get('/admin/currency-settings', function (req, res, next) {

    res.render("admin/currency-settings")
})

/* =======  POSTT admin PAGE  ======= */
router.post('/admin/currency-settings', function (req, res, next) {
    
       optionModel.findOne({
        where:{
            option_name:{
                [Op.eq]: "active_currency"
            }
        }
    }).then((data) => {
        if(data) {
            optionModel.update({
                option_value: req.body.dd_currency
            }, {
                where: {
                    option_name: {
                        [Op.eq] : "active_currency"
                    }
                }
            }).then((status) => {
                if(status) {
                    req.flash('success', "currency settings updated");
                    res.redirect('/admin/currency-settings');
                }else{
                    req.flash('error', "Failed to updated currnecy");
                }
                res.redirect('/admin/currency-settings');
            })
            // already we have that key
        }else {
            optionModel.create({
                option_name: "active_currency",
                option_value : req.body.dd_currency
            }).then((status) => {
                if(status) {
                    req.flash('success', "currency settings saved");
                    res.redirect('/admin/currency-settings');
                }else{
                    req.flash('error', "Failed to save currnecy");
                }
                res.redirect('/admin/currency-settings');
            })
        }
    })
})





router.get('/admin/day-settings', function (req, res, next) {
    res.render("admin/day-settings")
})


module.exports = router