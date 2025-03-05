'use client';

import { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import EditTransactionForm from './EditTransactionForm'; 


export default function Edit({ transaction }) {
    const [isOpen, setIsOpen] = useState(false);
   
   
    return (
      <>
        <button 
            className='mr-3 hover:text-orange-600'
            onClick={() => setIsOpen(!isOpen)}
        >
            <PencilSquareIcon className="size-5"/>
        </button>
        {isOpen && (
            <div>
            <EditTransactionForm transaction={transaction}/>
          </div>
        )}
      </>
    );
};