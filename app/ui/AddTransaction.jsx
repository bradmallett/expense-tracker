'use client';

import { useState, useRef, useEffect } from "react";
import { addTransaction } from "../lib/actions/addTransaction";
import AddTagsNewTransactionForm from "./AddTagsNewTransactionForm";
import clsx from "clsx";
import { ChevronDownIcon} from '@heroicons/react/24/outline';



export default function AddTransaction({ monthID, spendingTagNames }) {
    const selectedSpendingTags = useRef([]);
    const [transactionType, setTransactionType ]= useState('expense');
    const [showCatOptions, setShowCatOptions] = useState(false);
    const [selectedCat, setSelectedCat] = useState('fun');

    // CLOSE DROPDOWN WITH CLICK OUTSIDE
    useEffect(() => {
    const handleClickOutside = (event) => {
        if(showCatOptions && !event.target.closest(".categories")) {
            setSelectedCat(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showCatOptions])


    function addSpendingTagsToTransaction(transactionTags) {
        if(transactionTags.length > 0) {
            selectedSpendingTags.current = [...transactionTags];
        }
    }

    // now sending transactionType to addTransaction with bind
    const addTransactionWithID = addTransaction.bind(null, { monthID, selectedSpendingTags, transactionType, selectedCat });

    return (
        <div className="mt-2 mb-2">
            <div className="mt-4 mb-4 flex justify-around align-middle">
                <button
                    className={clsx(
                    "p-1 font-bold hover:bg-red-500 hover:text-slate-900",
                    transactionType === 'expense' && 'border-t-2 border-b-2 border-red-500 text-red-500' 
                    )}
                    onClick={() => setTransactionType('expense')}
                >
                    EXPENSE
                </button>
                <button
                    className={clsx(
                    "p-1 font-bold hover:bg-green-500 hover:text-slate-900",
                    transactionType === 'income' && 'border-t-2 border-b-2 border-green-500 text-green-500'
                    )}
                    onClick={() => setTransactionType('income')}
                >
                    INCOME
                </button>
                <button
                    className={clsx(
                    "p-1 font-bold hover:bg-purple-500 hover:text-slate-900",
                    transactionType === 'savings' && 'border-t-2 border-b-2 border-purple-500 text-purple-500'
                    )}
                    onClick={() => setTransactionType('savings')}
                >
                    SAVINGS
                </button>
            </div>

            { transactionType === 'expense' &&
                 <AddTagsNewTransactionForm 
                    spendingTagNames={spendingTagNames}
                    addSpendingTagsToTransaction={addSpendingTagsToTransaction}
             />
            }


            <form action={addTransactionWithID}>
                <div className="m-2">
                    <p>SELECT DATE</p>
                    <input
                        name="date"
                        type="date"
                        required
                    />
                </div>

                <div className="m-2 group inline-block">
                <p>DESCRIPTION</p>
                    <input
                        name="description"
                        type="text"
                        placeholder="Add a description..."
                        required
                        className="p-2 font-bold bg-slate-950 text-slate-400 border border-slate-500 group-hover:border-orange-600"
                    />
                </div>

                <div className="m-2 group inline-block">
                <p>AMOUNT</p>
                    <input
                        name="amount"
                        type="number"
                        placeholder="$0.00"
                        step="0.01"
                        required
                        className="p-2 font-bold bg-slate-950 text-slate-400 border border-slate-500 group-hover:border-orange-600"
                    />
                </div>




                { transactionType === 'expense' &&
                    <div className="m-2">
                        <p>BUDGET CATEGORY</p>
                        <button
                            className="mb-3 p-2 font-bold bg-slate-950 border border-slate-500 flex text-slate-400 hover:border-orange-600 hover:text-orange-600 group"
                            onClick={() => setShowCatOptions(true)}
                        >
                            {selectedCat}<ChevronDownIcon className="size-5 ml-1 group-hover:text-orange-600"/>
                        </button>

                        {showCatOptions &&
                            <ul className="categories bg-slate-950 text-slate-400 fixed p-1 flex flex-col border-t-2 border-orange-600 max-h-48 overflow-auto sm:max-h-[400px]">
                                {['fun', 'fundamental', 'future'].map((cat) => (
                                    <button
                                        className="p-1 hover:bg-orange-600 hover:text-slate-900"
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCat(cat);
                                            setShowCatOptions(false);
                                            
                                            }}
                                    >
                                            {cat}
                                    </button>
                                ))}
                            </ul>
                        }
                    </div>
                }





                <button 
                    type="submit"
                    className="w-full p-2 border-2 text-base border-orange-600 bg-orange-600 text-slate-900 font-bold hover:text-slate-700"    
                >
                    CREATE {`${transactionType.toUpperCase()}`}
                </button>
            </form>
        </div>
      );
};
