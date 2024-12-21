from app import create_app

# Entry point for the Flask app
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
