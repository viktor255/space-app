const express = require('express');

const checkAuth = require('../middleware/check-auth');
const CosmonautController = require("../controllers/cosmonaut");
const router = express.Router();

router.get('', checkAuth, CosmonautController.getAllCosmonauts);

router.post('', checkAuth, CosmonautController.createUser, CosmonautController.createCosmonaut);

router.put('/:id', checkAuth, CosmonautController.updateCosmonaut);

router.delete('/:id', checkAuth, CosmonautController.deleteUser, CosmonautController.deleteCosmonaut);

module.exports = router;
