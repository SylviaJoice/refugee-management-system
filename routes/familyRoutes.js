const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

router.get('/', familyController.list);
router.get('/add', familyController.showAddForm);
router.post('/add', familyController.create);
router.get('/edit/:id', familyController.showEditForm);
router.post('/edit/:id', familyController.update);
router.post('/delete/:id', familyController.remove);

module.exports = router;
