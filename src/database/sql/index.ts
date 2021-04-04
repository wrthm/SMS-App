import {QueryFile, IQueryFileOptions} from 'pg-promise';
import { logger } from '../../utils/logger';

const {join: joinPath} = require('path');

export const common = {
    findByID: sql('./findByID.sql'),
    listAll: sql('./listAll.sql'),
    exists: sql('./exists.sql'),
}

export const courses = {
    findByName: sql('courses/findByName.sql'),
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

function sql(file: string): QueryFile {

    const fullPath: string = joinPath(__dirname, file);

    const options: IQueryFileOptions = {
        minify: true
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        logger.error(qf.error);
    }

    return qf;
}