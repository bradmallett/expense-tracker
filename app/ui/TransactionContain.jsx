
import  getMonthTransactions from "../lib/actions/getMonthTransactions";
import TransactionsList from "./TransactionsList";
import getSpendingTagNames from "../lib/actions/getSpendingTagNames";
import getMonthSpendingTagInstances from "../lib/actions/getMonthSpendingTagInstances";

export default async function TransactionContain({selectedMonth}) {
    const { year, month } = selectedMonth;
    
    const monthTransactionsData = await getMonthTransactions(year, month); // { month, transactions }
    const spendingTagInstances =  await getMonthSpendingTagInstances(monthTransactionsData?.transactions);
    const spendingTagNames = await getSpendingTagNames();
    
    return (
        <div className="flex flex-col">
            <TransactionsList 
                monthTransactionsData={monthTransactionsData} 
                selectedMonth={selectedMonth}
                spendingTagNames={spendingTagNames}
                spendingTagInstances={spendingTagInstances}
            />
            
            <div>SPENDING CHARTS ETC...</div>
        </div>
    );
}