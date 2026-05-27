const express = require('express');
const router = express.Router();
const refugeeController = require('../controllers/refugeeController');

router.get('/', refugeeController.list);
router.get('/add', refugeeController.showAddForm);
router.post('/add', refugeeController.create);
router.get('/edit/:id', refugeeController.showEditForm);
router.post('/edit/:id', refugeeController.update);
router.post('/delete/:id', refugeeController.remove);
router.get('/view/:id', refugeeController.viewDetails);

module.exports = router;
