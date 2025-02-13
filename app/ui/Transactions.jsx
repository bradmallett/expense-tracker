
import  getMonthTransactions from "../lib/actions/getMonthTransactions";
import TransactionsList from "./TransactionsList";


export default async function Transactions({selectedMonth}) {
    const { year, month } = selectedMonth;
    
    const monthTransactionsData = await getMonthTransactions(year, month);

    
    return (
        <div>
            <TransactionsList transactionsListData={monthTransactionsData} selectedMonth={selectedMonth}/>
        </div>
    );
}