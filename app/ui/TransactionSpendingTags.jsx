'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import deleteSpendingTagInstance from "../lib/actions/deleteSpendingTagInstance";
import AddTagsToExistingTransaction from "./AddTagsToExistingTransaction";


export default function TransactionSpendingTags({ spendingTagInstances, transactionID, selectedMonth, spendingTagNames}) {
    const transactionTags = spendingTagInstances.filter(tag => tag.transaction_id === transactionID);

    function handleDeleteTag(e, tagID) {
        e.preventDefault();

        deleteSpendingTagInstance(tagID, selectedMonth);
    }

    return (
        <div className="tagName-contain">
            <AddTagsToExistingTransaction 
                spendingTagNames={spendingTagNames} 
                transactionID={transactionID}
                selectedMonth={selectedMonth}
            />
            {transactionTags.map(tag => (
                <div 
                    key={tag.tag_id}
                    className="spendingTagElement"    
                >
                    <p>
                        #{tag.tag_name}
                    </p>
                    <button
                        className="spendinTagTrash"
                        onClick={e => handleDeleteTag(e, tag.tag_id)}
                    >
                        <TrashIcon className="size-3"/>
                    </button>
                </div>
            ))}
        </div>
    );
}
