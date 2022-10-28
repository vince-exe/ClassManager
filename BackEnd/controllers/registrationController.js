const path = require('path')
const fs = require('fs')

const managersDB = require('../data/classManagers.json')

const handleRegistration = (req, resp) => {
    const credentials = {
        id: 0,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pwd: req.body.pwd,
        bdayDate: req.body.bdayDate
    }
    if(managersDB.length == 0) {
        credentials.id = 1
    }
    else {
        credentials.id = managersDB[managersDB.length - 1].id + 1
    }

    /* check for conflicts */
    if (managersDB.find(it => it.email == credentials.email)) {
        resp.sendStatus(409)
        return
    }

    managersDB.push(credentials)
    fs.writeFileSync(path.join(__dirname, '../data', 'classManagers.json'), JSON.stringify(managersDB))

    resp.sendStatus(200)
}


module.exports = { handleRegistration }
