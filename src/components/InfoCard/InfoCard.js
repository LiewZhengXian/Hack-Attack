// InfoCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './InfoCard.css' // Import the arrow-right icon

function InfoCard({ title, value, linkText, linkTo }) {
  return (
    <Card className="left-center info-card">
      <Card.Body>
        <Card.Title className="info-card-title">{title}</Card.Title>
        <Card.Text className="info-card-value">{value}</Card.Text>
        {linkText && linkTo && ( // Render the link if both linkText and linkTo are provided
          <Card.Link as={Link} to={linkTo}>
            {linkText}
            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
