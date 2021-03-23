import Express from 'express'
import ip from 'ip'
import Routes from './components/routes'
import { logger } from './utils/logger'

const app = Express()
const port = 8080

Routes(app)

app.listen(port, () => {
    logger.info(`Application Server now listening at http://${ip.address()}:${port}`)
})