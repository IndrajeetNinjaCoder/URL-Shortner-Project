import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import useragent from "express-useragent";
import { nanoid } from "nanoid";

import URL from "../models/Url.js"
import User from "../models/User.js"
import Click from "../models/Click.js";



// JWT Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

const serverTesting = async (req, res) => {
    res.send("Server running successfully")
}

// Auth Route
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
};

const getAllUrls = async (req, res) => {
  const urls = await URL.find();
  res.send(urls);
};

// fetching all the clicks
export const getAllClicks = async (req, res) => {
  try {
    const clicks = await Click.find().sort({ timestamp: -1 }); // newest first
    res.status(200).json(clicks);
  } catch (error) {
    console.error("Error fetching clicks:", error);
    res.status(500).json({ message: "Failed to fetch click data" });
  }
};

// Create Short URL
const generateShortCode = async (req, res) => {
  const { url, alias, expirationDate } = req.body;

  const id = alias || nanoid(6);
  if (!url) return res.status(400).json({ error: "URL is required!" });

  await URL.create({
    shortID: id,
    redirectURL: url,
    alias: alias || undefined,
    expirationDate: expirationDate || undefined,
  });

  return res.json({ id: id });
};

// Redirect + Log Click
const handleRedirect = async (req, res) => {
  const url = await URL.findOne({ shortID: req.params.shortID });

  if (!url) {
    return res.status(404).json({ msg: "Link not found" });
  }

  const expirationDate = url.expirationDate;

  if (expirationDate && expirationDate < Date.now()) {
    return res.status(404).json({ msg: "Link expired" });
  }

  setImmediate(async () => {
    await Click.create({
      urlId: url._id,
      timestamp: new Date(),
      ip: req.ip,
      deviceType: req.useragent?.platform || "Unknown",
      browser: req.useragent?.browser || "Unknown",
    });
  });

  res.redirect(url.redirectURL);
};



export default { getAllClicks, handleLogin, getAllUrls, generateShortCode, handleRedirect, serverTesting };
