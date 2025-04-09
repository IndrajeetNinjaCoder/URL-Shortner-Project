// backend/server.js
/*
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import useragent from 'express-useragent';
import { nanoid } from 'nanoid';
import User from './models/User.js';
import URL from './models/URL.js';
import Click from './models/Click.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(useragent.express());

// JWT Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

// Auth Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User not found' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Create Short URL
app.post('/api/url/create', authMiddleware, async (req, res) => {
  const { originalUrl, customAlias, expirationDate } = req.body;
  const shortCode = customAlias || nanoid(6);
  const newUrl = new URL({
    userId: req.userId,
    originalUrl,
    shortCode,
    createdAt: new Date(),
    expirationDate: expirationDate ? new Date(expirationDate) : null,
  });
  await newUrl.save();
  res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
});

// Redirect + Log Click
app.get('/:code', async (req, res) => {
  const url = await URL.findOne({ shortCode: req.params.code });
  if (!url || (url.expirationDate && new Date() > url.expirationDate)) {
    return res.status(404).json({ msg: 'Link expired or not found' });
  }

  setImmediate(async () => {
    await Click.create({
      urlId: url._id,
      timestamp: new Date(),
      ip: req.ip,
      deviceType: req.useragent.platform,
      browser: req.useragent.browser,
    });
  });

  res.redirect(url.originalUrl);
});


// Add hardcoded user (run once or during DB init)
(async () => {
  const existing = await User.findOne({ email: 'intern@dacoid.com' });
  if (!existing) {
    const hashedPassword = await bcrypt.hash('Test123', 10);
    await User.create({ email: 'intern@dacoid.com', password: hashedPassword });
  }
})();

// Start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.error(err));

  */