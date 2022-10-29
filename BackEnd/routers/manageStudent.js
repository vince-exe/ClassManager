const express = require('express')
const manageStudentController = require('../controllers/manageStudent')

const router = express.Router()

router.post('/api/add-student', manageStudentController.addStudent)

router.post('/api/updt-student', manageStudentController.updtStudent)

router.post('/api/get-student', manageStudentController.getStudent)

router.post('/api/del-student', manageStudentController.delStudent)

module.exports = router