import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css'; // We'll create this CSS file next

// Function to construct image path. Adjust if images are in `public`
// For Vite, when images are in `src/assets`, they need to be imported
// or handled by Vite's static asset handling.
// A simple way for now, assuming images are in `public/images` or Flask serves them from a known path.
// Let's refine this to use imports from `src/assets/images` for better bundling.

// Dynamically import images from src/assets/images
// This is a common Vite pattern.
const getImage = (imageFilename) => {
  if (!imageFilename) return new URL('../assets/images/placeholder.jpg', import.meta.url).href;
  try {
    // Note: Vite requires the path to be somewhat static for analysis.
    // This dynamic import pattern might need specific Vite configuration or
    // a more direct import map if it doesn't work out of the box for all images.
    // A simpler approach for now is to place images in the `public` folder
    // and reference them as `/images/filename.jpg`.
    // Let's switch to that for simplicity for now, and copy images to `public/images`.
    // This means the backend should provide just "summer_fest.jpg"
    // and we prepend "/images/"
    return `/images/${imageFilename}`;
  } catch (e) {
    console.warn(`Image not found: ${imageFilename}, using placeholder.`);
    return `/images/placeholder.jpg`; // Fallback if image in public/images is not found by name
  }
};


const EventCard = ({ event }) => {
  if (!event) return null;

  const imageUrl = event.image_filename
    ? `/images/${event.image_filename}`
    : `/images/placeholder.jpg`;

  return (
    <div className="event-card">
      <img src={imageUrl} alt={event.name || 'Event image'} />
      <h3>{event.name}</h3>
      <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
      <p className="event-location">{event.location}</p>
      <p className="event-price">
        {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
      </p>
      <Link to={`/events/${event.id}`} className="btn-details">View Details</Link>
    </div>
  );
};

export default EventCard;
