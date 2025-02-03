'use client';

import { EditTransaction } from "./buttons";


export default function EditTransactionForm({ transaction }) {

    const editTransactionWithID = EditTransaction.bind(null, transaction.id);


    return (
        <div>
            <p>{transaction.description}</p>
            <p>{new Date(transaction.date).toDateString()}</p>

            <form action={editTransactionWithID} className="add-transaction-form">
            <h1>EDIT TRANSACTION</h1>

                <div className="input-contain">
                    <label htmlFor="transactionType">TRANSACTION TYPE:</label>
                    <select 
                        name="transactionType" 
                        id="transactionType" 
                        defaultValue={transaction.type}
                        required
                    >
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
                        defaultValue={transaction.budget_category}
                        >
                            <option value="">(none)</option>
                            <option value="fundamental">fundamental</option>
                            <option value="fun">fun</option>
                            <option value="future">future</option>
                    </select>
                </div>

                <button type="submit">CREATE TRANSACTION</button>
            </form>
        </div>
      );
};



