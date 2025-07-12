import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";

export const getExpenses = async (req, res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
       
        let myList = [];
        for(let i = 0; i<user.expense_list.length; i++){
            const myExpense = await Expense.findById(user.expense_list[i]);
            if(myExpense) {myList.push(myExpense); }
        }

        res.status(200).json({username: user.name, data_count: myList.length, data : myList});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

};

export const updateExpense = async (req, res) => {
    try {
        const {_id, title, amount, date, category} = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(
            _id, 
            { title, amount, date, category }, // Update these fields
            { new: true, runValidators: true } // Options: return the updated object and run schema validators
        );

        // Check if the Expense was found and updated
        if (!updatedExpense) {
            res.status(404).json({ message: "Error, Expense not found" });
        } else {
            res.status(200).json({ message: "Expense updated successfully", updatedExpense });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const deleteExpense = async(req, res) => {
    try{
        const { id } = req.query;

        console.log(id);

        if (!id) {
            res.status(400).json({ message: "Expense ID is required" });
        }
        else{
            const deletedExpense = await Expense.findByIdAndDelete(id);

            if (!deletedExpense) {
                res.status(404).json({ message: "Expense not found" });
            }
            else{
                res.status(200).json({ message: "Expense deleted successfully" });
            }   
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const addExpense = async(req, res) => {
    try{
        const userId = req.userId;
        const expense = await Expense.create(req.body);
        const expenseId = expense._id;

        await User.findByIdAndUpdate(
            userId,
            { $push: { expense_list: expenseId } },
            { new: true, useFindAndModify: false }
        );

        // Return a response
        res.status(200).json({message: 'Expense added successfully', data: expense});

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};