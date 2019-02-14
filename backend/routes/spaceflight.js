const express = require('express');

const checkAuth = require('../middleware/check-auth');
const SpaceflightController = require("../controllers/spaceflight");
const router = express.Router();

router.get('', checkAuth, SpaceflightController.getAllSpaceflights);


module.exports = router;
