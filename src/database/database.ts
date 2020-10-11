import { Client } from "pg"

const { Pool } = require ('pg')

const pool = Pool

module.exports = {
    async query(text: string, params: any) {
      const start = Date.now()
      const res = await pool.query(text, params)
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res.rowCount })
      return res
    },
    async getClient(callback: any) {
      const client = await pool.connect()
      return client
    }
}