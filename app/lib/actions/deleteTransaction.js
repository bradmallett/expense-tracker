'use server'

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';


const sql = neon(process.env.DATABASE_URL);

export default async function deleteTransaction( transData ) {
    const {id, year, month, type, amount} = transData;
    const yearNumber = Number(year);
    const monthNumber = Number(month);
    const transAmount = Math.round(Number(amount) * 100); // db needs integer

    try {
        await sql `DELETE FROM transactions WHERE id = ${id};`;
        await updateFutureMonthBalances(yearNumber, monthNumber, type, transAmount);
    } catch(error) {
        return {
            message: 'Unable to delete transaction, please try again.'
        }
    }

    redirect(`/?year=${year}&month=${month}`);

    async function updateFutureMonthBalances( currentSelectedYear, currentSelectedMonthNumber, type, amount ) {
        let adjustment;

        if(type === 'expense') {
            adjustment = amount;
        }

        if(type === 'income') {
            adjustment = -amount;
        }

        // Perform bulk update for all future months in one query
         await sql`
            UPDATE months
            SET beginning_balance = beginning_balance + ${adjustment}
            WHERE (year > ${currentSelectedYear})
            OR (year = ${currentSelectedYear} AND number > ${currentSelectedMonthNumber});
        `;
    };

}

