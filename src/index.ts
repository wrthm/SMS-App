import Express from 'express'
import ip from 'ip'
import Routes from './components/routes'
import { logger } from './utils/logger'
import { AppServerConfig } from './config'

const app = Express()
const port = AppServerConfig.APIPort

Routes(app)

app.listen(port, () => {
    logger.info(`Application Server now listening at http://${ip.address()}:${port}`)
})