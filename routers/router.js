const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/', controller.createPostSwiss);
router.get('/', controller.getAllSwissRecords);
router.get('/record/:id', controller.getRecordById);

module.exports = router;
