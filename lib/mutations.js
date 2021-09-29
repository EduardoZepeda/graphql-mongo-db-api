'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')

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
      errorHandler(error)
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
      errorHandler(error)
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
      errorHandler(error)
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
      errorHandler(error)
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
      errorHandler(error)
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
      errorHandler(error)
    }
    return student
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectId(courseID) })
      person = await db.collection('students').findOne({ _id: ObjectId(personID) })
      if (!course || !person) {
        throw new Error('El estudiante o el curso no existe')
      }
      await db.collection('courses').updateOne(
        { _id: ObjectId(courseID) }, { $addToSet: { people: ObjectId(personID) } }
      )
      return course
    } catch (error) {
      errorHandler(error)
    }
    return course
  }
}
