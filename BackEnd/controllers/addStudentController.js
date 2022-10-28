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

module.exports = { addStudent }