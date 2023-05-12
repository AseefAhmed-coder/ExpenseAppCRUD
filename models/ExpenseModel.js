const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    amount: {
        type: 'number',
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    type: {
        type: 'String',
        required: true,
        default: "expense"
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    category: {
        type: 'String',
        required: true,
        default: "expense",
        trim: true
    },
    description: {
        type: 'String',
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200
    }
}, { timestamps: true })

module.exports = mongoose.model('expense', ExpenseSchema);