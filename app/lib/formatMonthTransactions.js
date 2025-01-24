import { updateDayBalance, centsToDollars} from './utils';

export default function formatMonthTransactions( monthTransactions ) {


        const { month: { monthID, beginning_balance}, transactions } = monthTransactions;

        let currentBalance = Number(beginning_balance);
        let dayObjects = [];
        let currentDay = dayObjects[dayObjects.length -1]?.day;
        const beginningMonthBalance = beginning_balance / 100;

        for (const trans of transactions) {
            // figure out day of transaction
            const transDay = new Date(trans.date).toDateString().split(' ')[2];
            const transAmount = Number(trans.amount);

            // if transaction day belongs to most recent day object
            if (transDay === currentDay) {
                currentBalance = updateDayBalance(trans.type, currentBalance, transAmount);
                const endDayBalanceString = centsToDollars(currentBalance);
                const currentDayIndex = dayObjects.length -1;

                // Create new transaction object
                const newTransactionObject = {
                    id: trans.id,
                    description: trans.description,
                    type: trans.type,
                    amount: centsToDollars(transAmount)
                }

                // Add new transaction object to day object, update endDayBalance
                dayObjects[currentDayIndex].endDayBalance = endDayBalanceString;
                dayObjects[currentDayIndex].transactions.push(newTransactionObject);
            }

            // If transaction day does not belong to most recent day object
            else {
                currentDay = transDay;
                currentBalance = updateDayBalance(trans.type, currentBalance, transAmount);
                const endDayBalanceString = centsToDollars(currentBalance);

                // create new day object and add to dayObjects array
                const newDayObject = {
                    day: transDay,
                    date: trans.date.toDateString(),
                    endDayBalance: endDayBalanceString,
                    transactions: [
                        {
                            id: trans.id,
                            description: trans.description,
                            type: trans.type,
                            amount: centsToDollars(transAmount)
                        }
                    ]
                }

                dayObjects.push(newDayObject);
            }
        }

        return { monthID, beginningMonthBalance, dayObjects };

}
