const express = require('express');
const router = express.Router();

const UserController = require('../controllers/student');

router.post('/register',UserController.student_register);
router.get('/getAllStudent',UserController.students);
router.get('/:studentId',UserController.getStudent);
router.delete('/:studentId',UserController.deleteStudent);
router.put('/update',UserController.updateStudent)
module.exports = router;