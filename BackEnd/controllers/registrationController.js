const path = require('path')
const fs = require('fs')

const managersDB = require('../data/classManagers.json')

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
    if (managersDB.find(it => it.email == credentials.email)) {
        resp.sendStatus(409)
        return
    }

    managersDB.push(credentials)
    fs.writeFileSync(path.join(__dirname, '../data', 'users.json'), JSON.stringify(managersDB))

    resp.sendStatus(200)
}


module.exports = { handleRegistration }
