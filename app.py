from flask import Flask, render_template, request, url_for # Added url_for
import datetime # For footer year

app = Flask(__name__)

# Placeholder for event data
events_data = [
    {
        "id": 1,
        "name": "Summer Music Festival",
        "date": "2024-08-15",
        "location": "Green Valley Park",
        "description": "Join us for a day of live music, food trucks, and fun activities.",
        "price": 25.00,
        "image": "summer_fest.jpg" # Assuming image is in static/images/
    },
    {
        "id": 2,
        "name": "Village Fair & Market",
        "date": "2024-09-05",
        "location": "Town Square",
        "description": "Explore local crafts, fresh produce, and enjoy community games.",
        "price": 0.00,
        "image": "village_fair.jpg" # Assuming image is in static/images/
    },
    {
        "id": 3,
        "name": "Mountain Hike Adventure",
        "date": "2024-09-20",
        "location": "Eagle Peak Trail",
        "description": "Guided hike through scenic mountain trails. Suitable for all skill levels.",
        "price": 15.00,
        "image": "mountain_hike.jpg" # Assuming image is in static/images/
    }
]

# Context processor to make 'now' available in all templates for the year in footer
@app.context_processor
def inject_now():
    return {'now': datetime.datetime.utcnow()}

@app.route('/')
def index():
    # Show first 2 events on homepage as upcoming
    return render_template('index.html', upcoming_events=events_data[:2])

@app.route('/events')
def events():
    return render_template('events.html', all_events=events_data)

@app.route('/event/<int:event_id>')
def event_detail(event_id):
    event = next((event for event in events_data if event["id"] == event_id), None)
    if event:
        return render_template('event_detail.html', event=event)
    return "Event not found", 404

@app.route('/book/<int:event_id>', methods=['GET', 'POST'])
def book_event(event_id):
    event = next((event for event in events_data if event["id"] == event_id), None)
    if not event:
        return "Event not found", 404

    if request.method == 'POST':
        customer_name = request.form.get('name')
        customer_email = request.form.get('email')
        num_tickets = request.form.get('tickets')

        # Placeholder for booking logic & email sending
        print(f"Booking attempt for {event['name']} by {customer_name} ({customer_email}) for {num_tickets} ticket(s).")

        # For now, return a simple HTML response page
        # In a real app, you'd save to DB and send emails here.
        confirmation_html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation - Village Vacation</title>
            <link rel="stylesheet" href="{url_for('static', filename='css/style.css')}">
            <style>
                body {{ padding: 20px; text-align: center; }}
                .confirmation-box {{ max-width: 600px; margin: 30px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }}
                a {{ color: #0779e4; }}
            </style>
        </head>
        <body>
            <div class="confirmation-box">
                <h1>Booking Received!</h1>
                <p>Thank you, <strong>{customer_name}</strong>, for booking <strong>{num_tickets}</strong> ticket(s) for <strong>{event['name']}</strong>.</p>
                <p>A confirmation email will be sent to <strong>{customer_email}</strong> (this is a placeholder, no email is actually sent yet).</p>
                <br>
                <p><a href="{url_for('index')}">Back to Home</a></p>
                <p><a href="{url_for('event_detail', event_id=event_id)}">Back to Event Details</a></p>
            </div>
        </body>
        </html>
        """
        return confirmation_html

    return render_template('book_form.html', event=event)


if __name__ == '__main__':
    app.run(debug=True)
