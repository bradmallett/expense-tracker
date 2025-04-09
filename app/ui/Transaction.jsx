import Edit from "./Edit";
import DeleteTransaction from "./DeleteTransaction";
import TransactionSpendingTags from "./TransactionSpendingTags";
import { formatCentsToDollars } from "../lib/utils";             




export default function Transaction({ trans, selectedMonth, spendingTagNames, spendingTagInstances, monthID }){
    let transColor = '';
    let amountSymbol = '';

    if (trans.type === 'expense') {
        transColor = 'text-red-500';
        amountSymbol = '-';
    }

    if (trans.type === 'income') {
        transColor = 'text-green-500';
        amountSymbol = '+';
    }

    if (trans.type === 'savings') {
        transColor = 'text-purple-500';
    }
    
    return (
        <div>
            <div className="flex justify-between">

                <div className="flex">
                    <Edit
                    transaction={trans}
                    />
                    <DeleteTransaction
                    transData={{
                        id: trans.id,
                        year: selectedMonth.year,
                        month: selectedMonth.month,
                        type: trans.type,
                        amount: trans.amount,
                        description: trans.description,
                        monthID: monthID
                    }} 
                    />
                </div>
            </div>

            <div className="flex justify-between mt-3 text-base">
                <p className="text-white">{trans.description}</p>
                <p className={transColor}>{amountSymbol}{formatCentsToDollars(trans.amount)}</p>
            </div> 

            {trans.type === 'expense' &&
            <TransactionSpendingTags
                spendingTagInstances={spendingTagInstances}
                transactionID={trans.id}
                selectedMonth={selectedMonth}
                spendingTagNames={spendingTagNames}
            />
            }
        </div>
    )
}