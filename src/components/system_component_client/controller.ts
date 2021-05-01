import AuthService from '../../database/indexAuth'
import { NextFunction, Request, Response } from 'express'
import { system_components_clients as component_client } from '../../database/modelsAuth'
import { InvalidArgumentException, NotFoundException } from '../../exceptions'
import uid from 'uid-safe'
import { system_components_clients_external as component_client_external } from '../../database/modelsCustom'
import { systemComponentBits } from '../../utils/authConstants'

const Controller = {
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await AuthService.component_clients.listAll()
            return res.send(result)
        }
        catch (err) {
            next(err)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        const data: component_client_external = req.body
        try {
            data.api_key = await uid(16)
            data.client_name = data.client_name.trim()
            if (Array.isArray(data.component)) {
                let componentBits = 0
                data.component.forEach((val) => {
                    switch (val.toLowerCase()) {
                        case 'studentcenter':
                            componentBits |= systemComponentBits.StudentCenter
                            break
                        case 'managementpanel':
                            componentBits |= systemComponentBits.ManagementPanel
                            break
                        case 'attendancetracker':
                            componentBits |= systemComponentBits.AttendanceTracker
                            break
                        case 'studentinformationsystem':
                            componentBits |= systemComponentBits.StudentInformationSystem
                            break
                        default:
                            throw new InvalidArgumentException(`Invalid component value (${val})`)
                    }
                })
                data.component = componentBits
            }
            let result = await AuthService.component_clients.add(data as component_client)
            res.statusCode = 201
            return res.send({"code": 201, "message": "Component added successfully", "api_key": result.api_key})
        }
        catch (err) {
            next(err)
        }
        
    },
    revoke: async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.params
        try {
            if ((await AuthService.component_clients.revoke(name)).rowCount !== 0) {
                return res.send({"code": 200,"message": "Entry deleted successfully"})
            }
            else {
                return next(new NotFoundException('Entry does not exist'))
            }
        } catch (err) {
            next(err)
        }
    }
}



export { Controller as ComponentClientController }