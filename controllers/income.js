const IncomeSchema = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = IncomeSchema({
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
        await income.save();
        res.status(200).json({ message: 'Income Added!' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
        console.log(incomes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income Deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong!' });
        });
};

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
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

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found!' });
        }

        res.status(200).json({ message: 'Income updated!', income: updatedIncome });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found!' });
        }

        res.status(200).json({ message: 'Income updated!', income: updatedIncome });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
