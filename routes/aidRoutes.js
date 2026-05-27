const express = require('express');
const router = express.Router();
const aidController = require('../controllers/aidController');

router.get('/', aidController.list);
router.get('/add', aidController.showAddForm);
router.post('/add', aidController.create);
router.get('/edit/:id', aidController.showEditForm);
router.post('/edit/:id', aidController.update);
router.post('/delete/:id', aidController.remove);

module.exports = router;
