'use client';

import { useState, useEffect } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import EditTransactionForm from './EditTransactionForm'; 


export default function Edit({ transaction }) {
    const [isOpen, setIsOpen] = useState(false);

    // CLOSE POPUP WITH CLICK OUTSIDE
    useEffect(() => {
      const handleClickOutside = (event) => {
          if(isOpen && !event.target.closest(".editTransaction")) {
              setIsOpen(false);
          }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
      
    }, [isOpen])
   
   
    return (
      <>
        <button 
            className='mr-3 hover:text-orange-600'
            onClick={() => setIsOpen(!isOpen)}
        >
            <PencilSquareIcon className="size-5"/>
        </button>
        {isOpen && (
            <div className='editTransaction w-full min-h-screen bg-slate-900 border-2 absolute top-0 left-0  border-orange-600 p-1 md:w-1/2 md:h-auto md:min-h-0 md:max-w-[660px] md:fixed md:top-1/4 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/4'>
              <div className='m-2 text-orange-600 font-bold flex justify-between align-middle border-b-2 border-orange-600'>
              <p className="self-center text-base">EDIT TRANSACTION</p>
              <XCircleIcon 
                  className="size-8 hover:cursor-pointer hover:text-white"
                  onClick={() => setIsOpen(false)}
              />
            </div>
            <EditTransactionForm transaction={transaction}/>
          </div>
        )}
      </>
    );
};