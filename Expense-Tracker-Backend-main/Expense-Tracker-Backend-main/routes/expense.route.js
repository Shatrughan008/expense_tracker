import express from 'express';
import jwt from 'jsonwebtoken';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../controllers/expense.controller.js';

const expenseRouter = express.Router();

const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // If the token is valid, extract user ID from the payload and attach it to the request object
        req.userId = decoded.user;
        next();
    });
};

expenseRouter.use(authMiddleware);

expenseRouter.get('/expense', getExpenses);
expenseRouter.post('/expense', addExpense);
expenseRouter.put('/expense', updateExpense);
expenseRouter.delete('/expense', deleteExpense);

export default expenseRouter;