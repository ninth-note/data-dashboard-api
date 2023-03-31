const express = require('express')
const router = express.Router()
const dashboardsController = require('../controllers/dashboardsController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// CRUD - for managing dashboards (only the CD at the moment)
router.route('/')
    .post(dashboardsController.createDashboard)
    .delete(dashboardsController.deleteDashboard)

router.route('/:userId')
    .get(dashboardsController.getDashboardsByUserId);

module.exports = router