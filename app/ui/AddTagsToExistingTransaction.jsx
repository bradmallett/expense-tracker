'use client';

import { useState, useEffect } from "react";
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import AddTagsExistingTransForm from "./AddTagsExistingTransForm";


export default function AddTagsToExistingTransaction({ spendingTagNames, transactionID, selectedMonth, transactionTags }) { 
    const [isOpen, setIsOpen] = useState(false);

    // CLOSE POPUP WITH CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(isOpen && !event.target.closest(".addTagsForm")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [isOpen]);

    function closeAddTagsFormOnSubmit() {
        setIsOpen(false)
    };
    

    return (
        <div className="flex justify-center align-middle">
            <button
                className="hover:text-orange-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                <PlusCircleIcon className="size-5"/>
            </button>
            
            {isOpen && (
                <div className="addTagsForm bg-slate-900 min-w-72 border-2 border-orange-600 p-1 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                    <div className='m-2 text-orange-600 font-bold flex justify-between align-middle border-b-2 border-orange-600'>
                        <p className="self-center text-base">ADD SPENDING TAGS</p>
                        <XCircleIcon 
                            className="size-8 hover:cursor-pointer hover:text-white"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>

                    <AddTagsExistingTransForm
                        spendingTagNames={spendingTagNames}
                        transactionID={transactionID}
                        selectedMonth={selectedMonth}
                        transactionTags={transactionTags}
                        closeAddTagsFormOnSubmit={closeAddTagsFormOnSubmit}
                    />
                </div>
            )}
        </div>
    )
}