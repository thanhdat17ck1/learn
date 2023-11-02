const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem username đã tồn tại hay chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username đã được sử dụng.' });
    }

    // Tạo người dùng mới
    const newUser = new User({ username, password });
    await newUser.save();

    // Tạo token cho người dùng mới đăng ký (bearer token)
    const accessToken = jwt.sign({ username: newUser.username, id: newUser._id }, 'your_secret_key', { expiresIn: '15m' });

    res.status(201).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Kiểm tra xem username có tồn tại không
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng.' });
      }
  
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng.' });
      }
  
      // Tạo access token cho người dùng đăng nhập (bearer token)
      const accessToken = jwt.sign({ username: user.username, id: user._id }, 'your_secret_key', { expiresIn: '15m' });
  
      // Tạo refresh token cho người dùng đăng nhập (với thời hạn 1 phút)
      const refreshToken = jwt.sign({ username: user.username, id: user._id }, 'your_refresh_secret_key', { expiresIn: '15m' });
  
      res.json({ accessToken, refreshToken });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
