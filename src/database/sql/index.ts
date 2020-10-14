import {QueryFile, IQueryFileOptions} from 'pg-promise';

const {join: joinPath} = require('path');

export const course = {
    findByID: sql('courses/findByID.sql'),
    findByName: sql('courses/findByName.sql'),
    findAll: sql('courses/findAll.sql'),
    add: sql('courses/add.sql'),
}

function sql(file: string): QueryFile {

    const fullPath: string = joinPath(__dirname, file);

    const options: IQueryFileOptions = {
        minify: true
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}