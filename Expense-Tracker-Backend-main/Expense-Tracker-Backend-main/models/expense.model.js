import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title cannot be Empty"],
    },

    amount: {
      type: Number, // Changed the type to Number
      required: [true, "Amount cannot be Empty"],
    },

    date : {
      type: String,
      required: [true, "Date cannot be Empty"],
    },

    category: {
      type: String,
      required: [true, "Category cannot be Empty"],
    },

  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("Expense", ExpenseSchema);