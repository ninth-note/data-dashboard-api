const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    data: [
        {
            root: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            dataGrid: {
                x: {
                    type: Number,
                    required: true,
                },
                y: {
                    type: Number,
                    required: true,
                },
                w: {
                    type: Number,
                    required: true,
                },
                h: {
                    type: Number,
                    required: true,
                },
            },
            color: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Dashboard', dashboardSchema);