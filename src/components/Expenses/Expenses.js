import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup, Container, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import SidebarNav from '../SidebarNav/SidebarNav';
import BreadcrumbAndProfile from '../BreadcrumbAndProfile/BreadcrumbAndProfile';
import * as XLSX from 'xlsx'; // Import xlsx
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faArrowCircleLeft, faArrowCircleRight, faPlusCircle, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function Expenses() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [category, setCategory] = useState(''); // State for storing selected category
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const categories = ['Utility', 'Rent', 'Groceries', 'Entertainment', 'Other']; // Example categories for expenses

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // New function to export incomes to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(expenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "Expenses.xlsx");
  };    

  const handleEdit = (expense) => {
    setEditing(true);
    setCurrentExpense(expense);
    setName(expense.name);
    setAmount(expense.amount);
    setDate(expense.date);
    setDescription(expense.description);
    setIsPaid(expense.status === "PAID");
    setCategory(expense.category || ''); // Set category for editing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date || !description || !category) {
      alert("All fields are required, including the category.");
      return;
    }
    const isConfirmed = window.confirm(editing ? "Are you sure you want to update this expense?" : "Are you sure you want to add this expense?");
    if (!isConfirmed) {
      return;
    }

    const expenseData = {
      id: editing ? currentExpense.id : Date.now(),
      name,
      amount,
      date,
      description,
      status: isPaid ? "PAID" : "DUE",
      category, // Save the selected category
    };

    if (editing) {
      setExpenses(expenses.map(expense => expense.id === currentExpense.id ? expenseData : expense));
    } else {
      setExpenses([...expenses, expenseData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setDate('');
    setDescription('');
    setIsPaid(false);
    setEditing(false);
    setCurrentExpense(null);
    setCategory(''); // Reset category
  };

  const handleRemove = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this expense?");
    if (isConfirmed) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

  // Filter expenses based on search query
  const filteredExpenses = searchQuery.length > 0
    ? expenses.filter(expense =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (expense.category?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      )
    : expenses;

  // Pagination logic
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle page navigation
  const handlePreviousPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev * expensesPerPage < filteredExpenses.length ? prev + 1 : prev);
  };

  const chartData = {
    labels: expenses.map(expense => new Date(expense.date)), // Make sure dates are converted to Date objects
    datasets: [
      {
        label: 'Total Expenses',
        data: expenses.map(expense => expense.amount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      x: {
        type: 'time', // Set x-axis scale to time
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Income (€)',
        },
      },
    },
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <SidebarNav />
        </Col>
        <Col md={10} className="main">
        <BreadcrumbAndProfile 
          username="Mr. French Pitbull" 
          role="Freelancer React Developer" 
          pageTitle="Expenses"
          breadcrumbItems={[
          { name: 'Dashboard', path: '/dashboard', active: false },
          { name: 'Expenses', path: '/expenses', active: true }
          ]}
          />
            {/* Search Bar */}
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Search expenses..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Row>
          <Col md={6}>
  <motion.div
    initial={{ opacity: 0, y: 20 }} // Start from slightly below and transparent
    animate={{ opacity: 1, y: 0 }} // Animate to fully visible and in its final position
    transition={{ duration: 0.5, delay: 0.3 }} // Customize duration and add a delay
  >
    <Card className="mt-3 total">
      <Card.Body>
        <Card.Title>Total Expense</Card.Title>
        <Card.Text>
          Total: €{totalExpense.toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  </motion.div>
</Col>

  <Col md={6}>
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  </Col>
</Row>
<Form onSubmit={handleSubmit}>
  <Row className="grid-row">
    <Col md={4}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Expense Name" required />
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" required />
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Income Amount in Euros" required />
      </Form.Group>
    </Col>
  </Row>
  <Row className="grid-row">
    <Col md={4}>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={4} className="d-flex align-items-center">
      <Form.Group>
        <Form.Check type="checkbox" label="Paid" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
      </Form.Group>
    </Col>
  </Row>
  <Button type="submit" className="mt-3 primary-button">{editing ? "Update Expense" : "Add Expense"}<FontAwesomeIcon icon={faPlusCircle} className="icon-right"/></Button>
</Form>

<ListGroup className="mt-3">
  {filteredExpenses.map((expense) => (
    <ListGroup.Item key={expense.id} className="list-group-item">
      <div className="expense-details">
        {`${expense.name} - Amount: €${expense.amount} - Date: ${expense.date} - Type: ${expense.description} - Category: ${expense.category || 'Not specified'} - Status: ${expense.status}`}
      </div>
      <div className="button-group">
        <Button className="edit" size="sm" onClick={() => handleEdit(expense)} style={{ marginRight: '5px' }}>
          <FontAwesomeIcon icon={faPenToSquare} className="icon-left"/>Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => handleRemove(expense.id)}>
          <FontAwesomeIcon icon={faTrashCan} className="icon-left"/>Remove
        </Button>
      </div>
    </ListGroup.Item>
  ))}
</ListGroup>



<Button onClick={exportToExcel} className="mt-3 excel-button">
          <FontAwesomeIcon icon={faFileExcel} className="icon-left" /> Export to Excel
      </Button>
                  {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePreviousPage} className="page" disabled={currentPage === 1}><FontAwesomeIcon icon={faArrowCircleLeft} /></Button>
            <Button onClick={handleNextPage} className="page" disabled={currentPage * expensesPerPage >= expenses.length}><FontAwesomeIcon icon={faArrowCircleRight} /></Button>
          </div>


        </Col>
      </Row>
    </Container>
  );
}

export default Expenses;
