import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './BookingPage.css'; // We'll create this

const API_URL = 'http://localhost:5000/api';

const BookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tickets: 1,
  });
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setIsLoadingEvent(true);
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching event ${eventId} for booking:`, err);
        if (err.response && err.response.status === 404) {
          setError("Event not found. Cannot proceed with booking.");
        } else {
          setError("Failed to load event details. Please try again later.");
        }
      } finally {
        setIsLoadingEvent(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event) {
      setError("Event details not loaded, cannot submit booking.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setBookingSuccess(null);

    try {
      const response = await axios.post(`${API_URL}/book/${eventId}`, formData);
      setBookingSuccess(`Booking successful for ${response.data.event_name}! Confirmation for ${response.data.customer_name} (Tickets: ${response.data.num_tickets}). Email will be sent to ${response.data.customer_email} (placeholder).`);
      // Optionally redirect after a delay or provide a link
      // navigate(`/events/${eventId}`); // or to a dedicated success page
    } catch (err) {
      console.error("Booking submission error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Booking failed: ${err.response.data.error}`);
      } else {
        setError("Booking failed. An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingEvent) return <p className="loading-message">Loading event details for booking...</p>;
  // If event loading failed critically, show error and no form.
  if (!event && error) return <p className="error-message">{error} <Link to="/events">Back to events</Link></p>;
  // If event is null but no error yet (should not happen if loading is false)
  if (!event) return <p className="error-message">Event details could not be loaded. <Link to="/events">Back to events</Link></p>;


  return (
    <div className="booking-page">
      <h1>Book Your Spot: {event.name}</h1>

      {bookingSuccess && <div className="success-message">{bookingSuccess} <Link to={`/events/${eventId}`}>View event</Link> or <Link to="/events">see all events</Link>.</div>}
      {error && !bookingSuccess && <div className="error-message">{error}</div>}

      {!bookingSuccess && (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="event-summary-booking">
            <h3>Event Summary</h3>
            <p><strong>Event:</strong> {event.name}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price per ticket:</strong>
              {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tickets">Number of Tickets:</label>
            <input
              type="number"
              id="tickets"
              name="tickets"
              min="1"
              value={formData.tickets}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="cta-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      )}

      <Link to={`/events/${eventId}`} className="back-link">Cancel and go back to event details</Link>
    </div>
  );
};

export default BookingPage;
