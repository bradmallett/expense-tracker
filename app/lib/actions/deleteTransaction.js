'use server'

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';


const sql = neon(process.env.DATABASE_URL);

export default async function deleteTransaction( transData ) {
    const {id, year, month, type, amount, monthID} = transData;
    const yearNumber = Number(year);
    const monthNumber = Number(month);

    try {
        await sql `DELETE FROM spending_tag_instances WHERE transaction_id = ${id};`;
        await sql `DELETE FROM transactions WHERE id = ${id};`;
        const transactionsForSelectedMonth = await sql`SELECT id FROM transactions WHERE month_id = ${monthID};`;

        if (transactionsForSelectedMonth.length === 0) {
            await sql`DELETE FROM months WHERE id = ${monthID};`;
        }

    } catch(error) {
        console.error('Error deleting transaction:', error);
        return {
            message: 'Unable to delete transaction, please try again.'
        }
    }

    await updateFutureMonthBalances(yearNumber, monthNumber, type, amount);
    redirect(`/?year=${year}&month=${month}`);

    async function updateFutureMonthBalances( currentSelectedYear, currentSelectedMonthNumber, type, amountInCents ) {
        let adjustment;

        if(type === 'expense') {
            adjustment = amountInCents;
        }

        if(type === 'income') {
            adjustment = -amountInCents;
        }

        try{
            // Perform bulk update for all future months in one query
            await sql`
               UPDATE months
               SET beginning_balance = beginning_balance + ${adjustment}
               WHERE (year > ${currentSelectedYear})
               OR (year = ${currentSelectedYear} AND number > ${currentSelectedMonthNumber});
           `;
        }
        catch(error) {
            console.error('Error in updateFutureMonthBalances:', error);
            return {
                message: 'Unable to update month balances, please try again.'
            }
        }

    };
}

