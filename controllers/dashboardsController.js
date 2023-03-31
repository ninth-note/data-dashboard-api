const Dashboard = require('../models/Dashboard')

// @desc Get dashboards that user owns
// @route GET /dashboards/:userId
// @access Private
const getDashboardsByUserId = async (req, res) => {
    const { userId } = req.params;
    const dashboards = await Dashboard.find({ user: userId });

    if (dashboards?.length) {
        res.json(dashboards)
    }
    
}

// @desc Create new dashboard
// @route POST /dashboards
// @access Private
const createDashboard = async (req, res) => {
    const { user, title, service, data } = req.body;

    // Confirm data
    if (!user || !title || !service || !data) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new dashboard
    const dashboard = await Dashboard.create({ user, title, service, data })

    if (dashboard) { // Created 
        return res.status(201).json({ message: 'New dashboard created' })
    } else {
        return res.status(400).json({ message: 'Invalid dashboard data received' })
    }
}

// @desc Delete a dashboard
// @route DELETE /dashboards
// @access Private
const deleteDashboard = async (req, res) => {
    const { id } = req.body

    // development purpose only
    if (!id) {
        return res.status(400).json({ message: 'Dashboard ID required' })
    }

    // Confirm that this dashboard exists to delete 
    const dashboard = await Dashboard.findById(id).exec()

    if (!dashboard) {
        return res.status(400).json({ message: 'Dashboard not found' })
    }

    const result = await dashboard.deleteOne()

    const reply = `Dashboard '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getDashboardsByUserId,
    createDashboard,
    deleteDashboard
}