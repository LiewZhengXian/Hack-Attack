import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // For integrating with react-router
import './BreadcrumbAndProfile.css'; // Import CSS file for styles

function BreadcrumbAndProfile({ username, role, breadcrumbItems, pageTitle }) {
  let welcomeMessage = `Welcome, ${username}`;
  let financialStatusSummary = "Here's a summary of your financial status.";

  if (pageTitle === 'Incomes') {
    welcomeMessage = `${username}, here are your incomes...`;
  } else if (pageTitle === 'Expenses') {
    welcomeMessage = `${username}, here are your expenses...`;
  } else if (pageTitle === 'Dashboard') {
    welcomeMessage = `Welcome back, ${username}`;
    financialStatusSummary = "Here's a summary of your overall financial status.";
  }

  return (
    <>
      <Breadcrumb className="custom-breadcrumb"> {/* Add custom class */}
        {breadcrumbItems.map((item, index) => (
          <LinkContainer key={index} to={item.path} active={item.active}>
            <Breadcrumb.Item active={item.active}>{item.name}</Breadcrumb.Item>
          </LinkContainer>
        ))}
      </Breadcrumb>
      {/* Add the line at the bottom */}
      <div className="user-info d-flex justify-content-between align-items-center">
        <h1>{pageTitle}</h1>
        <div className="profile">
        <img src={`${process.env.PUBLIC_URL}/images/User/User.png`} alt={username} className="user-image" />
          <div>
            <strong>{username}</strong><br />
            {role}
          </div>
        </div>
      </div>
      <div>
        <h3>{welcomeMessage}</h3>
        <p>{financialStatusSummary}</p>
      </div>
    </>
  );
}

export default BreadcrumbAndProfile;
