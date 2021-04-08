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

if (config.EnableRequestLogging) {
    const winston = require('winston')
    const expressWinston = require('express-winston')
    app.use(expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss A'}),
            winston.format.colorize(),
            winston.format.splat(),
            winston.format.printf((info) => {
                return `[${info.level}] ${info.timestamp} ${info.message}`
            })
        ),
        meta: false,
        colorize: true,
        expressFormat: true,
    }))
}

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
app.listen(port, () => {
    console.log(`API Documentation Server now listening at (http/https)://${ip.address()}:${port}`)
})