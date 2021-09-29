'use strict'

const { MongoClient } = require('mongodb')

require('dotenv').config()

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

console.log(process.env.DB_USER)

const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`
let connection

async function connectDB () {
  if (connection) return connection
  let dbConnection, client
  try {
    client = await MongoClient.connect(mongoURL, { useNewUrlParser: true })
    dbConnection = client.db(DB_NAME)
  } catch (error) {
    console.error('Could not connect to db', mongoURL, error)
    process.exit(1)
  }
  return dbConnection
}

module.exports = connectDB
