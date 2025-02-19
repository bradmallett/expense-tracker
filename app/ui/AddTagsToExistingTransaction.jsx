'use client';

import { useEffect, useState, useRef } from "react";
import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import AddSpendingTagsForm from "./AddSpendingTagsForm";
import addSpendingTags from "../lib/actions/addSpendingTags";


export default function AddTagsToExistingTransaction({ spendingTagNames, transactionID }) { 
    const [isOpen, setIsOpen] = useState(false);
    const selectedSpendingTags = useRef([]);
    const [showButton, setShowButton] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
    });

    const click = useClick(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
      ]);


    function addSpendingTagsToTransaction(transactionTags) {
        if(transactionTags.length > 0) {
            selectedSpendingTags.current = [...transactionTags];
            setShowButton(true);
        }
        if(transactionTags.length === 0) {
            setShowButton(false);
        }
    }

    
    function handleAddTagsToTransaction(e) {
        e.preventDefault();

        // addSpendingTags(selectedSpendingTags, transactionID);
    }


    return (
        <div>
            <button 
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                <PlusCircleIcon className="size-5"/>
            </button>
            {isOpen && (
                <div 
                    ref={refs.setFloating} 
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    <AddSpendingTagsForm 
                        spendingTagNames={spendingTagNames}
                        addSpendingTagsToTransaction={addSpendingTagsToTransaction}
                    />

                    {showButton && 
                        <button onClick={e => handleAddTagsToTransaction(e)}>ADD SPENDING TAGS</button>
                    }

                </div>
            )}
        </div>
    )

}