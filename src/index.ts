import dotenv from 'dotenv'
import Express from 'express'
import Routes from './components/routes'
import ip from 'ip'

const env_config = dotenv.config()
if (env_config.error) {
    throw env_config.error
}

const app = Express()
const port = 8080

Routes(app)

app.listen(port, () => {
    console.log(`Application Server now listening at http://${ip.address()}:${port}`)
})