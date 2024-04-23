const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/nasa_backend', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the schema for user registration
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
});

const Review = mongoose.model('Review', reviewSchema);



// Create a mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use(express.static(path.join(__dirname)));


// Route to serve the login page
// Serve the login page as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve the registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Serve the index page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});



// Route to handle registration form submission
// Route to handle login form submission
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the username exists
        const user = await User.findOne({ username });
        if (user) {
            // Check if the password matches
            if (user.password === password) {
                // Authentication successful
                res.redirect('/dashboard');
            } else {
                // Password incorrect
                res.status(401).send('Incorrect password');
            }
        } else {
            // User not found
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route to handle login form submission
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }
        // Create a new user
        await User.create({ username, password });
        res.redirect('/'); // Redirect to the login page
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/contact-us-page', async (req, res) => {
    const { name, phone, message } = req.body;
    try {
        // Create a new review
        await Review.create({ name, phone, message });
        res.status(200).send('Review submitted successfully!');
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).send('Internal Server Error');
    }
});




// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
