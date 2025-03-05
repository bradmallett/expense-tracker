'use client';

import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
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
      <div className='text-center'>
        <button
            ref={refs.setReference}
            {...getReferenceProps()}
        >
            <PlusCircleIcon className='w-16 h-16 text-orange-600 hover:text-white'/>
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
      </div>
    );
}