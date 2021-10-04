const typeDefs = `
interface Person {
    _id: ID
    name: String!
    email: String!
}

type Student implements Person {
    _id: ID
    name: String!
    email: String!
    avatar: String
}

type Monitor implements Person {
    _id: ID
    name: String!
    email: String!
    phone: String
}

type Course {
    _id: ID
    title: String!
    teacher: String
    description: String!
    topic: String
    people: [Student]
    level: Level
}

input CourseInput {
    title: String!
    teacher: String
    description: String!
    topic: String
    level: Level
}

input CourseEditInput {
    title: String
    teacher: String
    description: String
    topic: String
    level: Level
}

input PersonInput {
    name: String!
    email: String!
    phone: String
    avatar: String
}

input PersonEditInput {
    name: String!
    email: String!
    phone: String
    avatar: String
}

type DeleteStudentOut{
    status: Boolean
    entity: Student
}
type DeleteCourseOut{
    status: Boolean
    entity: Course
}

enum Level{
        principiante
        medio
        avanzado
    }

union GlobalSearch = Course | Student | Monitor

type Query {
    "Devuelve todos los cursos"
    getCourses: [Course]
    "Devuelve un curso"
    getCourse(id: ID!): Course
    "Devuelve todos los estudiantes"
    getPeople: [Person]
    "Devuelve un curso"
    getPerson(id: ID!): Person
    "Ejecuta una búsqueda global"
    searchItems(keyword: String!): [GlobalSearch]

}

type Mutation {
    "Crea un curso"
    createCourse(input: CourseInput!): Course
    "Crea un estudiante"
    createPerson(input: PersonInput!): Person
    "Edita un curso"
    editCourse(_id: ID!, input: CourseEditInput): Course
    "Edita un estudiante"
    editPerson(_id: ID!, input: PersonEditInput): Person
    "Elimina un curso"
    deleteCourse(_id: ID!): DeleteCourseOut
    "Elimina un estudiante"
    deleteStudent(_id: ID!): DeleteStudentOut
    "Agrega una persona a un curso"
    addPeople(courseID: ID!, personID: ID!): Course
}
`
module.exports = {
  typeDefs: typeDefs
}
