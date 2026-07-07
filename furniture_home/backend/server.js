require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Signup Route
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists.' });
    }

    const newUser = new User({ fullName, email, phone, password });
    await newUser.save();

    // For simplicity we just return the user object (in a real app, hash password and return JWT)
    res.status(201).json({ id: newUser._id, fullName: newUser.fullName, email: newUser.email, phone: newUser.phone });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
      password: password
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ id: user._id, fullName: user.fullName, email: user.email, phone: user.phone });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
