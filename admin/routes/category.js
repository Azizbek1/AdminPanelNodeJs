const express = require('express');

const router = express.Router();
const Sequileze = require('sequelize');

/* Load Model */

var categoryModel = require('../models').category
var Op = Sequileze.Op

/* ======= ADD_CATEGORY  GET admin PAGE  ======= */
router.get('/admin/add-category', function (req, res, next) {
    res.render("admin/add-category")

})

/* =======  POST   ======= */
router.post('/admin/add-category', function (req, res, next) {
    categoryModel.findOne({
        where:{
            name:{
                [Op.eq] : req.body.name
            }
        }
    }).then((data) => {
        if(data) {
            // exists(существуют)
            req.flash("error", "Category Already exists") // Категория Уже существует
            res.redirect('/admin/add-category')
        }
        else{
            // no exists (не существуют)
            categoryModel.create({
                name: req.body.name,
                status: req.body.status
            }).then((category) => {
        
                if(category) {
                    req.flash("success", "Category created successfully")
                    res.redirect('/admin/add-category')
                }else{ 
                    req.flash("error", "Failed to create category")
                    res.redirect('/admin/add-category')
                }
        
            })
        }
    })


 
})


// =========== List Category  ===========
router.get('/admin/list-category', async function (req, res, next) {
     
    var all_categories = await  categoryModel.findAll();
    res.render("admin/list-category", {
        categories : all_categories
    })
})


/* ======== EDIT _ CATEGORY _ GET ======== */
router.get('/admin/edit-category/:categoryId', /* async */ function (req, res, next) {

    // var categody_data = await categoryModel.findOne({
        
    // })

    categoryModel.findOne({
        where:{
            id:{
                [Op.eq] : req.params.categoryId
            }
        }
    }).then((data) => {
        res.render("admin/edit-category", {
            category: data
        })
    })
})

/* Update Category POST */
router.post('/admin/edit-category/:categoryId', function(req, res) {
    categoryModel.findOne({
        where:{
            [Op.and]: [
                {
                    id:{
                        [Op.ne] : req.params.categoryId
                    }
                }, 
                {
                    name: {
                        [Op.eq]: req.body.name
                    }
                }
            ]
        }
    }).then(data => {
        if(data) {
                // cataegory already exists // Категория Уже существует
            req.flash('error', 'Category already exists');
            res.redirect('/admin/edit-category/' +  req.params.categoryId)
        }
        else{
                // category doesnot exists // категория не существует
                categoryModel.update({
                    name: req.body.name,
                    status: req.body.status 
                }, {
                    where: {
                        id: req.params.categoryId
                    }
                }).then(data => {
                    if(data) {
                        req.flash('success', 'Category has been updated')  // Категория обновлена
                    }else{
                        req.flash('error', 'Failed to update category')   // Не удалось обновить категорию
                    }
                    res.redirect('/admin/edit-category/' +  req.params.categoryId)
                }) 
        }
    })
})

/* DELETE CATEGORY */
router.post('/admin/delete-category', function (req, res) {
    categoryModel.findOne({
        where:{ 
            id:{ 
                [Op.eq]: req.body.categodry_id
            }
        }
    }).then(data => {
        if(data) {
            // we have data on the basis of the given id // у нас есть данные на основе данного идентификатора 
            categoryModel.destroy({
                where: {
                    id:{
                        [Op.eq] : req.body.categodry_id
                    }
                }
            }).then(status => {
                if(status) {
                    //deleted 
                    req.flash('success', 'Category has benn deleted successfully') // Категория успешно удалена
                }
                else{
                    // not deleted
                    req.flash('error', 'Failed to delete category' )
                }
                res.redirect('/admin/list-category')
            }) 
        }

        else{

        }
    }) 
})

module.exports = router