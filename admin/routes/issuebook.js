const express = require('express');
const Sequileze = require('sequelize');
var Op = Sequileze.Op
// Load modals 
var categoryModel = require('../models').category
var usersModel = require('../models').users
var bookModel = require('../models').book
var issuebookModel = require('../models').issuebook

const router = express.Router();
/* =======  GET admin PAGE  ======= */
router.get('/admin/issue-book', async function (req, res, next) {
    var categories = await categoryModel.findAll({
        where: {
            status:{
                [Op.eq] : '1'
            }
        }
    })
    var users = await usersModel.findAll({
        where: {
            status:{
                [Op.eq] : '1'
            }
        }
    })
    // var book = await bookModel.findAll({
    //     where: {
    //         status:{
    //             [Op.eq] : '1'
    //         }
    //     }
    // })
    res.render("admin/issue-a-book", {
        categories: categories,
        users: users
    })
})




router.get('/admin/issue-history', function (req, res, next) {
    res.render("admin/issue-history")
})
router.get('/admin/return-a-book', function (req, res, next) {
    res.render("admin/return-a-book")
})



/* POST */
router.post('/admin/category-list-book', async function (req, res) {
    var category_id = req.body.cat_id; 
    var books = await bookModel.findAll({
        where: {
            categoryid: {
                [Op.eq]: category_id
            }
        }
    })
    return res.json({
        status: 1,
         books: books
    })
})

/* POST METHOD */

router.post('/admin/issue-book', async function(req, res) {

    var is__book_issued = await issuebookModel.count({
        where: {
            userid: {
                [Op.eq]: req.body.dd_user
            },
            bookid: {
                [Op.eq]: req.body.dd_book
            },
            is_returned: {
                [Op.eq] : '0'
            }
        }
    })
    if(is__book_issued > 0) {
        req.flash('error', 'Book has been already issued to this user ')
        res.redirect('/admin/issue-book')
    }
    else{
        var count_books = await issuebookModel.count({
            where: {
                userid: {
                    [Op.eq] : req.body.dd_user
                },
                is_returned: {
                    [Op.eq] : '0'
                }
            }
        })
    
        if(count_books >= 2) {
            req.flash('error', 'Maximum books allowed for each user equals to 2')
            res.redirect("/admin/issue-book")
        }else{
            issuebookModel.create({
                categoryid: req.body.dd_category,
                bookid : req.body.dd_book,
                userid : req.body.dd_user,
                days_issued: req.body.dd_days
            }).then(status => {
                if(status) {
                    req.flash('success', 'Book has been issued successfuly')
                }
                else{
                    req.flash('error', 'Failed to issue Book')
                }
                  res.redirect('/admin/issue-history')
            })
        }
    }
   
   
})


module.exports = router