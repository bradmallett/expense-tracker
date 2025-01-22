
import  formatMonthTransactions from "../lib/formatMonthTransactions";


export default async function TransactionsList({ monthTransactions }) {
    const  { monthID, beginningMonthBalance, dayObjects } = await formatMonthTransactions(monthTransactions);

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
                    <div key={trans.id}>
                      <p>{trans.description}</p>
                      <p>{trans.type}</p>
                      <p>{trans.amount}</p>
                    </div>
                    ))}
                </div>
              </div>
            ))} 
        </div>
      );
};




