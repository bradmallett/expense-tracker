'use client';

import deleteTransaction from "../lib/actions/deleteTransaction";
import { TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';


export default function DeleteTransaction({ transData }) {
    const [isOpen, setIsOpen] = useState(false);

    const deleteTransactionWithTransData = deleteTransaction.bind(null, transData);
    
    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
            >
                <TrashIcon className="size-5 hover:text-orange-600"/>
            </button>
        {isOpen && (
            <div className="bg-slate-900 min-w-72 border-2 border-orange-600 p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
                <div className='text-orange-600 m-2 font-bold flex justify-between'>
                    <p className="inline-block border-b-2 border-orange-600">DELETE TRANSACTION</p>
                    <XCircleIcon 
                        className="size-8 hover:cursor-pointer hover:text-white"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
                <p className="mt-6 ml-2">{`${transData.description}`}</p>
                <p className="ml-2 mb-6">{`$${transData.amount}`}</p>
                <form action={deleteTransactionWithTransData} className="text-center">
                    <button
                        className="p-3 text-orange-600 m-2 border-2 border-orange-600 font-bold hover:text-slate-900 hover:bg-orange-600"
                        type="submit">
                            DELETE
                    </button>
                </form>
          </div>
        )}
      </>
    )
}