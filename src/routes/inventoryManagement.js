const express = require('express');

const router  = express.Router(); 

const inventoryController = require('../controllers/inventoryManager');
router.get('/', inventoryController.getItems);
router.get('/download', inventoryController.exportExcel);
router.put('/inventory/update/:id', inventoryController.updateItem);
router.post('/inventory/add/', inventoryController.addItem);
router.delete('/inventory/delete/:id/', inventoryController.deleteItem); 

module.exports = router; 