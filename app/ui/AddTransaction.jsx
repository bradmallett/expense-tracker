'use client';

import { useRef } from "react";
import { addTransaction } from "../lib/actions/addTransaction";
import AddSpendingTagsForm from "./AddSpendingTagsForm";


export default function AddTransaction({ monthID, spendingTagNames }) {
    const selectedSpendingTags = useRef([]);

    function addSpendingTagsToTransaction(transactionTags) {
        selectedSpendingTags.current = [...selectedSpendingTags.current, ...transactionTags]
    }

    const addTransactionWithID = addTransaction.bind(null, { monthID, selectedSpendingTags});

    return (
        <div className="add-transaction-form">
            <form action={addTransactionWithID}>
            <h1>CREATE A TRANSACTION</h1>
                <div className="input-contain">
                    <label htmlFor="date">Select a Date: </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                    />
                </div>

                <div className="input-contain">
                    <label htmlFor="transactionType">TRANSACTION TYPE:</label>
                    <select name="transactionType" id="transactionType" required>
                        <option value="expense">expense</option>
                        <option value="income">income</option>
                        <option value="savings">savings</option>
                    </select>
                </div>

                <div className="input-contain">
                    <label htmlFor="description">DESCRIPTION: </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        placeholder="ADD A DESCRIPTION"
                        required
                    />
                </div>

                <div className="input-contain">
                    <label htmlFor="amount">AMOUNT: </label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        required
                    />
                </div>

                <div className="input-contain">
                    <label htmlFor="budgetCategory">BUDGET CATEGORY: </label>
                    <select 
                        name="budgetCategory"
                        id="budgetCategory"
                    >
                        <option value="">(none)</option>
                        <option value="fundamental">fundamental</option>
                        <option value="fun">fun</option>
                        <option value="future">future</option>
                    </select>
                </div>
                <button type="submit">CREATE TRANSACTION</button>
            </form>

            <AddSpendingTagsForm 
                spendingTagNames={spendingTagNames}
                addSpendingTagsToTransaction={addSpendingTagsToTransaction}
            />
        </div>
      );
};



