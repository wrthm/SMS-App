import { Request, Response, NextFunction } from 'express'
import { ip } from 'is_js'

export function requestIPcf() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.headers) {
            if (ip(req.headers['cf-connecting-ip'])) {
                const ipAdd = req.headers['cf-connecting-ip']
                Object.defineProperty(req, 'clientIp', {
                    get: function get() {
                      return ipAdd
                    },
                    configurable: true
                  })
            }
        }
        next()
    }
}