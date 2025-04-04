'use server'

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';


const sql = neon(process.env.DATABASE_URL);

export default async function deleteTransaction( transData ) {
    const {id, year, month, type, amount} = transData;
    const yearNumber = Number(year);
    const monthNumber = Number(month);
 // db needs integer

    console.log('!!entering deleteTransaction');

    try {
        await sql `DELETE FROM spending_tag_instances WHERE transaction_id = ${id};`;
        await sql `DELETE FROM transactions WHERE id = ${id};`;
        
        console.log(`deleted transaction with id ${id}`);
    } catch(error) {
        console.error('Error deleting transaction:', error);
        return {
            message: 'Unable to delete transaction, please try again.'
        }
    }

    await updateFutureMonthBalances(yearNumber, monthNumber, type, amount);
    console.log(`redirecting to /?year=${year}&month=${month}`);
    redirect(`/?year=${year}&month=${month}`);

    async function updateFutureMonthBalances( currentSelectedYear, currentSelectedMonthNumber, type, amountInCents ) {
        let adjustment;
        console.log('!!entering updateFutureMonthBalances');
        console.log('currentSelectedYear:', currentSelectedYear, typeof currentSelectedYear);
        console.log('currentSelectedMonthNumber:', currentSelectedMonthNumber, typeof currentSelectedMonthNumber);
        console.log('type:', type, typeof type);
        console.log('amountInCents:', amountInCents, typeof amountInCents);
        console.log('amount:', amount, typeof amount);

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
   
           console.log(`updated future month balances for year ${currentSelectedYear} and month ${currentSelectedMonthNumber} with the ${adjustment} adjustment`); 
        }
        catch(error) {
            console.error('Error in updateFutureMonthBalances:', error);
            return {
                message: 'Unable to update month balances, please try again.'
            }
        }

    };
}

