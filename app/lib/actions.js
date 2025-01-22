"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function getMonthTransactions(monthYear, monthNumber) {

    try {
        const [ { beginning_balance, id } ] = await sql`
            SELECT
                months.beginning_balance,
                months.id
            FROM
                months
            WHERE 
                months.year = ${monthYear} 
            AND 
                months.number = ${monthNumber};
         `;

        const transactions = await sql`
            SELECT 
                transactions.id,
                transactions.date,
                transactions.amount,
                transactions.type,
                transactions.description
            FROM 
                months
            JOIN 
                transactions
            ON 
                months.id = transactions.month_id
            WHERE 
                months.year = ${monthYear} 
            AND 
                months.number = ${monthNumber}
            ORDER BY 
                transactions.date ASC;;
            `;

        return { monthID: id, beginning_balance, transactions };

    } catch (error) {
        return {
            message: 'Database Error: Could not fetch transactions'
        }
    }

};


export async function addTransaction(formData) {
    console.log(formData);
    // use month and year to find month_id from months table
    // if no month exists, create a new month record
    // grab month_id from months.id to insert into transactions table
    // create new transaction
    // revalidate path
}






