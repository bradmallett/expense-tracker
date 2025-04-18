
import  getMonthTransactions from "../lib/actions/getMonthTransactions";
import TransactionsList from "./TransactionsList";
import getSpendingTagNames from "../lib/actions/getSpendingTagNames";
import getMonthSpendingTagInstances from "../lib/actions/getMonthSpendingTagInstances";

export default async function TransactionContain({ selectedMonth, monthTransactionsData}) {
    const spendingTagInstances =  await getMonthSpendingTagInstances(monthTransactionsData?.transactions);
    const spendingTagNames = await getSpendingTagNames();
    
    return (
        <div className="flex flex-col w-[50%] m-5">
            <TransactionsList 
                monthTransactionsData={monthTransactionsData} 
                selectedMonth={selectedMonth}
                spendingTagNames={spendingTagNames}
                spendingTagInstances={spendingTagInstances}
            />
        </div>
    );
}