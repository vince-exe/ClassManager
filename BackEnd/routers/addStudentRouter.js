const express = require('express')
const addController = require('../controllers/addStudentController')

const router = express.Router()

router.post('/api/add-student', addController.addStudent)

module.exports = router