import formatMonthTransactions from "../lib/formatMonthTransactions";
import { EditTransaction } from "./buttons";


export default function TransactionsList({ transactionsListData }) {

  if(!transactionsListData?.transactions?.length || !transactionsListData?.month) {
    return <p>No transactions data for this month</p>
  }

   const { monthID, beginningMonthBalance, dayObjects } = formatMonthTransactions(transactionsListData);
    

    return (
        <div className="trans-list-contain">
           <h1>TRANSACTIONS</h1>
          <h2>MONTH BEGINNING BALANCE: ${beginningMonthBalance}</h2>
    
            {dayObjects.map(day => (
              <div key={day.day} className="day-contain">
                <div>
                  <p><strong>Date: {day.date}</strong></p>
                  <h1 style={{color: 'green'}}>Balance: {day.endDayBalance}</h1>
                  {day.transactions.map(trans => (
                    <div key={trans.id} className="trans-contain">
                      <p className="trans-descrip">{trans.description}</p>
                      <p>{trans.type}</p>
                      <p>{trans.amount}</p>
                      <EditTransaction id={trans.id}/>
                    </div>
                    ))}
                </div>
              </div>
            ))} 
        </div>
      );
};




