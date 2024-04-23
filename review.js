const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for the reviews
const reviewSchema = new mongoose.Schema({
    name: String,
    phone: String,
    message: String
});

// Create a model based on the schema
const Review = mongoose.model('Review', reviewSchema);

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static('projectBackEnd'));

// Handle form submission
app.post('/contact us', async (req, res) => {
    const { name, phone, message } = req.body;
    try {
        // Save the review to the database
        const review = await Review.create({ name, phone, message });
        console.log('Review submitted:', review);
        res.send('Review submitted successfully!');
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
