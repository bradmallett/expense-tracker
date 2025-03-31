import { useState } from "react";
import clsx from "clsx";


export default function SelectTransactionType({  transactionType, updateTransactionType }) {
    return (
        <div className="mt-4 mb-4 flex justify-around align-middle">
            <button
                className={clsx(
                "p-1 font-bold hover:bg-red-500 hover:text-slate-900",
                transactionType === 'expense' && 'border-t-2 border-b-2 border-red-500 text-red-500' 
                )}
                onClick={() => updateTransactionType('expense')}
            >
                EXPENSE
            </button>
            <button
                className={clsx(
                "p-1 font-bold hover:bg-green-500 hover:text-slate-900",
                transactionType === 'income' && 'border-t-2 border-b-2 border-green-500 text-green-500'
                )}
                onClick={() => updateTransactionType('income')}
            >
                INCOME
            </button>
            <button
                className={clsx(
                "p-1 font-bold hover:bg-purple-500 hover:text-slate-900",
                transactionType === 'savings' && 'border-t-2 border-b-2 border-purple-500 text-purple-500'
                )}
                onClick={() => updateTransactionType('savings')}
            >
                SAVINGS
            </button>
         </div>
    )
}