import formatMonthTransactions from "../lib/formatMonthTransactions";
import DeleteTransaction from "./DeleteTransaction";
import CreateNewTransaction from "./CreateNewTransaction";
import Edit from "./Edit";
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
        <div className="trans-list-contain mt-5 m-auto p-4 min-w-full">
          <h2>MONTH BEGINNING BALANCE: ${beginningMonthBalance}</h2>
          <CreateNewTransaction monthID={id} spendingTagNames={spendingTagNames}/>
    
            {dayObjects.map(day => (
              <div key={day.day} className="mt-2 p-3 bg-slate-900">
                <div className="text-slate-400 text-sm flex justify-between">
                  <p>{day.date}</p>
                  <p>End Day Balance: ${day.endDayBalance}</p>
                </div>


                  {day.transactions.map(trans => (
                    <div key={trans.id} className="m-2 p-2 bg-slate-800 border-l-2 border-orange-600">


                      <div className="flex justify-between">
                        <p className="self-start">{trans.type}</p>
                        <div className="flex justify-end">
                          <Edit
                            transaction={trans}
                          />
                          <DeleteTransaction
                            transData={{
                              id: trans.id,
                              year: selectedMonth.year,
                              month: selectedMonth.month,
                              type: trans.type,
                              amount: trans.amount,
                              description: trans.description
                            }} 
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-3">
                        <p>{trans.description}</p>
                        <p>{trans.type === "expense" && '-'}${trans.amount}</p>
                      </div> 


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




