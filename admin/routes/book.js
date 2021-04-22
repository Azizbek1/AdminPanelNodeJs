const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

var bookModel = require('../models').book
/* Category Model */
var categoryModel = require('../models').category;

/* Book Model */


var Op = Sequelize.Op;


/* =======  GET admin PAGE  ======= */
router.get('/admin/add-book', async function (req, res, next) {

    var categories = await categoryModel.findAll({
        where: {
            status: {
                [Op.eq]: '1'
            }
        }
    })

    res.render("admin/add-book", {
        categories: categories
    })
})

/* BOOK = POST */
router.post('/admin/add-book', function (req, res, next) {
    if(!req.files) {
        req.flash('error', 'Please upload some file'); //  Пожалуйста, загрузите какой-нибудь файл
    }
    else{
        var image_attr =  req.files.cover_image;
        // res.json(image_attr)
        var valid_images_extensions = ['image/png', 'image/jpeg', 'image/jpg']
        if(valid_images_extensions.includes(image_attr.mimetype)){
         image_attr.mv('./public/uploads/' + image_attr.name);
            bookModel.create({
            name: req.body.name,
            categoryid: req.body.dd_category,
            description: req.body.description,
            amount: req.body.amount,
            cover_image: "/uploads/" + image_attr.name,  
            author: req.body.author,
            status: req.body.status,
        }).then((data) => {
                if(data) {
                        // saved
                        req.flash('success', "Book has been created");
                    }else{
                        req.flash('error', 'Failled to create book')
                        // not saved 
                    }
                    res.redirect('/admin/add-book')
                }) 
        }
        else{
            req.flash('error', 'Invalid file selected');
            res.redirect('/admin/add-book');
        }
      
    }
})


/* List == Book  */
router.get('/admin/list-book', async function (req, res, next) {

    var books = await bookModel.findAll({
        include: {
            model: categoryModel,
            attributes: ['name']
        }
    });
    // res.json(books)
    res.render("admin/list-book", {
        books: books
    })
})


/* EDIT ==== BOOK - GET */
router.get('/admin/edit-book/:bookId', async function (req, res) {
    var book_data = await bookModel.findOne({
        where: {
            id: {
                [Op.eq] : req.params.bookId
            }
        }
    })

    var categories = await categoryModel.findAll({
        where: {
            status: {
                [Op.eq]: '1'
            }
        }
    })

    res.render("admin/edit-book", {
        book: book_data,
        categories : categories
    })
})



/* EDIT ==== BOOK - POST */
router.post('/admin/edit-book/:bookId', async function (req, res) {
     if(!req.files ) {
         //not going to update cover image // определите ассоциацию здесь не собираюсь обновлять изображение обложки

         bookModel.update({
            name: req.body.name,
            categoryid: req.body.dd_category,
            description: req.body.description,
            amount: req.body.amount,
            author: req.body.author,
            status: req.body.status,
         },{
             where: {
                 id: {
                     [Op.eq]: req.params.bookId
                 }
             }
         }).then((data) => {
             if(data) {
                req.flash('success', 'Book has been update successfully')
             }else{
                 req.flash('error', "Failed to update book")
             }
             res.redirect('/admin/edit-book/' + req.params.bookId)
         })
     }       
     else{
         // going to update cover image // собираемся обновить изображение обложки
         var image_attr =  req.files.cover_image;

         var valid_images_extensions = ['image/png', 'image/jpeg', 'image/jpg']

         if(valid_images_extensions.includes(image_attr.mimetype)){

          image_attr.mv('./public/uploads/' + image_attr.name);
             bookModel.update({
             name: req.body.name,
             categoryid: req.body.dd_category,
             description: req.body.description,
             amount: req.body.amount,
             cover_image: "/uploads/" + image_attr.name,  
             author: req.body.author,
             status: req.body.status,
         }, {
             where: {
                 id: {
                     [Op.eq] : req.params.bookId
                 }
             }
         }).then((data) => {
                 if(data) {
                         // saved
                         req.flash('success', "Book has been Successfuly");
                     }else{
                         req.flash('error', 'Failled to Update book')
                         // not saved 
                     }
                     res.redirect('/admin/edit-book/' + req.params.bookId)
                 }) 
         }
         else{
             req.flash('error', 'Invalid file selected');
             res.redirect('/admin/edit-book/' + req.params.bookId);
         }
     }
})

/* DELETE book */
router.post('/admin/delete-book/:bookId', function (req, res) {
    bookModel.findOne({
        where: {
            id: {
                [Op.eq]: req.body.book_id
            }
        }
    }).then(data => {
        if(data) {
            bookModel.destroy({
                where: {
                    id: {
                        [Op.eq]: req.body.book_id
                    }
                }
            }).then(status => {
                if(status){
                    req.flash('success', 'Book has been delete');
                    res.redirect('/admin/list-book')
                }
                else{
                    req.flash('error', 'Failed to delete boook');
                    res.redirect('/admin/list-book')
                }
            })


        }
        else{
            req.flash('error', 'Invalid Book id');
            res.redirect('/admin/list-book')
        }
    })
})
module.exports = router