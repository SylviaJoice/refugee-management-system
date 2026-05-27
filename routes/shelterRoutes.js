const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterController');

router.get('/', shelterController.list);
router.get('/add', shelterController.showAddForm);
router.post('/add', shelterController.create);
router.get('/edit/:id', shelterController.showEditForm);
router.post('/edit/:id', shelterController.update);
router.post('/delete/:id', shelterController.remove);

module.exports = router;
