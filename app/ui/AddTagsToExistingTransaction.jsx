'use client';

import { useState } from "react";
import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import AddTagsExistingTransForm from "./AddTagsExistingTransForm";


export default function AddTagsToExistingTransaction({ spendingTagNames, transactionID, selectedMonth }) { 
    const [isOpen, setIsOpen] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-start',
    });

    const click = useClick(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
      ]);

    return (
        <div>
            <button 
                ref={refs.setReference}
                {...getReferenceProps()}
                className="btn-addTagsToTransaction"
            >
                <PlusCircleIcon className="size-5"/>
            </button>
            {isOpen && (
                <div 
                    ref={refs.setFloating} 
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    <AddTagsExistingTransForm
                        spendingTagNames={spendingTagNames}
                        transactionID={transactionID}
                        selectedMonth={selectedMonth}
                    />
                </div>
            )}
        </div>
    )
}