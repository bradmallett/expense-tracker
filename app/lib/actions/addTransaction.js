"use server";

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';
import addSpendingTags from "./addSpendingTags";


const sql = neon(process.env.DATABASE_URL);

export async function addTransaction( transactionData ) {
    const { monthID, description, amountInCents, transactionDate, selectedSpendingTags, transactionType, selectedCat  } = transactionData;
    const budgetCategory = selectedCat ===  '' ? null : selectedCat;
    const year = transactionDate.split('-')[0];
    const month = transactionDate.split('-')[1];
    const yearNumber = Number(year); // db needs integer
    const monthNumber = Number(month); // db needs integer
    let correctMonthID = monthID;

    // if no data exists for this month
    if (!monthID) {
        const beginningBalance = await calculateNewMonthBalance(yearNumber, monthNumber);
        const [newMonthRecord] = await sql`
            INSERT INTO months
                (number, year, beginning_balance)
            VALUES
                (${monthNumber}, ${yearNumber}, ${beginningBalance})
            RETURNING id;
        `;

         if(!newMonthRecord) throw new Error("Failed to create a new month record.")

         correctMonthID = newMonthRecord.id;
    }

    const {id: newTransactionID} = await insertTransaction(correctMonthID, transactionDate, amountInCents, transactionType, description, budgetCategory);
    await updateFutureMonthBalances(yearNumber, monthNumber, transactionType, amountInCents);


    if (selectedSpendingTags.length > 0) {
        await addSpendingTags(selectedSpendingTags, newTransactionID, null);
    }

    redirect(`/?year=${year}&month=${month}`);

    


    // calculate new month's balance using most recent previous month's data
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

        // no previous month data exists so return newMonthBalance as $0
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



    async function updateFutureMonthBalances( currentSelectedYear, currentSelectedMonth, type, amount ) {
        let adjustment;

        if(type === 'expense') {
            adjustment = -amount;
        }

        if(type === 'income') {
            adjustment = amount;
        }

        // Perform bulk update for all future months in one query
         await sql`
            UPDATE months
            SET beginning_balance = beginning_balance + ${adjustment}
            WHERE (year > ${currentSelectedYear})
            OR (year = ${currentSelectedYear} AND number > ${currentSelectedMonth})
            RETURNING id, beginning_balance, year, number;`
        ;
    };



    async function insertTransaction(id, date, amount, type, descript, category) {
        const [ transID ] = await sql`
            INSERT INTO transactions
                (date, month_id, amount, type, description, budget_category)
            VALUES 
                (${date}, ${id}, ${amount}, ${type}, ${descript}, ${category})
            RETURNING id;`
        ;

        return transID;
    }




}