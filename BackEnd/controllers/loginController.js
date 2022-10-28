const managersDB = require('../data/classManagers.json')

const handleLogin = (req, resp) => {
    const credentials = {
        email: req.body.email,
        pwd: req.body.pwd
    }
    
    let check = managersDB.find(it => it.email == credentials.email && it.pwd == credentials.pwd)
    if (!check) {
        resp.sendStatus(401)
        return
    }
    resp.sendStatus(200)
}

module.exports = { handleLogin }
