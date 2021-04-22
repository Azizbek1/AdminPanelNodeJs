const express = require('express');
const {redirectHome, redirectLogin} = require("../middleware/redirect");
const router = express.Router();

/* =======  GET admin PAGE  ======= */
router.get('/admin', redirectLogin, function (req, res, next) {
    res.render("admin/dashboard")
})

module.exports = router