const express = require('express');

const checkAuth = require('../middleware/check-auth');
const SpaceflightController = require("../controllers/spaceflight");
const router = express.Router();

router.get('', checkAuth, SpaceflightController.getAllSpaceflights);

router.post('', checkAuth, SpaceflightController.createSpaceflight);

router.put('/:id', checkAuth, SpaceflightController.updateSpaceflight);

router.delete('/:id', checkAuth, SpaceflightController.deleteSpaceflight);


module.exports = router;
