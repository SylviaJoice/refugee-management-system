const express = require('express');
const router = express.Router();
const medicalController = require('../controllers/medicalController');

router.get('/', medicalController.list);
router.get('/add', medicalController.showAddForm);
router.post('/add', medicalController.create);
router.get('/edit/:id', medicalController.showEditForm);
router.post('/edit/:id', medicalController.update);
router.post('/delete/:id', medicalController.remove);

module.exports = router;
