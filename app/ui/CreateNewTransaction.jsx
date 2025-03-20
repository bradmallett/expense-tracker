'use client';

import { useState, useEffect } from 'react';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import AddTransaction from './AddTransaction';


export default function CreateNewTransaction({ monthID, spendingTagNames }) {
    const [isOpen, setIsOpen] = useState(false);

    // CLOSE POPUP WITH CLICK OUTSIDE
    useEffect(() => {
      const handleClickOutside = (event) => {
          if(isOpen && !event.target.closest(".addNewTransaction")) {
              setIsOpen(false);
          }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
      
    }, [isOpen])
      
    
    return (
      <div>
        <button
          className=""
          onClick={() => setIsOpen(!isOpen)}
        >
          <PlusCircleIcon className='w-10 h-10 text-orange-600 hover:text-white'/>
        </button>

        {isOpen && (
          <div className='addNewTransaction bg-slate-900 min-w-72 border-2 border-orange-600 p-1 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>

            <div className='m-2 text-orange-600 font-bold flex justify-between align-middle border-b-2 border-orange-600'>
              <p className="self-center text-base">ADD NEW TRANSACTION</p>
              <XCircleIcon 
                  className="size-8 hover:cursor-pointer hover:text-white"
                  onClick={() => setIsOpen(false)}
              />
            </div>

            <AddTransaction monthID={monthID} spendingTagNames={spendingTagNames}/>
          </div>
        )}

      </div>
    );
  }