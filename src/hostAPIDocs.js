const ip = require('ip')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')


const app = express()
const swaggerDocument = yaml.load('./docs/SMS-docs.yml')


const port = 8082



app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => {
    console.log(`API Documentation Server now listening at http://${ip.address()}:${port}`)
})