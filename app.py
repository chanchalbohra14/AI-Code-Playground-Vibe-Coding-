from flask import Flask, jsonify, request
from flask_cors import CORS # Import CORS
import datetime

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Placeholder for event data (same as before)
events_data = [
    {
        "id": 1,
        "name": "Summer Music Festival",
        "date": "2024-08-15",
        "location": "Green Valley Park",
        "description": "Join us for a day of live music, food trucks, and fun activities.",
        "price": 25.00,
        "image_filename": "summer_fest.jpg" # filename for React to use
    },
    {
        "id": 2,
        "name": "Village Fair & Market",
        "date": "2024-09-05",
        "location": "Town Square",
        "description": "Explore local crafts, fresh produce, and enjoy community games.",
        "price": 0.00,
        "image_filename": "village_fair.jpg"
    },
    {
        "id": 3,
        "name": "Mountain Hike Adventure",
        "date": "2024-09-20",
        "location": "Eagle Peak Trail",
        "description": "Guided hike through scenic mountain trails. Suitable for all skill levels.",
        "price": 15.00,
        "image_filename": "mountain_hike.jpg"
    }
]
# In a real app, image URLs might be full paths or served differently.
# For now, React will look for these in its public/images or src/assets/images folder.

@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events_data)

@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event_detail(event_id):
    event = next((event for event in events_data if event["id"] == event_id), None)
    if event:
        return jsonify(event)
    return jsonify({"error": "Event not found"}), 404

@app.route('/api/book/<int:event_id>', methods=['POST'])
def book_event_api(event_id):
    event = next((event for event in events_data if event["id"] == event_id), None)
    if not event:
        return jsonify({"error": "Event not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400

    customer_name = data.get('name')
    customer_email = data.get('email')
    num_tickets = data.get('tickets')

    if not all([customer_name, customer_email, num_tickets]):
        return jsonify({"error": "Missing data fields"}), 400

    # Placeholder for booking logic & email sending
    print(f"API Booking Received for {event['name']}:")
    print(f"  Name: {customer_name}")
    print(f"  Email: {customer_email}")
    print(f"  Tickets: {num_tickets}")

    # ** FUTURE EMAIL IMPLEMENTATION POINT **
    # TODO: Implement email sending logic here.
    # 1. Customer Confirmation Email:
    #    - To: customer_email
    #    - Subject: Your booking for {event['name']} is confirmed!
    #    - Body: Details of the booking (event name, date, tickets, price, etc.)
    # 2. Owner/Admin Notification Email:
    #    - To: admin_email (configurable)
    #    - Subject: New booking for {event['name']} by {customer_name}
    #    - Body: Details of the booking.

    # Considerations for email implementation:
    # - Use a library like `smtplib` for basic SMTP, or a service like SendGrid/Mailgun for reliability.
    # - Email sending should ideally be asynchronous (e.g., using Celery or Flask-Executor)
    #   to avoid blocking the API response.
    # - Securely manage email credentials (e.g., via environment variables, not hardcoded).
    # - Create email templates (HTML or plain text).
    # - Implement error handling for email sending failures.

    # For now, the print statements serve as a placeholder for this action.
    # In a real app, actual database saving would also occur here before sending emails.

    return jsonify({
        "message": "Booking received successfully!",
        "event_name": event['name'],
        "customer_name": customer_name,
        "customer_email": customer_email,
        "num_tickets": num_tickets
    }), 200

# Removed the old HTML rendering routes and context processor for 'now'
# as they are not needed for an API.

if __name__ == '__main__':
    app.run(debug=True)
