'use client';

import { editTransaction } from "../lib/actions/editTransaction";
import { useState, useEffect } from 'react';
import clsx from "clsx";
import { CurrencyInput } from 'react-currency-mask';
import { ChevronDownIcon} from '@heroicons/react/24/outline';
import SelectTransactionType from "./SelectTransactionType";




export default function EditTransactionForm({ transaction, closeEditTransactionOnSubmit }) {
    const [transactionType, setTransactionType ] = useState(transaction.type);
    const [description, setDescription] = useState(transaction.description);
    const [amount, setAmount] = useState(transaction.amount / 100);
    const [showCatOptions, setShowCatOptions] = useState(false);
    const [selectedCat, setSelectedCat] = useState(transaction.budgetCategory);


    console.log('amount from EditTransactionForm: ', amount, typeof amount);

    // CLOSE DROPDOWN WITH CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(showCatOptions && !event.target.closest(".categories")) {
                setShowCatOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside); 
    }, [showCatOptions])



    function updateTransactionType(updatedTransactionType) {
        setTransactionType(updatedTransactionType);

        if(updatedTransactionType === 'income' || updatedTransactionType === 'savings') {
            setSelectedCat('');
        }
    }
    


    function handleEditTransactionClick() {
        // check if all fields are filled
        if(!description || !amount) {
            alert('Please fill in all fields');
            return;
        }

        const transactionData = {
            monthID: transaction.id,
            description,
            amountInCents: Math.round(amount * 100),
            prevTransAmountInCents: transaction.amount,
            transactionDate: transaction.date,
            transactionType,
            selectedCat
        };

        editTransaction(transactionData);
        closeEditTransactionOnSubmit();
    }


    // const IDandDate = {
    //     monthID: transaction.id,
    //     transactionDate: transaction.date,
    //     prevTransactionAmount: transaction.amount
    // }

    // NOT GOING TO BIND ANYMORE
    // const editTransactionWithID = editTransaction.bind(null, IDandDate);

    return (
        <div>
            <p className="ml-2">EDITING {transaction.type.toUpperCase()}: <span className="text-orange-600 font-bold">"{transaction.description}"</span></p>
            <p className="ml-2">DATE: <span className="text-orange-600 font-bold">{new Date(transaction.date).toDateString()}</span></p>

            <SelectTransactionType 
                transactionType={transactionType}  
                updateTransactionType={updateTransactionType}
            />

            <div className="m-2 group inline-block">
                <p>DESCRIPTION</p>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 font-bold bg-slate-950 text-slate-400 border border-slate-500 group-hover:border-orange-600"
                />
            </div>

            <div className="m-2 group inline-block">
                <p>AMOUNT</p>
                <CurrencyInput
                    className="p-2 font-bold bg-slate-950 text-slate-400 border border-slate-500 group-hover:border-orange-600"
                    currency="USD"
                    locale="en-US"
                    defaultValue={transaction.amount / 100}
                    onChangeValue={(event, originalValue, maskedValue) => {
                        setAmount(originalValue);
                    }}
                />
            </div>

                { transactionType === 'expense' &&
                    <div className="m-2">
                        <p>BUDGET CATEGORY</p>
                        <button
                            className="mb-3 p-2 font-bold bg-slate-950 border border-slate-500 flex  text-slate-400 hover:border-orange-600 hover:text-orange-600 group"
                            onClick={() => setShowCatOptions(true)}
                        >
                            {selectedCat !== '' ? selectedCat : "Pick a Category"}<ChevronDownIcon className="size-5 ml-1  group-hover:text-orange-600"/>
                        </button>
    
                        {showCatOptions &&
                            <ul className="categories bg-slate-950 text-slate-400 fixed p-1 flex flex-col border-t-2 border-orange-600">
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

                
                <div className="m-2 flex justify-center">
                    <button 
                        onClick={() => handleEditTransactionClick()}
                        className={clsx("w-5/6 p-3 text-base bg-orange-600 text-slate-900 font-bold",
                            transaction.type === 'expense' &&  'hover:bg-red-500', 
                            transaction.type === 'income' &&  'hover:bg-green-500',
                            transaction.type === 'savings' &&  'hover:bg-purple-500',
                        )}    
                    >
                        EDIT {`${transaction.type.toUpperCase()}`}
                    </button>
                </div>
        </div>
      );
};



