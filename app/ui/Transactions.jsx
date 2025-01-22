
// import AddTransaction from "./ui/AddTransaction";

import { getMonthTransactions } from "../lib/actions";
import formatMonthTransactions from "../lib/formatMonthTransactions";
import TransactionsList from "./TransactionsList";


export default async function Transactions({selectedMonth}) {
    const { year, month } = selectedMonth;
    
    const monthTransactions = await getMonthTransactions(year, month); // { monthID: id, beginning_balance, transactions }
    
    const formattedTransactions = formatMonthTransactions(monthTransactions); // { monthID, beginningMonthBalance, dayObjects }
  

    return (
        <div>
            <TransactionsList monthTransactions={formattedTransactions} />
            {/* <AddTransaction /> */}
        </div>
    );
}