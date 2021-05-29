import {QueryFile, IQueryFileOptions} from 'pg-promise';
import { logger } from '../../utils/logger';

const {join: joinPath} = require('path');

export const common = {
    findByID: sql('./findByID.sql'),
    listAll: sql('./listAll.sql'),
    exists: sql('./exists.sql'),
}

export const courses = {
    findByID: sql('courses/findByID.sql'),
    findByName: sql('courses/findByName.sql'),
    listAll: sql('courses/listAll.sql'),
    listAllByDeptID: sql('courses/listAllByDeptID.sql'),
    add: sql('courses/add.sql'),
    update: sql('courses/update.sql'),
    delete: sql('courses/delete.sql'),
}

export const departments = {
    findByName: sql('departments/findByName.sql'),
    add: sql('departments/add.sql'),
    update: sql('departments/update.sql'),
    delete: sql('departments/delete.sql'),
}

export const academic_terms = {
    findByName: sql('academic_terms/findByName.sql'),
    listAll: sql('academic_terms/listAll.sql'),
    add: sql('academic_terms/add.sql'),
    update: sql('academic_terms/update.sql'),
    delete: sql('academic_terms/delete.sql'),
}

export const students = {
    findByNameOR: sql('students/findByNameOR.sql'),
    findByNameAND: sql('students/findByNameAND.sql'),
    findBySchoolID: sql('students/findBySchoolID.sql'),
    add: sql('students/add.sql'),
    update: sql('students/update.sql'),
    delete: sql('students/delete.sql'),
    enroll: sql('students/enroll.sql'),
    unenroll: sql('students/unenroll.sql'),
    unenrollAll: sql('students/unenrollAll.sql'),
    isEnrolled: sql('students/isEnrolled.sql'),
}

export const subjects = {
    findByName: sql('subjects/findByName.sql'),
    add: sql('subjects/add.sql'),
    update: sql('subjects/update.sql'),
    delete: sql('subjects/delete.sql'),
    listByCode: sql('subjects/listByCode.sql'),
}

export const enrollments = {
    add: sql('enrollments/add.sql'),
    delete: sql('enrollments/delete.sql'),
    listByStudentID: sql('enrollments/listByStudentID.sql'),
    listAll: sql('enrollments/listAll.sql'),
    findByID: sql('enrollments/findByID.sql'),
    getStudentID: sql('enrollments/getStudentID.sql'),
    studentHasEnrollments: sql('enrollments/studentHasEnrollments.sql'),
}

export const grades = {
    add: sql('grades/add.sql'),
    update: sql('grades/update.sql'),
    findByIDs: sql('grades/findByIDs.sql'),
    listAll: sql('grades/listAll.sql'),
    listByEnrollmentID: sql('grades/listByEnrollmentID.sql'),
}

export const professors = {
    findByID: sql('professors/findByID.sql'),
    listByNameOR: sql('professors/listByNameOR.sql'),
    listByNameAND: sql('professors/listByNameAND.sql'),
    listAll: sql('professors/listAll.sql'),
    add: sql('professors/add.sql'),
    update: sql('professors/update.sql'),
    delete: sql('professors/delete.sql'),
}

export const guardians = {
    findByStudentID: sql('guardians/findByStudentID.sql'),
    findByNameOR: sql('guardians/findByNameOR.sql'),
    findByNameAND: sql('guardians/findByNameAND.sql'),
    listAll: sql('guardians/listAll.sql'),
    add: sql('guardians/add.sql'),
    update: sql('guardians/update.sql'),
}

export const attendances = {
    add: sql('attendances/add.sql'),
    delete: sql('attendances/delete.sql'),
    listAll: sql('attendances/listAll.sql'),
    listByStudentID: sql('attendances/listByStudentID.sql'),
    listByStudentAcademicTermID: sql('attendances/listByStudentAcademicTermID.sql'),
}

export const schedules = {
    findByID: sql('schedules/findByID.sql'),
    listAll: sql('schedules/listAll.sql'),
    add: sql('schedules/add.sql'),
    update: sql('schedules/update.sql'),
    delete: sql('schedules/delete.sql'),
    search: sql('schedules/search.sql'),
}

export const config = {
    add: sql('config/add.sql'),
    get: sql('config/get.sql'),
    set: sql('config/set.sql'),
    exists: sql('config/exists.sql'),
    list: sql('config/list.sql'),
}

export const course_schedules = {
    findByID: sql('course_schedules/findByID.sql'),
    listAll: sql('course_schedules/listAll.sql'),
    add: sql('course_schedules/add.sql'),
    delete: sql('course_schedules/delete.sql'),
    update: sql('course_schedules/update.sql'),
    search: sql('course_schedules/search.sql'),
    _filterByAcademicTerm: sql('course_schedules/_filterByAcademicTerm.sql'),
}

export const course_schedule_contents = {
    findByID: sql('course_schedules_contents/findByID.sql'),
    add: sql('course_schedules_contents/add.sql'),
    delete: sql('course_schedules_contents/delete.sql'),
    listCourseSchedule: sql('course_schedules_contents/listCourseSchedule.sql'),
    listCourseScheduleByProf: sql('course_schedules_contents/listCourseScheduleByProf.sql'),
    _listCourseScheduleByProfAndAT: sql('course_schedules_contents/_listCourseScheduleByProfAndAT.sql'),
}

export const auth_students_credentials = {
    exists: sql('auth/students_credentials/exists.sql'),
    add: sql('auth/students_credentials/add.sql'),
    update: sql('auth/students_credentials/update.sql'),
    updatePasswordOnly: sql('auth/students_credentials/updatePasswordOnly.sql'),
    findByUsername: sql('auth/students_credentials/findByUsername.sql'),
    findByStudentID: sql('auth/students_credentials/findByStudentID.sql'),
    getUsername: sql('auth/students_credentials/getUsername.sql'),
}

export const auth_sessions = {
    create: sql('auth/sessions/create.sql'),
    get: sql('auth/sessions/get.sql'),
    revoke: sql('auth/sessions/revoke.sql'),
}

export const auth_sys_components_clients = {
    add: sql('auth/system_components_clients/add.sql'),
    revoke: sql('auth/system_components_clients/revoke.sql'),
    listAll: sql('auth/system_components_clients/listAll.sql'),
    findByKey: sql('auth/system_components_clients/findByKey.sql'),
    findByNotRevokedKey: sql('auth/system_components_clients/findByNotRevokedKey.sql'),
}

export const faculties = {
    add: sql('auth/faculties/add.sql'),
    update: sql('auth/faculties/update.sql'),
    updatePasswordOnly: sql('auth/faculties/updatePasswordOnly.sql'),
    getPrivilege: sql('auth/faculties/getPrivilege.sql'),
    getPassword: sql('auth/faculties/getPassword.sql'),
    findByID: sql('auth/faculties/findByID.sql'),
    findByUsername: sql('auth/faculties/findByUsername.sql'),
    listAll: sql('auth/faculties/listAll.sql'),
    delete: sql('auth/faculties/delete.sql'),
}

export const attendances_plan_b = {
    add: sql('attendances_plan_b/add.sql'),
    delete: sql('attendances_plan_b/delete.sql'),
    listByStudentAcademicTermID_DateRange: sql('attendances_plan_b/listByStudentAcademicTermID_DateRange.sql'),
    listByStudentAcademicTermID: sql('attendances_plan_b/listByStudentAcademicTermID.sql'),
}

function sql(file: string): QueryFile {
    const fullPath: string = joinPath(__dirname, file);

    const options: IQueryFileOptions = {
        minify: true
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        logger.error(qf.error.message, qf.error);
    }

    return qf;
}