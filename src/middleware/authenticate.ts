import { Request, Response, NextFunction } from 'express';
import AuthService from '../database/indexAuth'
import { systemComponentBits } from '../utils/authConstants'
import { sessions as session, system_components_clients } from '../database/modelsAuth'
import { UnauthorizedException } from '../exceptions';
import { DateTime } from 'luxon'

const _authenticateComponentOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const componentKey = req.get('X-Component-Key')
        let component: number

        if (typeof componentKey === 'string') {
            const result: system_components_clients | null = await AuthService.component_clients.findByNotRevokedKey(componentKey)
            if (result) {
                component = result.component
            } else {
                return next(new UnauthorizedException('Invalid component key'))
            }
        } else {
            component = systemComponentBits.StudentCenter
        }
        req.component = component
    } catch (err) {
        next(err)
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await _authenticateComponentOnly(req, res, next)
        const sessionToken = req.get('X-Session-Token')

        if (typeof sessionToken === 'string') {
            const result: session | null = await AuthService.sessions.get(sessionToken)
            if (result) {
                if (DateTime.fromISO(result.expiration_date) < DateTime.now()) {
                    await AuthService.sessions.revoke(result.session_token)
                    return next(new UnauthorizedException('Unauthorized: Session token has expired'))
                }
                
                let privilege = 0
                if (result.type === 'faculty') {
                    let facultyPriv = await AuthService.faculties.getPrivilege(result.id)
                    if (facultyPriv) {
                        privilege = facultyPriv.privilege
                    } else {
                        return next(new UnauthorizedException('Unauthorized: Faculty does not exist'))
                    }
                }
                req.sessionData = {
                    token: result.session_token,
                    id: result.id,
                    type: result.type,
                    privilege: privilege
                }
            } else {
                return next(new UnauthorizedException('Unauthorized: Invalid session token'))
            }
            next()
        } else {
            return next(new UnauthorizedException('Unauthorized: Session token not present in HTTP header'))
        }
    } catch (err) {
        next(err)
    }
}

export const authenticateComponentOnly = (req: Request, res: Response, next: NextFunction) => {
    _authenticateComponentOnly(req, res, next).then(() => next()).catch((err) => {next(err)})
}