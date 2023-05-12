const router = require('express').Router();
const { addIncome, getIncome, deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');

router
  .post('/add-income', addIncome)
  .get('/get-income', getIncome)
  .delete('/delete-income/:id', deleteIncome)
  .put('/update-income/:id', updateIncome)
  .patch('/update-income/:id', updateIncome)
  .post('/add-expense', addExpense)
  .get('/get-expense', getExpense)
  .delete('/delete-expense/:id', deleteExpense)
  .put('/update-expense/:id', updateExpense)
  .patch('/update-expense/:id', updateExpense);

module.exports = router;
