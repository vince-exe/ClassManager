const express = require('express')
const homePageController = require('../controllers/homePageController')

const router = express.Router()

router.post('/api/info/me', homePageController.getInfoUser)

module.exports = router
