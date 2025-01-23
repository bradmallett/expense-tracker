
import { getMonthTransactions } from "../lib/actions";
import AddTransaction from "./AddTransaction";
import TransactionsList from "./TransactionsList";


export default async function Transactions({selectedMonth}) {
    const { year, month } = selectedMonth;
    let transactionsListData = null;
    
    // Query DB with year and month from params
    const monthTransactionsData = await getMonthTransactions(year, month); // { monthIDandBeginningBalance: [{id: 2, beginning_balance: 100000}], transactions: [array of transaction objects] }

    // if no data returns, transactionsListData is null
    if (monthTransactionsData?.monthIDandBeginningBalance?.length === 0) {
        console.log('====QUERIED DB, month does not exist======');
        transactionsListData = null; 

    // create data object to send to TransactionsList component
    } else {
        transactionsListData = {
            monthID: monthTransactionsData?.monthIDandBeginningBalance[0].id,
            beginning_balance: monthTransactionsData?.monthIDandBeginningBalance[0].beginning_balance,
            transactions: monthTransactionsData?.transactions
        }
    }


    
   // { monthID, beginning_balance, transactions } - need to give this to formatter func

   
    // const monthData = {
    //     monthID: monthTransactions?.monthID,
    //     year,
    //     month
    // }

    return (
        <div>
            <TransactionsList transactionsListData={transactionsListData} />
            {/* <AddTransaction monthData={monthData}/> */}
        </div>
    );
}