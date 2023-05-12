const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        //validations
        if (!title || !category || !description) {
            return res.status(400).json({
                message: 'All fields are required!'
            })
        }
        if (!amount) {
            return res.status(400).json({
                message: 'Amount is required!',
            });
        }
        if (!date) {
            return res.status(400).json({
                message: 'Date is required!',
            });
        }
        if (!category || !description) {
            return res.status(400).json({
                message: 'Category and description are required!',
            });
        }
        if (isNaN(amount)) {
            return res.status(400).json({
                message: 'Amount must be a number!',
            });
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({
                message: 'Amount must be greater than 0!',
            });
        }
        await expense.save();
        res.status(200).json({ message: 'Expense Added!' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
        console.log(expenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'Expense Deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong!' });
        });
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        const updatedexpense = await ExpenseSchema.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                category,
                description,
                date
            },
            { new: true }
        );

        if (!updatedexpense) {
            return res.status(404).json({ message: 'Expense not found!' });
        }

        res.status(200).json({ message: 'Expense updated!', expense: updatedexpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedexpense = await ExpenseSchema.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedexpense) {
            return res.status(404).json({ message: 'Expense not found!' });
        }

        res.status(200).json({ message: 'Expense updated!', expense: updatedexpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
