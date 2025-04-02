'use client';

import { useState, useRef, useEffect } from "react";
import { addTransaction } from "../lib/actions/addTransaction";
import AddTagsNewTransactionForm from "./AddTagsNewTransactionForm";
import SelectTransactionType from "./SelectTransactionType";
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
                setShowCatOptions(false);
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

    function updateTransactionType(updatedTransactionType) {
        setTransactionType(updatedTransactionType);
    }
    
    
        // now sending transactionType to addTransaction with bind
        const addTransactionWithID = addTransaction.bind(null, { monthID, selectedSpendingTags, transactionType, selectedCat });

    return (
        <div className="m-2 text-xs md:text-sm">

            <SelectTransactionType 
                transactionType={transactionType}  
                updateTransactionType={updateTransactionType}
            />

            <div className="m-2  group inline-block">
                <p>DATE</p>
                <DatePicker
                    className="p-2 font-bold bg-slate-950 text-slate-400 border border-slate-500 group-hover:border-orange-600"
                    calendarClassName="date-picker"
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    showIcon
                    icon={<CalendarIcon />} 
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
                        className="mb-3 p-2 font-bold bg-slate-950 border border-slate-500 flex  text-slate-400 hover:border-orange-600 hover:text-orange-600 group"
                        onClick={() => setShowCatOptions(true)}
                    >
                        {selectedCat}<ChevronDownIcon className="size-5 ml-1  group-hover:text-orange-600"/>
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

                    <AddTagsNewTransactionForm 
                        spendingTagNames={spendingTagNames}
                        addSpendingTagsToTransaction={addSpendingTagsToTransaction}
                    />
                </div>
            }








                 

            <div className="m-2 flex justify-center">
                <button 
                    // update on click!!!
                    onClick={() => console.log('clicked')}
                    className={clsx("w-5/6 p-3 text-base bg-orange-600 text-slate-900 font-bold",
                        transactionType === 'expense' &&  'hover:bg-red-500', 
                        transactionType === 'income' &&  'hover:bg-green-500',
                        transactionType === 'savings' &&  'hover:bg-purple-500',
                    )}    
                >
                    CREATE {`${transactionType.toUpperCase()}`}
                </button>
            </div>
        </div>
      );
};
