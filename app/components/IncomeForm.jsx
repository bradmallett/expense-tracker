'use client';
import { useState } from "react";
import { addIncomeItem } from "../services/transactionsService";

const IncomeForm = () => {
    const [yearMonth, setYearMonth] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [incomeName, setIncomeName] = useState('');

    const handleAmountChange = (e) => {
        const inputAmount = e.target.value;
        // Validate input - only digits and only 2 dec points
        if (/^\d*\.?\d{0,2}$/.test(inputAmount)) {
            setAmount(inputAmount);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!yearMonth || !incomeName || !amount || !date) return;
        const dateObj = new Date(date);
        const isoString = dateObj.toISOString();
        const amountValue = parseFloat(amount);

        addIncomeItem({yearMonth, amountValue, isoString, incomeName});
        setYearMonth('');
        setAmount('');
        setDate('');
        setIncomeName('');
    };
 

  return (
    <>
    <h3>Income Form</h3>

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

        <label htmlFor="incomeAmount">Income Amount</label>
        <br/>
        <input 
            type="text" 
            id="incomeAmount"
            placeholder="00.00"
            value={amount}
            onChange={handleAmountChange}
        />
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

        <label htmlFor="incomeName">Income Name</label>
        <br/>
        <input 
            type="text" 
            id="incomeName" 
            value={incomeName} 
            onChange={(e) => setIncomeName(e.target.value)}
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

export default IncomeForm;


