import {QueryFile, IQueryFileOptions} from 'pg-promise';
import { logger } from '../../utils/logger';

const {join: joinPath} = require('path');

export const course = {
    findByName: sql('courses/findByName.sql'),
    add: sql('courses/add.sql'),
    update: sql('courses/update.sql'),
    delete: sql('./courses/delete.sql'),
}

export const common = {
    findByID: sql('./findByID.sql'),
    listAll: sql('./listAll.sql'),
    exists: sql('./exists.sql'),
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