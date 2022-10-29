const path = require('path')
const fs = require('fs')

const studentsDB = require('../data/students.json')
const managersDB = require('../data/classManagers.json')

const addStudent = (req, resp) => {
    const credentials = {
        id: 0,
        idManager: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: req.body.pwd,
        bdayDate: req.body.bdayDate
    }
    if(studentsDB.length == 0) {
        credentials.id = 1
    }
    else {
        credentials.id = studentsDB[studentsDB.length - 1].id + 1
    }
    
    const emailManager = req.body.emailManager

    if (studentsDB.find(it => it.email == credentials.email)) {
        /* Conflict */
        resp.sendStatus(409)
        return
    }
    /* get the manager so we can store his id in the credentials of the students */
    manager = managersDB.find(it => it.email == emailManager)
    credentials.idManager = manager.id
        
    studentsDB.push(credentials)
    fs.writeFileSync(path.join(__dirname, '../data', 'students.json'), JSON.stringify(studentsDB))

    resp.sendStatus(200)
}

const getStudent = (req, resp) => {
    student = studentsDB.find(student => student.id == req.body.id)
    if(!student) {
        resp.sendStatus(401)
        return
    }
    resp.status(200).json(
        {
            id: student.id,
            idManager: student.idManager,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            pwd: student.pwd,
            bdayDate: student.bdayDate
        }
    )
}

const updtStudent = (req, resp) => {
    const newCredentials = {
        id: req.body.id,
        idManager: req.body.idManager,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: req.body.pwd,
        bdayDate: req.body.bdayDate
    }
    studentsDB.forEach(student => {
        if(student.id == newCredentials.id) {
            student.firstName = newCredentials.firstName
            student.lastName = newCredentials.lastName,
            student.email = newCredentials.email,
            student.pwd = newCredentials.pwd,
            student.bdayDate = newCredentials.bdayDate
        }
    })

    fs.writeFileSync(path.join(__dirname, '../data', 'students.json'), JSON.stringify(studentsDB))
    resp.sendStatus(200)
}

module.exports = { addStudent, getStudent, updtStudent }
