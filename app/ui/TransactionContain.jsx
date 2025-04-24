
import  getMonthTransactions from "../lib/actions/getMonthTransactions";
import TransactionsList from "./TransactionsList";
import getSpendingTagNames from "../lib/actions/getSpendingTagNames";

export default async function TransactionContain({ selectedMonth, monthTransactionsData, spendingTagInstances}) {
    const spendingTagNames = await getSpendingTagNames();

    
    return (
        <div className="flex flex-col w-full mt-10 md:m-3 md:w-1/2 md:mx-auto">
            <TransactionsList 
                monthTransactionsData={monthTransactionsData} 
                selectedMonth={selectedMonth}
                spendingTagNames={spendingTagNames}
                spendingTagInstances={spendingTagInstances}
            />
        </div>
    );
}