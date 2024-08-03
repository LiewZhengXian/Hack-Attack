// NewsCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import './NewsCard.css'; // Import the CSS file

function NewsCard({ topic, image, title, description }) {
  return (
    <Card className="card-container"> {/* Apply card-container class */}
      <Card.Img variant="top" src={image} className="card-image" />
      <Card.Body>
        <h2 className="title-news">{title}</h2>
        <Card.Text className="description-news">{description}</Card.Text>
        <Card.Link href={`/${topic}`} className="dark-link">Learn More</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
