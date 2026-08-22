const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { generateTokens, JWT_REFRESH_SECRET } = require('../middleware/auth');

exports.register = async (req, res, next) => {
  try {
    const { name, password, phone, city, state, gender, age } = req.body;
    const email = req.body.email ? req.body.email.trim().toLowerCase() : '';

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password_hash,
      phone,
      city,
      state,
      gender,
      age: age ? parseInt(age, 10) : null
    });

    const tokens = generateTokens(newUser);

    const userObj = newUser.toJSON();
    delete userObj.password_hash;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userObj,
        ...tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { password } = req.body;
    const email = req.body.email ? req.body.email.trim().toLowerCase() : '';

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    if (!user.password_hash) {
      return res.status(401).json({
        success: false,
        error: 'This account uses Google OAuth login. Please log in with Google.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      });
    }

    const tokens = generateTokens(user);
    const userObj = user.toJSON();
    delete userObj.password_hash;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userObj,
        ...tokens
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required.'
      });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found.'
      });
    }

    const tokens = generateTokens(user);
    res.json({
      success: true,
      data: tokens
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired refresh token.'
    });
  }
};

exports.getMe = async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};
