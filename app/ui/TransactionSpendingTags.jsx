'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import deleteSpendingTagInstance from "../lib/actions/deleteSpendingTagInstance";
import AddTagsToExistingTransaction from "./AddTagsToExistingTransaction";


export default function TransactionSpendingTags({ spendingTagInstances, transactionID, selectedMonth, spendingTagNames}) {
    const transactionTags = spendingTagInstances.filter(tag => tag.transaction_id === transactionID);

    function handleDeleteTag(e, tagID) {
        e.preventDefault();

        deleteSpendingTagInstance(tagID, selectedMonth);
    }

    return (
        <div className="flex mt-3">
            <AddTagsToExistingTransaction 
                spendingTagNames={spendingTagNames} 
                transactionID={transactionID}
                selectedMonth={selectedMonth}
                transactionTags={transactionTags}
            />
            {transactionTags.map(tag => (
                <div
                    key={tag.tag_id}
                    className="p-1 m-1 flex border border-slate-600 group"    
                >
                    <p>
                        {tag.tag_name}
                    </p>
                    <button
                        className=""
                        onClick={e => handleDeleteTag(e, tag.tag_id)}
                    >
                        <XMarkIcon className="size-4 ml-1 group-hover:text-orange-600"/>
                    </button>
                </div>
            ))}
        </div>
    );
}
