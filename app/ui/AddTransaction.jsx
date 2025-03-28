'use client';

import { useState, useRef, useEffect } from "react";
import { addTransaction } from "../lib/actions/addTransaction";
import AddTagsNewTransactionForm from "./AddTagsNewTransactionForm";
import clsx from "clsx";
import { ChevronDownIcon} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CurrencyInput } from 'react-currency-mask';


export default function AddTransaction({ monthID, spendingTagNames }) {
    const selectedSpendingTags = useRef([]);
    const [transactionType, setTransactionType ]= useState('expense');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [showCatOptions, setShowCatOptions] = useState(false);
    const [selectedCat, setSelectedCat] = useState('fun');
    const searchParams = useSearchParams();
    const [selectedDate, setSelectedDate] = useState(() => {
        const year = searchParams.get('year');
        const month = searchParams.get('month');

        if (year && month) {
            return new Date(Number(year), Number(month) - 1, 1);
        }
        return new Date();
    });




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

            <div className="m-2 group inline-block">
                <p>DATE</p>
                <DatePicker
                    className="bg-slate-900 text-slate-200 border-2 hover:border-orange-600"
                    calendarClassName="month-picker"
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    showIcon
                    icon={<CalendarIcon className="m p-0 top-1"/>} 
                />
            </div>

            <div className="m-2 group inline-block">
                <p>DESCRIPTION</p>
                <input
                    type="text"
                    placeholder="Add Description..."
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
                    placeholder="$0.00"
                    onChangeValue={(event, originalValue, maskedValue) => {
                        setAmount(originalValue);
                    }}
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

                    <AddTagsNewTransactionForm 
                        spendingTagNames={spendingTagNames}
                        addSpendingTagsToTransaction={addSpendingTagsToTransaction}
                    />
                </div>
            }


                 


            <button 
                // update on click!!!
                onClick={() => console.log('clicked')}
                className="w-full p-2 border-2 text-base border-orange-600 bg-orange-600 text-slate-900 font-bold hover:text-slate-700"    
            >
                CREATE {`${transactionType.toUpperCase()}`}
            </button>
        </div>
      );
};
