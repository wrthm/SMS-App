import db from '../../database/index'
import { attendances as attendance } from '../../database/models'
import { NotImplementedException } from '../../exceptions'
import { checkIfNull } from '../../utils/validationUtils'


const Service = {
    studentLookup: async (rfid_id: string) => {
        // perform student lookup on this function

        // let result: attendance
        // return {"id": result.id}
        throw new NotImplementedException()
    }
}

export { Service as RFIDService }