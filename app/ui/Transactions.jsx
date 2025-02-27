
import  getMonthTransactions from "../lib/actions/getMonthTransactions";
import TransactionsList from "./TransactionsList";
import getSpendingTagNames from "../lib/actions/getSpendingTagNames";
import getMonthSpendingTagInstances from "../lib/actions/getMonthSpendingTagInstances";


export default async function Transactions({selectedMonth}) {
    const { year, month } = selectedMonth;
    
    const monthTransactionsData = await getMonthTransactions(year, month);
    const spendingTagInstances =  await getMonthSpendingTagInstances(monthTransactionsData?.transactions);
    const spendingTagNames = await getSpendingTagNames();
    
    return (
        <div>
            <TransactionsList 
                monthTransactionsData={monthTransactionsData} 
                selectedMonth={selectedMonth}
                spendingTagNames={spendingTagNames}
                spendingTagInstances={spendingTagInstances}
            />
        </div>
    );
}