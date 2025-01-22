
import { getMonthTransactions } from "../lib/actions";
import formatMonthTransactions from "../lib/formatMonthTransactions";
import AddTransaction from "./AddTransaction";
import TransactionsList from "./TransactionsList";


export default async function Transactions({selectedMonth}) {
    const { year, month } = selectedMonth;
    
    const monthTransactions = await getMonthTransactions(year, month); // { monthID, beginning_balance, transactions }
    const formattedTransactions = formatMonthTransactions(monthTransactions); // { monthID, beginningMonthBalance, dayObjects }
  
    const monthData = {
        monthID: monthTransactions?.monthID,
        year,
        month
    }

    return (
        <div>
            <TransactionsList monthTransactions={formattedTransactions} />
            <AddTransaction monthData={monthData}/>
        </div>
    );
}