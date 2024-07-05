const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelBlog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Post model
const Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  location: String,
}));

// Sample posts data
const samplePosts = [
  {
    title: 'Trip to Paris',
    content: 'Had an amazing time visiting the Eiffel Tower and exploring the city.',
    image: 'paris.jpg',
    location: '48.8566,2.3522',
  },
  {
    title: 'Exploring New York',
    content: 'Visited Times Square, Central Park, and many other iconic places.',
    image: 'newyork.jpg',
    location: '40.7128,-74.0060',
  },
  {
    title: 'Adventure in Tokyo',
    content: 'Enjoyed the bustling city life and delicious sushi.',
    image: 'tokyo.jpg',
    location: '35.6895,139.6917',
  },
  {
    title: 'Relaxing in Bali',
    content: 'Spent a week in a beach resort enjoying the sun and sea.',
    image: 'bali.jpg',
    location: '-8.3405,115.0920',
  },
  {
    title: 'Safari in Kenya',
    content: 'Saw incredible wildlife and beautiful landscapes.',
    image: 'kenya.jpg',
    location: '-1.2921,36.8219',
  },
];

// Insert sample posts into the database
const seedDB = async () => {
  await Post.deleteMany({}); // Clear existing posts
  await Post.insertMany(samplePosts); // Insert sample posts
  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();

