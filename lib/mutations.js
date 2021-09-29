'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')

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
  },
  createStudent: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {

    }
    return input
  },
  deleteStudent: async (root, { _id }) => {
    let db
    let deletedStudent
    try {
      db = await connectDb()
      deletedStudent = await db.collection('student').findOneAndDelete({ _id: ObjectId(_id) })
    } catch (error) {

    }
    return { status: deletedStudent.lastErrorObject.n, entity: deletedStudent.value }
  },
  deleteCourse: async (root, { _id }) => {
    let db
    let deletedCourse
    try {
      db = await connectDb()
      deletedCourse = await db.collection('courses').findOneAndDelete({ _id: ObjectId(_id) })
    } catch (error) {

    }
    return { status: deletedCourse.lastErrorObject.n, entity: deletedCourse.value }
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course
    try {
      db = await connectDb()
      await db.collection('courses').updateOne({ _id: ObjectId(_id) }, { $set: input })
      course = await db.collection('courses').findOne({ _id: ObjectId(_id) })
    } catch (error) {

    }
    return course
  },
  editStudent: async (root, { _id, input }) => {
    let db
    let student
    try {
      db = await connectDb()
      await db.collection('students').updateOne({ _id: ObjectId(_id) }, { $set: input })
      student = await db.collection('students').findOne({ _id: ObjectId(_id) })
    } catch (error) {

    }
    return student
  }
}
