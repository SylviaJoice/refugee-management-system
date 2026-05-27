const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/', complaintController.list);
router.get('/add', complaintController.showAddForm);
router.post('/add', complaintController.create);
router.get('/edit/:id', complaintController.showEditForm);
router.post('/edit/:id', complaintController.update);
router.post('/delete/:id', complaintController.remove);

module.exports = router;
