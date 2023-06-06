const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function routes(app) {
   router.post('/v1/signup', async (req, res) => {
      try {
         const { email, password } = req.body;
         // Check if user already exists
         const existingUser = await User.findOne({ email });
         if (existingUser) {
            return res
               .status(409)
               .send({ message: 'User email already in use' });
         }

         // Generate random salt value
         const salt = await bcrypt.genSalt(10);

         // Hash password before storing in database
         const hashedPassword = await bcrypt.hash(password, salt);

         // Create new user document
         const newUser = new User({
            email,
            password: hashedPassword
         });

         // Save new user to database
         await newUser.save();

         // Create JWT token with email and admin status
         const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
         );

         // Return token in response
         return res
            .status(201)
            .send({ message: 'Registration successful', token });
      } catch (error) {
         console.error(error);
         return res
            .status(500)
            .send({ message: 'Registration failed, Try again' });
      }
   });

   // Login
   router.post('/v1/signin', async (req, res) => {
      try {
         const { email, password } = req.body;

         // Check if user exists
         const user = await User.findOne({ email: email });
         console.log(user);
         if (!user) {
            return res
               .status(401)
               .send({ message: 'Invalid email or password' });
         }

         // Check if password is correct
         const passwordMatch = await bcrypt.compare(password, user.password);
         if (!passwordMatch) {
            return res.status(401).send({ message: 'Wrong password' });
         }

         // Generate JWT token
         const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
         );

         // Send back user info without password
         const userInfo = { ...user.toObject() };
         delete userInfo.password;

         return res.status(200).send({ token, ...userInfo });
      } catch (error) {
         console.error(error);
         return res.status(500).send({ message: 'Error logging in' });
      }
   });

   router.get('/v1/matches', (req, res) => {
      res.send('Live matches');
   });

   return router;
}

module.exports = routes;
