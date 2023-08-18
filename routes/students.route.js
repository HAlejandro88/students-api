const router = require('express').Router()
const {getStudents} = require('../controllers/studens.controller')

router.get('/', getStudents)


module.exports = router
