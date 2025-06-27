import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EventDetailPage.css'; // We'll create this

const API_URL = 'http://localhost:5000/api'; // Assuming Flask runs on port 5000

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching event ${eventId}:`, err);
        if (err.response && err.response.status === 404) {
          setError("Event not found.");
        } else {
          setError("Failed to load event details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  if (loading) return <p className="loading-message">Loading event details...</p>;
  if (error) return <p className="error-message">{error} <Link to="/events">Back to events</Link></p>;
  if (!event) return <p className="error-message">Event data is not available. <Link to="/events">Back to events</Link></p>;

  const imageUrl = event.image_filename
    ? `/images/${event.image_filename}`
    : `/images/placeholder.jpg`;

  return (
    <div className="event-detail-page">
      <div className="event-header">
        <img src={imageUrl} alt={event.name} className="event-image-large" />
        <h1>{event.name}</h1>
      </div>

      <div className="event-info-body">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong>
          {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
        </p>

        <div className="event-description">
          <h2>About this Event</h2>
          <p>{event.description}</p>
        </div>

        <Link to={`/book/${event.id}`} className="cta-button book-now-button">Book Now</Link>
      </div>
      <Link to="/events" className="back-link">Back to All Events</Link>
    </div>
  );
};

export default EventDetailPage;
