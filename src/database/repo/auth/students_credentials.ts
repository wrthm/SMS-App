import { IDatabase, IMain } from "pg-promise";
import { students_credentials } from '../../modelsAuth'
import { students_credentials_put } from '../../modelsCustom'
import { auth_students_credentials as sql, common} from '../../sql'

export class StudentsCredentialsRepository {
    constructor(private db: IDatabase<any>, private pgp: IMain) {

    }

    async updateOrAdd(data: students_credentials_put) {
        return await this.db.task(async t => {
            const credExists = await t.one(sql.exists, data)
            if (credExists.exists) {    // update student credential
                await t.none(sql.update, data)
                return {success: true, message: 'Update'}
            } else {                    // create student credential
                if (data.username != null && data.password != null) {
                    await t.none(sql.add, data)
                    return {success: true, message: 'Create'}
                } else {
                    return {success: false, message: 'Both username and password must be supplied before creating student\'s credential'}
                }
            }
        })
    }

    // USE THIS WHEN THE CLIENTS FETCH STUDENT CRED, DON'T EXPOSE (HASHED) PW!!
    async getUsername(student_id: string) {
        return this.db.oneOrNone(sql.getUsername, {student_id})
    }

    async findByUsername(username: string) {
        return this.db.oneOrNone(sql.findByUsername, {username})
    }

    async findByStudentID(student_id: string) {
        return this.db.oneOrNone(sql.findByStudentID, {student_id})
    }
}