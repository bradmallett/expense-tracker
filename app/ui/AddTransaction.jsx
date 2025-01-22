import { addTransaction } from "../lib/actions";


export default async function AddTransaction() {

// TRANSACTIONS
// - ID
// - date DATE
// - month_id INTEGER
// - amount INTEGER
// - type VARCHAR(50)
// - description VARCHAR(255)
// - budget_category VARCHAR(20)

    return (
        <div>
            <form action={addTransaction} className="add-transaction-form">
            <h1>CREATE A TRANSACTION</h1>
                <div className="input-contain">
                    <label htmlFor="date">Select a date:</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                    />
                </div>

                <div className="input-contain">
                    <label htmlFor="transactionType">TRANSACTION TYPE:</label>
                    <select name="transactionType" id="transactionType">
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
                    <select name="budgetCategory" id="budgetCategory">
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



