const Plan = require('../models/Plan')

// @desc Get plans that belongs to dashboard
// @route GET /plans/:dashboardId
// @access Private
const getPlansByDashboardId = async (req, res) => {
    const { dashboardId } = req.params;

    if (dashboardId !== 'undefined') {

        const plans = await Plan.find({ dashboard: dashboardId });

        if (plans?.length) {
            res.json(plans)
        } else {
            res.json([])
        }
    }
}

// @desc Create new plan
// @route POST /plans
// @access Private
const createPlan = async (req, res) => {
    const { dashboard, title, service, focus, active, graph, data } = req.body;

    // Confirm data
    if (!dashboard || !title || !service || !focus || !graph || !data) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new plan
    const plan = await Plan.create({ dashboard, title, service, focus, active, graph, data })

    if (plan) { // Created 
        return res.status(201).json({ message: 'New plan created' })
    } else {
        return res.status(400).json({ message: 'Invalid plan data received' })
    }
}

// @desc Update a plan
// @route PATCH /plans
// @access Private
const updatePlan = async (req, res) => {
    const { id, dashboard, title, service, focus, active, graph, data  } = req.body

    // Confirm data
    if (!id || !dashboard || !title || !service || !focus || !graph || !data) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm plan exists to update
    const plan = await Plan.findById(id).exec()

    if (!plan) {
        return res.status(400).json({ message: 'Plan not found' })
    }

    plan.title = title
    plan.active = active
    plan.data = data

    const updatedPlan = await plan.save()

    res.json(`'${updatedPlan.title}' updated`)
}

// @desc Delete a plan
// @route DELETE /planss
// @access Private
const deletePlan = async (req, res) => {
    const { id } = req.body

    // development purpose only
    if (!id) {
        return res.status(400).json({ message: 'Plan ID required' })
    }

    // Confirm that this plan exists to delete 
    const plan = await Plan.findById(id).exec()

    if (!plan) {
        return res.status(400).json({ message: 'Plan not found' })
    }

    const result = await plan.deleteOne()

    const reply = `Plan '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getPlansByDashboardId,
    createPlan,
    updatePlan,
    deletePlan
}