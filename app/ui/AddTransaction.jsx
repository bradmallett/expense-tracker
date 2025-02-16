import { addTransaction } from "../lib/actions/addTransaction";
import { useState } from "react";

export default function AddTransaction({ monthID, spendingTagNames }) {
    const [showTagTextInput, setShowTagTextInput] = useState(false);
    const [selectedSpendingTags, setSelectedSpendingTags] = useState([]);

    const addTransactionWithID = addTransaction.bind(null, { monthID, selectedSpendingTags});

    function handleUpdateSpendingTags(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        let selectedTag;

        // if creating a new tag not in database
        if(showTagTextInput) {
            selectedTag = {
                tagID: null,
                tagName: formData.get('newSpendingTagName')
            }
        }

        // if tag exists in database already
        if(!showTagTextInput && formData.get('spendingTag') !== '') {
            selectedTag = JSON.parse(formData.get('spendingTag'));
        }

        const tagHasBeenSelected = selectedSpendingTags.some(tag => tag.tagName === selectedTag.tagName);

        if(!tagHasBeenSelected && formData.get('spendingTag') !== '') {
            setSelectedSpendingTags(prevTags => [...prevTags, selectedTag])
        }
    }




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


            {/* COMPONENT STATE SPENDING TAGS */}
            <form onSubmit={handleUpdateSpendingTags}>
                <div className="input-contain">
                    <label htmlFor="spendingTag">SPENDING TAG: </label>
                    <select 
                        name="spendingTag" 
                        id="spendingTag"
                        onChange={(e) => setShowTagTextInput(e.target.value === "new")}
                    >
                        <option value="">Select a tag...</option>
                        <option value="new">+ Create New Tag...</option>
                        {spendingTagNames.map((tagName) => (
                            <option
                                key={tagName.id} 
                                value={JSON.stringify({
                                    tagID: tagName.id,
                                    tagName: tagName.name
                                })}
                            >
                                    {tagName.name}
                            </option>
                        ))}
                    </select>

                    {showTagTextInput && (
                        <input 
                            type="text"
                            name="newSpendingTagName"
                            placeholder="Enter New Tag Name"
                        />
                    )}
                </div>
                <button type="submit">ADD TAG</button>
            </form>

            {selectedSpendingTags.length > 0 && 
                <div>
                    <p>ADDED SPENDING TAGS:</p>
                    {selectedSpendingTags.map((tag) => (
                        <p key={tag.tagName}>{tag.tagName}</p>
                    ))}

                    <button onClick={() => setSelectedSpendingTags([])}>CLEAR TAGS</button>
                </div>
            }

        </div>
      );
};



