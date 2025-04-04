import { updateDayBalance } from './utils';

export default function buildDayObjects( beginning_balance, transactions ) {
        let currentBalance = beginning_balance;
        let dayObjects = [];
        let currentDay = dayObjects[dayObjects.length -1]?.day;

        for (const trans of transactions) {
            // figure out day of transaction
            const transDay = new Date(trans.date).toDateString().split(' ')[2];
            const transAmount = trans.amount;

            // if transaction day belongs to most recent day object
            if (transDay === currentDay) {

                currentBalance = updateDayBalance(trans.type, currentBalance, transAmount);
                const endDayBalance = currentBalance;
                const currentDayIndex = dayObjects.length -1;

                // Create new transaction object
                const newTransactionObject = {
                    id: trans.id,
                    description: trans.description,
                    type: trans.type,
                    amount: transAmount,
                    date: trans.date,
                    budgetCategory: trans.budget_category
                }

                // Add new transaction object to day object, update endDayBalance
                dayObjects[currentDayIndex].endDayBalance = endDayBalance;
                dayObjects[currentDayIndex].transactions.push(newTransactionObject);
            }




            // If transaction day does not belong to most recent day object
            else {
                currentDay = transDay;
                currentBalance = updateDayBalance(trans.type, currentBalance, transAmount);
                const endDayBalance = currentBalance;

                // create new day object and add to dayObjects array
                const newDayObject = {
                    day: transDay,
                    date: trans.date.toDateString(),
                    endDayBalance: endDayBalance,
                    transactions: [
                        {
                            id: trans.id,
                            description: trans.description,
                            type: trans.type,
                            amount: transAmount,
                            date: trans.date,
                            budgetCategory: trans.budget_category
                        }
                    ]
                }

                dayObjects.push(newDayObject);
            }
        }
        
        dayObjects.reverse();

        return { dayObjects };

}
