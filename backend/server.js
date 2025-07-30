
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const MONGO_URL = 'mongodb://mongo:27017';
const DB_NAME = 'busBookingDB';

let bookingsCollection;

MongoClient.connect(MONGO_URL)
  .then(client => {
    const db = client.db(DB_NAME);
    bookingsCollection = db.collection('bookings');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.get('/api/bookings', async (req, res) => {
  const bookings = await bookingsCollection.find().toArray();
  res.json(bookings);
});

app.post('/api/book', async (req, res) => {
  const booking = req.body;
  await bookingsCollection.insertOne(booking);
  res.status(201).json({ message: 'Booking stored in DB', booking });
});
