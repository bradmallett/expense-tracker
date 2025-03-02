'use client';

import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import EditTransactionForm from './EditTransactionForm'; 


export default function Edit({ transaction }) {
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
            <PencilSquareIcon className="size-5"/>
        </button>
        {isOpen && (
            <div 
                ref={refs.setFloating} 
                style={floatingStyles}
                {...getFloatingProps()}
            >
            <EditTransactionForm transaction={transaction}/>
          </div>
        )}
      </>
    );
};