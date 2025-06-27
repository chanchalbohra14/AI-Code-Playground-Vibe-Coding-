import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // We'll create this CSS file next

// Placeholder images (adjust paths if you structure images differently)
// For Vite, importing images is a common way to include them in the build
// or place them in the `public` folder and reference them directly.
// For simplicity with current backend data, let's assume image filenames are used
// and we'll construct paths or import them as needed in EventCard.

const HomePage = () => {
  // In a real app, featured events would be fetched from the API
  const featuredEvents = [
    // Example structure, actual data will come from API
    // { id: 1, name: "Summer Music Festival", image_filename: "summer_fest.jpg", date: "2024-08-15", location: "Green Valley Park" },
    // { id: 2, name: "Village Fair & Market", image_filename: "village_fair.jpg", date: "2024-09-05", location: "Town Square" }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Village Vacation!</h1>
        <p>Your ultimate destination for memorable local events and experiences.</p>
        <Link to="/events" className="cta-button">Explore Events</Link>
      </section>

      <section className="upcoming-events-preview">
        <h2>Upcoming Events Highlights</h2>
        {/*
          This section will be populated later when API connection is made.
          For now, it's a placeholder. We might show a couple of event cards here.
          If you want to show static placeholders:
        */}
        {featuredEvents.length > 0 ? (
          <div className="event-grid-preview">
            {/* Map through featuredEvents to display them */}
            <p>Featured events will be shown here once API is connected.</p>
          </div>
        ) : (
          <p>Check out all our <Link to="/events">events</Link>!</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
