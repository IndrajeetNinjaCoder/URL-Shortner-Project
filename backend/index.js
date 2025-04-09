import express from 'express'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import useragent from 'express-useragent';
import connectDB from './connection.js';
import router from './routes/routes.js';
import cors from 'cors'

dotenv.config();


import User from './models/User.js';

const app = express();
const PORT = 8000;

// Middlewares

app.use(cors())
app.use(express.json());
app.use(useragent.express());

connectDB("mongodb+srv://Indrajeet:Indrajeet@crudapi.xhdof.mongodb.net/?retryWrites=true&w=majority&appName=CRUDAPI");



// Add hardcoded user (run once or during DB init)
(async () => {
  const existing = await User.findOne({ email: 'intern@dacoid.com' });
  if (!existing) {
    const hashedPassword = await bcrypt.hash('Test123', 10);
    await User.create({ email: 'intern@dacoid.com', password: hashedPassword });
  }
})();


app.use('/', router)


app.listen(PORT, () => {
    console.log("Server started at port 8000")
})

