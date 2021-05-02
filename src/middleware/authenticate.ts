import { Request, Response, NextFunction } from 'express';
import AuthService from '../database/indexAuth'
import { systemComponentBits } from '../utils/authConstants'
import { sessions as session, system_components_clients } from '../database/modelsAuth'
import { UnauthorizedException } from '../exceptions';
import { DateTime } from 'luxon'

const _authenticateComponentOnly = async (req: Request, res: Response, next: NextFunction) => {
    const componentKey = req.headers['X-Component-Key']
    let component: number

    if (typeof componentKey === 'string') {
        const result: system_components_clients | null = await AuthService.component_clients.findByNotRevokedKey(componentKey)
        if (result) {
            component = result.component
        } else {
            throw new UnauthorizedException('Invalid component key')
        }
    } else {
        component = systemComponentBits.StudentCenter
    }
    req.component = component
}

const _authenticate = async (req: Request, res: Response, next: NextFunction) => {
    await _authenticateComponentOnly(req, res, next)
    const sessionToken = req.headers['X-Session-Token']

    if (typeof sessionToken === 'string') {
        const result: session | null = await AuthService.sessions.get(sessionToken)
        if (result) {
            if (DateTime.fromISO(result.expiration_date) < DateTime.now()) {
                await AuthService.sessions.revoke(result.session_token)
                throw new UnauthorizedException('Session token has expired')
            }
            console.log("session is valid")
            
            let privilege = 0
            if (result.type === 'faculty') {
                let facultyPriv = await AuthService.faculties.getPrivilege(result.id)
                if (facultyPriv) {
                    privilege = facultyPriv.privilege
                } else {
                    throw new UnauthorizedException('Invalid faculty ID assigned to session token')
                }
            }
            req.sessionData = {
                id: result.id,
                type: result.type,
                privilege: privilege
            }
        } else {
            throw new UnauthorizedException('Invalid session token')
        }
    } else {
        throw new UnauthorizedException('Session token not present in request')
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    _authenticate(req, res, next).then(() => next()).catch((err) => {next(err)});
}

export const authenticateComponentOnly = (req: Request, res: Response, next: NextFunction) => {
    _authenticateComponentOnly(req, res, next).then(() => next()).catch((err) => {next(err)});
}