const AppServerConfig = {
    APIPort: 80,
    PaginationDefaultLimit: 50,
    BcryptSaltRounds: 12,
}

const DatabaseConfig = {
    host: "127.0.0.1",
    port: 5432,
    user: "db_user",
    password: "db_password",
    database: "db_name",
    max: 64,
}

const DatabaseAuthConfig = {
    host: "127.0.0.1",
    port: 5432,
    user: "db_user",
    password: "db_password",
    database: "db_name",
    max: 64,
}

export { AppServerConfig, DatabaseConfig, DatabaseAuthConfig }