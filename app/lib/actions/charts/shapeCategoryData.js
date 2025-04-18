


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
                console.log("totalFundamental: ", totalFundamental)
                console.log('!fundamental: ', transaction.amount + 'added!')
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
            target: Math.ceil(totalIncome * .5),
            actual: totalFundamental,
        },
        {
            name: 'FUN',
            target: Math.ceil(totalIncome * .3),
            actual: totalFun,
        },
        {
            name: 'FUTURE',
            target: Math.ceil(totalIncome * .2),
            actual: totalFuture,
        }
    ];
    console.log(data)

    return data;
}