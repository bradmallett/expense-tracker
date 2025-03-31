'use client';

import { editTransaction } from "../lib/actions/editTransaction";
import { useState, useEffect } from 'react';
import clsx from "clsx";
import { CurrencyInput } from 'react-currency-mask';
import { ChevronDownIcon} from '@heroicons/react/24/outline';
import SelectTransactionType from "./SelectTransactionType";




export default function EditTransactionForm({ transaction }) {
    const [transactionType, setTransactionType ]= useState('expense');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [showCatOptions, setShowCatOptions] = useState(false);
    const [selectedCat, setSelectedCat] = useState('fun');

    function updateTransactionType(updatedTransactionType) {
        setTransactionType(updatedTransactionType);
    }
    


    const IDandDate = {
        monthID: transaction.id,
        transactionDate: transaction.date,
        prevTransactionAmount: transaction.amount
    }

    // NOT GOING TO BIND ANYMORE
    // const editTransactionWithID = editTransaction.bind(null, IDandDate);

    return (
        <div>
            <p>EDITING {transactionType.toUpperCase()}: {transaction.description}</p>
            <p>{new Date(transaction.date).toDateString()}</p>

            <SelectTransactionType 
                transactionType={transactionType}  
                updateTransactionType={updateTransactionType}
            />

                <div className="input-contain">
                    <label htmlFor="description">DESCRIPTION: </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        defaultValue={transaction.description}
                        required
                    />
                </div>

                <div className="input-contain">
                    <label htmlFor="amount">AMOUNT: </label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        defaultValue={transaction.amount}
                        step="0.01"
                        required
                    />
                </div>

                <div className="input-contain">
                    <label htmlFor="budgetCategory">BUDGET CATEGORY: </label>
                    <select 
                        name="budgetCategory" 
                        id="budgetCategory"
                        defaultValue={transaction.budgetCategory}
                        >
                            <option value="">(none)</option>
                            <option value="fundamental">fundamental</option>
                            <option value="fun">fun</option>
                            <option value="future">future</option>
                    </select>
                </div>

                <button>EDIT TRANSACTION</button>
        </div>
      );
};



