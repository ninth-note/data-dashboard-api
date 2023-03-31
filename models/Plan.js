const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({

    dashboard: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dashboard'
    },
    title: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    focus: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    graph: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
});

module.exports = mongoose.model('Plan', planSchema);