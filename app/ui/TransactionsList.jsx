import formatMonthTransactions from "../lib/formatMonthTransactions";


export default function TransactionsList({ transactionsListData }) {


      const formattedTransactions = transactionsListData ? formatMonthTransactions(transactionsListData): null; 
      // { monthID, beginningMonthBalance, dayObjects }

    


    return (
        <div className="trans-list-contain">
           <h1>TRANSACTIONS</h1>
          <h2>MONTH BEGINNING BALANCE: ${formattedTransactions?.beginningMonthBalance}</h2>
    
            {formattedTransactions?.dayObjects.map(day => (
              <div key={day.day} className="day-contain">
                <div>
                  <p><strong>Date: {day.date}</strong></p>
                  <h1 style={{color: 'green'}}>Balance: {day.endDayBalance}</h1>
                  {day.transactions.map(trans => (
                    <div key={trans.id} className="trans-contain">
                      <p className="trans-descrip">{trans.description}</p>
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




