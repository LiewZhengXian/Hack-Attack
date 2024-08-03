import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import Incomes from './components/Incomes/Incomes';
import Expenses from './components/Expenses/Expenses';
import SignOut from './components/SignOut/SignOut';
import './App.css';

function App() {
  const [incomes, setIncomes] = useState(() => {
    const savedIncomes = localStorage.getItem('incomes');
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Calculate total incomes
  const totalIncomes = incomes.reduce((total, income) => total + parseFloat(income.amount), 0);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  // Persist incomes and expenses to localStorage
  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard totalIncomes={totalIncomes} totalExpenses={totalExpenses} />} />
        <Route path="/incomes" element={<Incomes incomes={incomes} setIncomes={setIncomes} />} />
        <Route path="/expenses" element={<Expenses expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </Router>
  );
}

export default App;
