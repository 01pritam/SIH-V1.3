const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Adjust the path to your User model

// Route to handle user registration
router.post(
  '/',
  [
    // Validation using express-validator
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
      return value === req.body.password;
    }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("after this")
    console.log(req.body)

    const { name, email, password } = req.body;

    try {
      // Check if user with the same email already exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create a new user instance
      user = new User({
        name,
        email,
        password,
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Create and send a JWT token for authentication
    //   const payload = {
    //     user: {
    //       id: user.id,
    //     },
    //   };

      jwt.sign({ userId: user._id }, '1234', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
            success: true,
            message: 'Registration unsuccessful', // Add the success message here
            user: user,
            token: token
          });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
