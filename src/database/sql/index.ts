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
    add: sql('academic_terms/add.sql'),
    update: sql('academic_terms/update.sql'),
    delete: sql('academic_terms/delete.sql'),
}

export const students = {
    findByNameOR: sql('students/findByNameOR.sql'),
    findByNameAND: sql('students/findByNameAND.sql'),
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
}

export const enrollments = {
    add: sql('enrollments/add.sql'),
    delete: sql('enrollments/delete.sql'),
    listByStudentID: sql('enrollments/listByStudentID.sql'),
    listAll: sql('enrollments/listAll.sql'),
    findByID: sql('enrollments/findByID.sql'),
    getStudentID: sql('enrollments/getStudentID.sql'),
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
}

export const course_schedule_contents = {
    findByID: sql('course_schedules_contents/findByID.sql'),
    add: sql('course_schedules_contents/add.sql'),
    delete: sql('course_schedules_contents/delete.sql'),
    listCourseSchedule: sql('course_schedules_contents/listCourseSchedule.sql'),
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