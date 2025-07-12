import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import {customLogger} from "./logger.js";

import authRouter from "./routes/auth.route.js";
import expenseRouter from "./routes/expense.route.js";

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json()); // Middleware that parses the recieved request body into json.
app.use(cors()); 
app.use(customLogger()); // Custom logger middleware

// Attach the router to the app
app.use('/', router);
app.use("/api", authRouter);
app.use("/api", expenseRouter);

router.get('/', (req, res) => {
  res.status(200).send('API is running');
});

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }

  mongoose.connect(mongoUrl, {
    ssl: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection error:', err));

  console.log(`Server running on port ${PORT}`);
});