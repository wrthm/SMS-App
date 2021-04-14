import { CorsOptions } from 'cors'
import cors from 'cors'


const options: CorsOptions = {
    origin: "*",
}

export default function () {
    return cors(options)
}