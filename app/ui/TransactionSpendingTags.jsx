'use client';

import { useState } from "react";
import { useFloating, useHover, useInteractions, safePolygon } from '@floating-ui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import deleteSpendingTagInstance from "../lib/actions/deleteSpendingTagInstance";
import AddTagsToExistingTransaction from "./AddTagsToExistingTransaction";


export default function TransactionSpendingTags({ spendingTagInstances, transactionID, selectedMonth, spendingTagNames}) {
    const [openTag, setOpenTag] = useState(null); // Track which tag is open

    const { refs, floatingStyles, context } = useFloating({
        open: openTag !== null, 
        onOpenChange: (open) => !open && setOpenTag(null), 
        placement: 'top',
    });

    const hover = useHover(context, {
        handleClose: safePolygon({ requireIntent: false }),
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

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
                <div key={tag.tag_id} className="relative">
                    <p
                        className="spendingTagElement"
                        ref={openTag === tag.tag_id ? refs.setReference : null} // Only set ref for open tag
                        {...getReferenceProps()}
                        onMouseEnter={() => setOpenTag(tag.tag_id)} // Set the hovered tag
                    >
                        #{tag.tag_name}
                    </p>
                </div>
            ))}

            {openTag !== null && (
                <button
                    className="spendinTagTrash absolute bg-gray-200 p-1 rounded shadow"
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    onClick={e => handleDeleteTag(e, openTag)}
                >
                    <TrashIcon className="size-3"/>
                </button>
            )}
        </div>
    );
}
