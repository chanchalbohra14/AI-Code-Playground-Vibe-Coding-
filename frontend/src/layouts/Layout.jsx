import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css'; // We'll create this CSS file next

const Layout = () => {
  return (
    <div className="layout">
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/" className="nav-logo">Village Vacation</Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            {/* Add more links as needed, e.g., Contact */}
          </ul>
        </nav>
      </header>
      <main className="app-main">
        <Outlet /> {/* This is where routed components will be rendered */}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Village Vacation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
