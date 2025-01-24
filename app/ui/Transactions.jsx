
import { getMonthTransactions } from "../lib/actions";
// import AddTransaction from "./AddTransaction";
import TransactionsList from "./TransactionsList";


export default async function Transactions({selectedMonth}) {
    const { year, month } = selectedMonth;
    
    const monthTransactionsData = await getMonthTransactions(year, month); 

    return (
        <div>
            <TransactionsList transactionsListData={monthTransactionsData} />
            {/* <AddTransaction monthData={monthData}/> */}
        </div>
    );
}