## Village Vacation Event Management Website

This project is an event management website with a Flask backend API and a React (Vite) frontend.

**Project Structure:**

*   **Backend (Flask API - Root Directory):**
    *   `app.py`: Main Flask application file. Contains API routes and booking logic.
    *   `requirements.txt`: Python dependencies for the backend.
    *   `static/`: May contain backend-specific static files if any (currently empty or minimal).
    *   `templates/`: May contain backend-specific templates if any (e.g., for admin panel - currently empty).

*   **Frontend (React/Vite - `frontend/` directory):**
    *   `frontend/public/`: Static assets for the React app (images, etc.).
        *   `frontend/public/images/`: Event images are stored here.
    *   `frontend/src/`: React application source code.
        *   `frontend/src/main.jsx`: Entry point for the React app, sets up BrowserRouter.
        *   `frontend/src/App.jsx`: Main app component, defines routes.
        *   `frontend/src/layouts/`: Layout components (e.g., `Layout.jsx` for header/footer).
        *   `frontend/src/pages/`: Page components (e.g., `HomePage.jsx`, `EventsPage.jsx`).
        *   `frontend/src/components/`: Reusable UI components (e.g., `EventCard.jsx`).
        *   `frontend/src/assets/`: Other frontend assets (e.g., SVGs, though images are in `public/images`).
    *   `frontend/package.json`: Frontend dependencies and scripts.
    *   `frontend/vite.config.js`: Vite configuration.
    *   `frontend/index.html`: Main HTML file for the React SPA.

**Running the Application:**

1.  **Backend (Flask API):**
    *   Open a terminal in the project root directory.
    *   Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    *   Run the Flask API server:
        ```bash
        python app.py
        ```
    *   The API will typically be available at `http://127.0.0.1:5000`.

2.  **Frontend (React/Vite):**
    *   Open a separate terminal.
    *   Navigate to the `frontend` directory:
        ```bash
        cd frontend
        ```
    *   Install Node.js dependencies:
        ```bash
        npm install
        ```
    *   Run the Vite development server:
        ```bash
        npm run dev
        ```
    *   The React app will typically be available at `http://localhost:5173` (or another port shown in the terminal). Access this URL in your browser.

**Development Guidelines:**

*   **Backend API (`app.py`):**
    *   All data interaction and business logic (like booking processing, email sending) should be handled here.
    *   Endpoints should expect and return JSON.
    *   Ensure CORS is configured correctly if frontend/backend origins differ.
*   **Frontend (React - `frontend/` dir):**
    *   Focus on UI/UX, client-side routing, and API interactions.
    *   Use `axios` for API calls to the Flask backend.
    *   Store images intended for direct public access (like event pictures) in `frontend/public/images/` and reference them as `/images/filename.jpg`.
    *   Reusable components go into `frontend/src/components/`.
    *   Page-level components go into `frontend/src/pages/`.
*   Event data is currently hardcoded in `app.py`. This will be replaced with a database later.
*   Email functionality is planned but not yet implemented in the backend.

**Agent Instructions:**

*   When adding new features, update this `AGENTS.md` if the structure or running instructions change.
*   Follow the existing code style and structure for both backend and frontend.
*   Before submitting, ensure both the backend API and frontend application run without errors and can communicate.
*   If database changes are made to the backend, provide clear migration steps or an updated schema description.
*   When implementing email sending (in `app.py`), ensure to use placeholder/configurable credentials and not hardcode sensitive information.
*   All new React components should be created in the appropriate `frontend/src/` subdirectory.
*   Ensure client-side routing is handled by `react-router-dom` in `frontend/src/App.jsx`.
*   CSS should be modular (component-specific) or global (`index.css`) as appropriate.
*   API endpoint for Flask is `http://localhost:5000/api`. This is used in React components.
