const expres = require('express')
const app = expres()
const studentsRoutes = require('./students.route')

app.use('/students', studentsRoutes)


module.exports = app