const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure the path is correct

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipCode,
    } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipCode,
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);

    if (err.name === 'ValidationError') {
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Return basic user info
    const { _id, firstName, lastName, email: userEmail } = user;
    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: _id,
        firstName,
        lastName,
        email: userEmail,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;
