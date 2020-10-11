const { Pool } = require ('pg')

const pool = Pool

module.exports = {
    async query(text, params) {
      const start = Date.now()
      const res = await pool.query(text, params)
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res.rowCount })
      return res
    },
    async getClient(callback) {
      const client = await pool.connect()
      return client
    }
}