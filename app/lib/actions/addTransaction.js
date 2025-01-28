"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function addTransaction(monthID, formData) {
    const transactionDate = formData.get('date');
    const transactionType = formData.get('transactionType');
    const description = formData.get('description');
    const amount = Math.round(Number(formData.get('amount')) * 100); // db needs integer
    const budgetCategory = formData.get('budgetCategory') === "" ? null : formData.get('budgetCategory');
    const year = Number(transactionDate.split('-')[0]); // db needs integer
    const monthNumber = Number(transactionDate.split('-')[1]); // db needs integer

    if (!monthID) {
        const beginningBalance = await calculateNewMonthBalance(year, monthNumber);

        const [newMonthRecord] = await sql`
            INSERT INTO months
                (number, year, beginning_balance)
            VALUES
                (${monthNumber}, ${year}, ${beginningBalance})
            RETURNING id;
        `;

         if(!newMonthRecord) {
             throw new Error("Failed to create a new month record.")
         }

         monthID = newMonthRecord.id;
    }

    await insertTransaction(monthID, {transactionDate, amount, transactionType, description, budgetCategory});
    await updateFutureMonthBalances(year, monthNumber, transactionType, amount);
    





    async function updateFutureMonthBalances(currentSelectedYear, currentSelectedMonthNumber, type, amount ) {
        // determine adjustment based on transaction type
        const adjustment = type === "expense" ? -amount : amount;

        // Perform bulk update for all future months in one query
        const updatedRows = await sql`
            UPDATE months
            SET beginning_balance = beginning_balance + ${adjustment}
            WHERE (year > ${currentSelectedYear})
            OR (year = ${currentSelectedYear} AND number > ${currentSelectedMonthNumber})
            RETURNING id, beginning_balance, year, number;
        `;

        console.log("UPDATED FUTURE MONTH BEG BALANCES: ", updatedRows);

        // const futureMonthRecords = await sql`
        //     SELECT id, beginning_balance, year, number
        //     FROM months
        //     WHERE (year > ${currentSelectedYear})
        //         OR (year = ${currentSelectedYear} AND number > ${currentSelectedMonthNumber});
        // `;
        
        // if(futureMonthRecords.length > 0) {
        //     for (const monthRecord of futureMonthRecords) {
        //         let newBeginningMonthBalance = monthRecord.beginning_balance;

        //         if( type === "expense") {
        //             newBeginningMonthBalance -= amount;
        //         }
        //         if( type === "income") {
        //             newBeginningMonthBalance += amount;
        //         }

        //         await sql`
        //         UPDATE months
        //         SET beginning_balance = ${newBeginningMonthBalance}
        //         WHERE id = ${monthRecord.id};
        //     `; 

        //     };
        // }


    };






    async function insertTransaction(id, transactionData) {
        const {transactionDate, amount, transactionType, description, budgetCategory} = transactionData;

        await sql`
            INSERT INTO transactions
                (date, month_id, amount, type, description, budget_category)
            VALUES 
                (${transactionDate}, ${id}, ${amount}, ${transactionType}, ${description}, ${budgetCategory});
        `;
    }



    async function calculateNewMonthBalance(currentSelectedYear, currentSelectedMonth) {
        let newMonthBalance = 0;

        // find most recent month record that's no later than the current month selected
        const [ mostRecentPrevMonth ] = await sql`
        SELECT id, beginning_balance
        FROM months
        WHERE (year < ${currentSelectedYear})
           OR (year = ${currentSelectedYear} AND number < ${currentSelectedMonth})
        ORDER BY year DESC, number DESC
        LIMIT 1;
        `;
        
        if (!mostRecentPrevMonth) {
            return newMonthBalance;
        }

        const {id: mostRecentPrevMonthID, beginning_balance: mostRecentPrevMonthBegBalance } = mostRecentPrevMonth;

        // find all transactions that belong to the most recent previous month of selected month
        const mostRecentPrevMonthTransactions = await sql `
            SELECT amount, type
            FROM transactions
            WHERE month_id = ${mostRecentPrevMonthID};
        `;

        // calculate new month balance based upon previous month's transactions
        newMonthBalance = mostRecentPrevMonthBegBalance;

        for (const trans of mostRecentPrevMonthTransactions) {
            if(trans.type === "expense") {
                newMonthBalance -= trans.amount;
            }

            if(trans.type === "income") {
                newMonthBalance += trans.amount;
            }
        }

        return newMonthBalance;
    }
}