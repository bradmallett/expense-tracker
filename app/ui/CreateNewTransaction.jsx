'use client';

import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import AddTransaction from './AddTransaction';


export default function CreateNewTransaction({ monthID, spendingTagNames }) {
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
      <>
      <p>ADD TRANSACTION</p>
        <button 
            ref={refs.setReference}
            {...getReferenceProps()}
        >
            <PlusCircleIcon className="size-6"/>
        </button>
        {isOpen && (
            <div 
                ref={refs.setFloating} 
                style={floatingStyles}
                {...getFloatingProps()}
            >
            <AddTransaction monthID={monthID} spendingTagNames={spendingTagNames}/>
          </div>
        )}
      </>
    );
}