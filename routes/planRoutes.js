const express = require('express')
const router = express.Router()
const plansController = require('../controllers/plansController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// CRUD - for managing plans (read only by dashboard id not all)
router.route('/')
    .post(plansController.createPlan)
    .patch(plansController.updatePlan)
    .delete(plansController.deletePlan)

router.route('/:dashboardId')
    .get(plansController.getPlansByDashboardId);

module.exports = router