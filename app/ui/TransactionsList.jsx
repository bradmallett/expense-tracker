import formatMonthTransactions from "../lib/formatMonthTransactions";
import DeleteTransaction from "./DeleteTransaction";
import CreateNewTransaction from "./CreateNewTransaction";
import Edit from "./Edit";
import TransactionSpendingTags from "./TransactionSpendingTags";
import Transaction from "./Transaction";

 
export default function TransactionsList({ monthTransactionsData, selectedMonth, spendingTagNames, spendingTagInstances }) {

  if(!monthTransactionsData?.transactions?.length) {
    return (
      <div>
        <p>No transactions data for this month</p>
        <CreateNewTransaction monthID={monthTransactionsData?.month?.id} spendingTagNames={spendingTagNames}/>
      </div>
    )
  }

  const { id, beginningMonthBalance, dayObjects } = formatMonthTransactions(monthTransactionsData);


  
    return (
        <div className="trans-list-contain mt-5 m-auto p-4 min-w-full text-slate-400 text-xs">
          
          <CreateNewTransaction monthID={id} spendingTagNames={spendingTagNames}/>
    
            {dayObjects.map(day => (
              <div key={day.day} className="mt-2 p-1 bg-slate-900 border-l-2 border-orange-600">
                <div className="flex justify-between">
                  <p className="text-orange-600">{day.date}</p>
                  <p>End Day Balance: ${day.endDayBalance}</p>
                </div>

                  {day.transactions.map(trans => (
                    <div key={trans.id} className="p-2 border-t border-slate-600">
                      <Transaction 
                        trans={trans}
                        selectedMonth={selectedMonth}
                        spendingTagNames={spendingTagNames}
                        spendingTagInstances={spendingTagInstances}
                      />
                    </div>
                    ))}
              </div>
            ))}

          <h2>MONTH BEGINNING BALANCE: ${beginningMonthBalance}</h2>
        </div>
      );
};




