'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find({}).toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getCourse: async (root, { id }) => {
    let db
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  getPeople: async () => {
    let db
    let students = []
    try {
      db = await connectDb()
      students = await db.collection('students').find({}).toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  getPerson: async (root, { id }) => {
    let db
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  searchItems: async (root, { keyword }) => {
    let db
    let courses
    let people
    let items
    try {
      db = await connectDb()
      courses = await db.collection('courses').aggregate([
        {
          $search: {
            index: 'courses_index',
            text: {
              query: keyword,
              path: {
                wildcard: '*'
              }
            }
          }
        }
      ]).toArray()
      people = await db.collection('students').aggregate([
        {
          $search: {
            index: 'students_index',
            text: {
              query: keyword,
              path: {
                wildcard: '*'
              }
            }
          }
        }
      ]).toArray()
      items = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return items
  }
}