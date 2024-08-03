// Dashboard.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SidebarNav from '../SidebarNav/SidebarNav';
import BreadcrumbAndProfile from '../BreadcrumbAndProfile/BreadcrumbAndProfile';
import InfoCard from '../InfoCard/InfoCard';
import NewsCard from '../NewsCard/NewsCard'; // Update the import path
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function Dashboard({ totalIncomes, totalExpenses }) {
  // Calculate the total financial data
  const total = totalIncomes + totalExpenses;

  // Function to reload the page
  const handleReload = () => {
    window.location.reload();
  };

  return (
<Container fluid>
  <Row>
    <Col md={2} className="sidebar">
      <SidebarNav />
    </Col>
    <Col md={10} className="main-content main">
      <BreadcrumbAndProfile 
        username="Mr. French Pitbull" 
        role="Freelancer React Developer" 
        pageTitle="Dashboard"
        breadcrumbItems={[
          { name: 'Dashboard', path: '/dashboard', active: true },
          { name: 'Welcome', path: '/welcome', active: true }
        ]}
      />

      {/* Row for the three buttons */}
      <Row className="mb-3">
        <Col md={4}>
          <Button onClick={handleReload} className="secondary-button w-50">
            <FontAwesomeIcon icon={faRotateRight} className="icon-left"/>Reload
          </Button>
        </Col>
      </Row>

      {/* Row for the Total, Incomes, and Expenses */}
      <Row className="mb-3">
      <Col md={12}>
      <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state: transparent and slightly down
      animate={{ opacity: 1, y: 0 }} // Animate to: fully opaque and original position
      transition={{ duration: 0.5 }} // Animation duration: 0.5 seconds
      >
      <InfoCard 
        title="Total" 
        value={`$${total}`} 
        linkText="View details" 
        linkTo="/dashboard"
      />
      </motion.div>
      </Col>
    </Row>

      
    <Row>
  <Col md={6}>
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start from slightly below and transparent
      animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
      transition={{ duration: 0.5, delay: 0.2 }} // Delay the animation of the first card
    >
      <InfoCard
        title="Incomes"
        value={`$${totalIncomes}`}
        linkText="Add or manage your Income"
        linkTo="/incomes"
      />
    </motion.div>
  </Col>
  <Col md={6}>
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start from slightly below and transparent
      animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
      transition={{ duration: 0.5, delay: 0.4 }} // Delay the animation of the second card a bit more
    >
      <InfoCard
        title="Expenses"
        value={`$${totalExpenses}`}
        linkText="Add or manage your expenses"
        linkTo="/expenses"
      />
    </motion.div>
  </Col>
</Row>


         {/* Section for news cards */}
         <div className="news-section">
            <h2 className="news-section-title">Latest News</h2>
            <div className="news-cards">
              {/* Custom content for each topic */}
              <Row>
  <Col md={4}>
    <NewsCard
      topic="personal-finance"
      image={`${process.env.PUBLIC_URL}/images/News/finance.jpg`}
      alt="personal finance"
      title="Unlocking Financial Freedom: Your Guide to Smart Money Moves"
      description="Discover the secrets to financial success! From savvy investing strategies to practical budgeting tips, empower yourself to achieve your financial dreams and live life on your terms."
      className="news-card" // Add custom class
    />
  </Col>
  <Col md={4}>
    <NewsCard
      topic="freelancing"
      image={`${process.env.PUBLIC_URL}/images/News/freelancing.jpg`}
      alt="freelancing"
      title="Thriving in the Gig Economy: Insider Tips for Freelancers"
      description="Join the booming world of freelancing! Get insider insights, expert advice, and actionable tips to excel in the gig economy. From finding lucrative gigs to mastering time management, embark on your journey to freelancing success."
      className="news-card" // Add custom class
    />
  </Col>
  <Col md={4}>
    <NewsCard
      topic="budgeting"
      image={`${process.env.PUBLIC_URL}/images/News/budgeting.jpg`}
      alt="budgeting"
      title="Mastering Your Money: The Art of Stress-Free Budgeting"
      description="Take control of your finances and transform your life! Learn the art of stress-free budgeting, streamline your expenses, and achieve financial peace of mind. Say goodbye to money worries and hello to a brighter financial future!"
      className="news-card" // Add custom class
    />
  </Col>
</Row>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
