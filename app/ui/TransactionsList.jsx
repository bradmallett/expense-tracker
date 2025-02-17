import formatMonthTransactions from "../lib/formatMonthTransactions";
import { DeleteTransaction } from "./buttons";
import { Add } from "./Add";
import  Edit  from "./Edit";
import TransactionSpendingTags from "./TransactionSpendingTags";

 
export default function TransactionsList({ monthTransactionsData, selectedMonth, spendingTagNames, spendingTagInstances }) {

  if(!monthTransactionsData?.transactions?.length) {
    return (
      <div>
        <p>No transactions data for this month</p>
        <Add monthID={monthTransactionsData?.month?.id} spendingTagNames={spendingTagNames}/>
      </div>
    )
  }

  const { id, beginningMonthBalance, dayObjects } = formatMonthTransactions(monthTransactionsData);
    
    return (
        <div className="trans-list-contain">
          <h2>MONTH BEGINNING BALANCE: ${beginningMonthBalance}</h2>
          <Add monthID={id} spendingTagNames={spendingTagNames}/>
    
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
                      <Edit transaction={trans}/>
                      <DeleteTransaction 
                        transData={{
                          id: trans.id,
                          year: selectedMonth.year,
                          month: selectedMonth.month,
                          type: trans.type,
                          amount: trans.amount
                        }} 
                      />
                      <TransactionSpendingTags
                        spendingTagInstances={spendingTagInstances}
                        transactionID={trans.id}
                      />
                    </div>
                    ))}
                </div>
              </div>
            ))} 
        </div>
      );
};




