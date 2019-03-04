const express = require('express');

const checkAuth = require('../middleware/check-auth');
const checkAuthOperator = require('../middleware/check-operator');
const SpaceflightController = require("../controllers/spaceflight");
const router = express.Router();

router.get('', checkAuth, SpaceflightController.getAllSpaceflights);

router.post('', checkAuthOperator, SpaceflightController.createSpaceflight);

router.put('/:id', checkAuthOperator, SpaceflightController.updateSpaceflight);

router.delete('/:id', checkAuthOperator, SpaceflightController.deleteSpaceflight);


module.exports = router;
