const express = require('express');

const checkAuth = require('../middleware/check-auth');
const SpacecraftController = require("../controllers/spacecraft");
const router = express.Router();


router.post('', checkAuth, SpacecraftController.createSpacecraft);

router.put('/:id', checkAuth, SpacecraftController.updateSpacecraft);

router.get('', checkAuth, SpacecraftController.getAllSpacecrafts);

router.delete('/:id', checkAuth, SpacecraftController.deleteSpacecraft);

module.exports = router;
