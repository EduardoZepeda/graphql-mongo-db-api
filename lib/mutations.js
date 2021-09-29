'use strict'

const connectDb = require('./db')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newcourse = Object.assign(defaults, input)
    let db
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newcourse)
      newcourse._id = course.insertedId
    } catch (error) {

    }
    return newcourse
  }
}
