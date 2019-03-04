const express = require('express');

const checkAuth = require('../middleware/check-auth');
const checkAuthOperator = require('../middleware/check-operator');
const CosmonautController = require("../controllers/cosmonaut");
const router = express.Router();

router.get('', checkAuth, CosmonautController.getAllCosmonauts);

router.post('', checkAuthOperator, CosmonautController.createUser, CosmonautController.createCosmonaut);

router.put('/:id', checkAuthOperator, CosmonautController.updateCosmonaut);

router.delete('/:id', checkAuthOperator, CosmonautController.deleteUser, CosmonautController.deleteCosmonaut);

module.exports = router;
