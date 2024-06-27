'use client';
import { useState } from "react";
import { addExpenseItem } from "../services/transactionsService";

const ExpenseForm = () => {
    const [yearMonth, setYearMonth] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Fundamental');
    const [date, setDate] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [tag, setTag] = useState('');

    const handleAmountChange = (e) => {
        const inputAmount = e.target.value;
        // Validate input - only digits and only 2 dec points
        if (/^\d*\.?\d{0,2}$/.test(inputAmount)) {
            setAmount(inputAmount);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!yearMonth || !expenseName || !amount || !date) return;
        const dateObj = new Date(date);
        const isoString = dateObj.toISOString();
        const amountValue = parseFloat(amount);

        addExpenseItem({yearMonth, amountValue, category, isoString, expenseName, tag});
        setYearMonth('');
        setAmount('');
        setDate('');
        setExpenseName('');
        setTag('');
    };
 

  return (
    <>
    <h3>Expense Form</h3>

    <form onSubmit={handleSubmit}>
        <label htmlFor="yearMonth">Year Month</label>
        <br/>
        <input
            type="text" 
            id="yearMonth" 
            value={yearMonth}
            onChange={(e) => setYearMonth(e.target.value)}
        />
        <br/>
        <br/>

        <label htmlFor="expenseAmount">Expense Amount</label>
        <br/>
        <input 
            type="text" 
            id="expenseAmount"
            placeholder="00.00"
            value={amount}
            onChange={handleAmountChange}
        />
        <br/>
        <br/>

        <label htmlFor="expenseCategory">Expense Category</label>
        <br/>
        <select 
            value={category}
            onChange={e => setCategory(e.target.value)}
        >
            <option value="Fundamental">Fundamental</option>
            <option value="Fun">Fun</option>
            <option value="Future">Future</option>
        </select>
        <br/>
        <br/>

        <label htmlFor="date">Date</label>
        <br/>
        <input
            type="text" 
            id="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        <br/>
        <br/>        

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

        <label htmlFor="tag">Expense Tag</label>
        <br/>
        <input 
            type="text" 
            id="tag" 
            value={tag} 
            onChange={(e) => setTag(e.target.value)}
        />
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


