const path = require('path')
const fs = require('fs')

const usersDB = require('../data/users.json')

const handleRegistration = (req, resp) => {
    const credentials = {
        id: usersDB[usersDB.length - 1].id + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: req.body.pwd,
        bdayDate: req.body.bdayDate
    }
    /* check for conflicts */
    if (usersDB.find(it => it.email == credentials.email)) {
        resp.sendStatus(409)
        return
    }

    usersDB.push(credentials)
    fs.writeFileSync(path.join(__dirname, '../data', 'users.json'), JSON.stringify(usersDB))

    resp.sendStatus(200)
}


module.exports = { handleRegistration }
