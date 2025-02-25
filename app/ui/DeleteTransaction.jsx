'use client';

import DeleteTransactionForm from './DeleteTransactionForm';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import { useState } from 'react';



export default function DeleteTransaction({ transData }) {

    const [isOpen, setIsOpen] = useState(false);
   
    const {refs, floatingStyles, context} = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'bottom-end',
    });

    const click = useClick(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click,
      ]);

    return (
        <>
        <button 
            className='mr-3'
            ref={refs.setReference}
            {...getReferenceProps()}
        >
            <TrashIcon className="size-6"/>
        </button>
        {isOpen && (
            <div 
                ref={refs.setFloating} 
                style={floatingStyles}
                {...getFloatingProps()}
            >
            <DeleteTransactionForm transData={transData}/>
          </div>
        )}
      </>
    )
}