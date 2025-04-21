import buildDayObjects from "../lib/buildDayObjects";
import CreateNewTransaction from "./CreateNewTransaction";
import Transaction from "./Transaction";
import { formatCentsToDollars } from "../lib/utils";


export default function TransactionsList({ monthTransactionsData, selectedMonth, spendingTagNames, spendingTagInstances }) {
  const monthID = monthTransactionsData?.month?.id || null;
  const transactions = monthTransactionsData?.transactions || [];

  if(transactions.length === 0 || monthID === null) {
    return (
      <div className="text-center">
        <p>Enter a transaction.</p>
        <CreateNewTransaction monthID={monthID} spendingTagNames={spendingTagNames}/>
      </div>
    )
  }


  const { dayObjects } = buildDayObjects(monthTransactionsData.month.beginning_balance, transactions);


  return (
      <div className="trans-list-contain m-auto w-full max-w-3xl text-slate-400 text-xs text-center md:text-left">
        
        <CreateNewTransaction monthID={monthID} spendingTagNames={spendingTagNames}/>
  
          {dayObjects.map(day => (
            <div key={day.day} className="mt-2 p-2 bg-slate-900 border-l-2 border-orange-600">
              <div className="flex justify-between">
                <p className="text-orange-600">{day.date}</p>
                <p>End Day Balance: {formatCentsToDollars(day.endDayBalance)}</p>
              </div>

                {day.transactions.map(trans => (
                  <div key={trans.id} className="p-3 border-t border-slate-600">
                    <Transaction 
                      trans={trans}
                      selectedMonth={selectedMonth}
                      spendingTagNames={spendingTagNames}
                      spendingTagInstances={spendingTagInstances}
                      monthID={monthID}
                    />
                  </div>
                  ))}
            </div>
          ))}

        <h2 className="text-right mt-1">MONTH BEGINNING BALANCE: {formatCentsToDollars(monthTransactionsData.month.beginning_balance)}</h2>
      </div>
    );
};




