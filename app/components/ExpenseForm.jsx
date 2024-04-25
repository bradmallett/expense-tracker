'use client';
import { useState } from "react";
import { addExpenseItem } from "../services/expenseService";

const ExpenseForm = () => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [selectedCategory, setselectedCategory] = useState('Fundamental');

    const handleExpenseAmountChange = (e) => {
        const inputAmount = e.target.value;
        // Validate input - only digits and only 2 dec points
        if (/^\d*\.?\d{0,2}$/.test(inputAmount)) {
            setExpenseAmount(inputAmount);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!expenseName || !expenseAmount) return;

        addExpenseItem({expenseName, expenseAmount, selectedCategory})
    }
 

  return (
    <>
    <h3>Expense Form</h3>

    <form onSubmit={handleSubmit}>
        <label htmlFor="expenseName">Expense Name</label>
        <br/>
        <input 
            type="text" 
            id="expenseName" 
            value={expenseName} 
            onChange={(e) => setExpenseName(e.target.value)}
        />
        <br/>
        <br/>

        <label htmlFor="expenseAmount">Expense Amount</label>
        <br/>
        <input 
            type="text" 
            id="expenseAmount"
            placeholder="00.00"
            value={expenseAmount} 
            onChange={handleExpenseAmountChange}
        />
        <br/>
        <br/>

        <label htmlFor="expenseCategory">Expense Category</label>
        <br/>
        <select 
            value={selectedCategory}
            onChange={e => setselectedCategory(e.target.value)}
        >
            <option value="Fundamental">Fundamental</option>
            <option value="Fun">Fun</option>
            <option value="Future">Future</option>
        </select>
        <br/>
        <br/>

        <button type='submit'>
            Submit
        </button>

    </form>

    </>
  )
}

export default ExpenseForm