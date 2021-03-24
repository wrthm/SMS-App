const ip = require('ip')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const config = require('./config/docsConfig')


const app = express()
const swaggerDocument = yaml.load('./docs/SMS-docs.yml')


const port = config.APIDocsPort

var options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
app.listen(port, () => {
    console.log(`API Documentation Server now listening at http://${ip.address()}:${port}`)
})