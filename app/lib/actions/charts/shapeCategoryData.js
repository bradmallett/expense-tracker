
export default function shapeCategoryData(monthTransactionsData) {

    if (!monthTransactionsData || !monthTransactionsData.transactions) {
        console.log('###monthTransactionsData undefined or incomplete data, returning empty array###');
        return []; // Return an empty array or some default data
    }

    if(monthTransactionsData.transactions.length > 0) {
        let totalIncome = 0;
        let totalFundamental = 0;
        let totalFun = 0;
        let totalFuture = 0;

        
        for(const transaction of monthTransactionsData.transactions) {
            console.log('###TRANSACTIONS EXIST!!!###');

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
        console.log('###SHAPED DATA###', data);
        return data;
    }
    else {
        return [];
    }
}