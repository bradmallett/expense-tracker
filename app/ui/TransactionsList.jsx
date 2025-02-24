import formatMonthTransactions from "../lib/formatMonthTransactions";
import { DeleteTransaction } from "./buttons";
import CreateNewTransaction from "./CreateNewTransaction";
import  Edit  from "./Edit";
import TransactionSpendingTags from "./TransactionSpendingTags";

 
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
        <div className="trans-list-contain m-5 bg-slate-900 text-slate-50 p-4">
          <h2>MONTH BEGINNING BALANCE: ${beginningMonthBalance}</h2>
          <CreateNewTransaction monthID={id} spendingTagNames={spendingTagNames}/>
    
            {dayObjects.map(day => (
              <div key={day.day} className="mt-2 p-3 bg-slate-800">
                <div className="flex justify-between">
                  <p>{day.date}</p>
                  <p>End Day Balance: ${day.endDayBalance}</p>
                </div>
                  {day.transactions.map(trans => (
                    <div key={trans.id} className="trans-contain m-2 p-2 bg-slate-700">
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
                      {trans.type === 'expense' &&
                        <TransactionSpendingTags
                          spendingTagInstances={spendingTagInstances}
                          transactionID={trans.id}
                          selectedMonth={selectedMonth}
                          spendingTagNames={spendingTagNames}
                        />
                      }
                    </div>
                    ))}
                </div>
            ))} 
        </div>
      );
};




