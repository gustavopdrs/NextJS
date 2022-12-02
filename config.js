require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const {Pool} = require('pg')

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
//const connectionString = `postgres://zrozxsdw:z9lZYPYaeqj_PbtNwnh2Tz8A6R0DD13D@babar.db.elephantsql.com/zrozxsdw`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL: connectionString
  , ssl: {
    rejectUnauthorized: false,
 }
})

module.exports = {pool}