const AppServerConfig = {
    APIPort: 81,
    PaginationDefaultLimit: 50,
    BcryptSaltRounds: 12,
}

const DatabaseConfig = {
    host: "127.0.0.1",
    port: 5432,
    user: "sms_appserver",
    password: "db_password",                // default password from initializing db
    database: "studentmanagementsystem",
    max: 64,                                // maximum simultaneous connections
}

const DatabaseAuthConfig = {
    host: "127.0.0.1",
    port: 5432,
    user: "sms_appserver",
    password: "db_password",
    database: "studentmanagementsystem_auth",
    max: 64,
}

export { AppServerConfig, DatabaseConfig, DatabaseAuthConfig }