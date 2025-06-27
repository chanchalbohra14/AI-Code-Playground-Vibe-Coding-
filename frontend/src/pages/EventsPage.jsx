import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; // We'll create this component next
import './EventsPage.css';

const API_URL = 'http://localhost:5000/api'; // Assuming Flask runs on port 5000

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        // You could also check err.response.data for backend error messages
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="loading-message">Loading events...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!events.length) return <p>No events scheduled at the moment. Please check back later!</p>;

  return (
    <div className="events-page">
      <h1>All Events</h1>
      <p>Browse through our exciting range of events. Find something that excites you!</p>
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
