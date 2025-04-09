import express, { Router } from 'express'

import urlControllers from "../controllers/url.js"
const {handleLogin, getAllUrls, generateShortCode, handleRedirect, serverTesting, getAllClicks} = urlControllers;

const router = express.Router();

router.get('/', serverTesting)
router.post('/api/auth/login', handleLogin)
router.get("/api/url/all", getAllUrls)
router.post('/api/url/create', generateShortCode)
router.get('/api/clicks', getAllClicks)

// router.get('/:shortID', handleRedirect)



export default router;
