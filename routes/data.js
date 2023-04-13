const express = require('express')

const {
    getData
} = require('../controllers/dataController')

const router = express.Router()


//GET top 10
router.get('/', getData)

module.exports = router
