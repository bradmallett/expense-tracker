
import { formatCentsToDollars } from "../../utils";

export default function shapeCategoryData(monthTransactionsData) {
    let totalIncome = 0;
    let totalFundamental = 0;
    let totalFun = 0;
    let totalFuture = 0;

    for(const transaction of monthTransactionsData.transactions) {
        if(transaction.type === 'income') {
            totalIncome += transaction.amount;
        }

        if(transaction.type === 'expense') {
            if(transaction.budget_category === 'fundamental') {
                totalFundamental += transaction.amount;
            }
            if(transaction.budget_category === 'fun') {
                totalFun += transaction.amount;
            }
            if(transaction.budget_category === 'future') {
                totalFuture += transaction.amount;
            }
        }

        if(transaction.type === 'savings') {
            totalFuture += transaction.amount;
        }
    }

    const data = [
        {
            name: 'FUNDAMENTAL',
            target: 50,
            actual: Number(((totalFundamental / totalIncome) * 100).toFixed(1)),
        },
        {
            name: 'FUN',
            target: 30,
            actual: Number(((totalFun / totalIncome) * 100).toFixed(1)),
        },
        {
            name: 'FUTURE',
            target: 20,
            actual: Number(((totalFuture / totalIncome) * 100).toFixed(1)),
        }
    ];

    return data;
}