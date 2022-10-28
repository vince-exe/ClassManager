const managersDB = require('../data/classManagers.json')
const studentsDB = require('../data/students.json')

const getInfoUser = (req, resp) => {
    const emailReq = req.body.email

    const user = managersDB.find(user => user.email == emailReq)
    if (!user) {
        resp.status(404).json({ message: 'no user found' })
        return
    }

    resp.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        pwd: user.pwd,
        bdayDate: user.bdayDate
    })
}

const getStudents = (req, resp) => {
    const emailReq = req.body.email

    const manager = managersDB.find(manager => manager.email == emailReq)
    const students = studentsDB.filter(student => student.idManager == manager.id)

    resp.status(200).json({studentsList: students})
}

module.exports = { getInfoUser, getStudents}
