const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task');

router.get('/:studentId',TaskController.getTask);
router.post('',TaskController.assignTask);
router.put('',TaskController.updateTask)
module.exports = router;