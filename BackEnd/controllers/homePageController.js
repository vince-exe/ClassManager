const usersDB = require('../data/users.json')

const getInfoUser = (req, resp) => {
    const emailReq = req.body.email

    const user = usersDB.find(user => user.email == emailReq)
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

module.exports = { getInfoUser }
