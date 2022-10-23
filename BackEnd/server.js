const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

/* save the server configs */
const serverConfigs = require('./configs/configs.json')

const app = express()

app.use(bodyParser.json())

app.use(cors())

/* serve the folder directory */
//app.use(express.static(path.join(__dirname, 'public')))

/* routers */
app.use('/login', require('./routers/loginRouter'))
app.use('/registration', require('./routers/registrationRouter'))

/* default router */
app.all('*', (req, resp) => {
    resp.status(404)
    /* send the files for the 404 */
    resp.sendFile(path.join(__dirname, 'view', '404.html'))
    resp.sendFile(path.join(__dirname, 'public/css', '404.css'))
})

app.listen(serverConfigs.port, () => {
    console.log(`Server is listening on port ${serverConfigs.port}`)
})
