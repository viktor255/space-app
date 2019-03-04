const express = require('express');

const checkAuth = require('../middleware/check-auth');
const checkAuthOperator = require('../middleware/check-operator');
const SpacecraftController = require("../controllers/spacecraft");
const router = express.Router();


router.post('', checkAuthOperator, SpacecraftController.createSpacecraft);

router.put('/:id', checkAuthOperator, SpacecraftController.updateSpacecraft);

router.get('', checkAuth, SpacecraftController.getAllSpacecrafts);

router.delete('/:id', checkAuthOperator, SpacecraftController.deleteSpacecraft);

module.exports = router;
