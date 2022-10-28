const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

/* save the server configs */
const serverConfigs = require('./configs/configs.json')

const app = express()

app.use(bodyParser.json())

app.use(cors())

/* routers */
app.use('/login', require('./routers/loginRouter'))
app.use('/registration', require('./routers/registrationRouter'))
app.use('/homepage', require('./routers/homePageRouter'))
app.use('/addStudent', require('./routers/addStudentRouter'))

app.listen(serverConfigs.port, () => {
    console.log(`Server is listening on port ${serverConfigs.port}`)
})
