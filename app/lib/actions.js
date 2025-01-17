"use server";
import { neon } from "@neondatabase/serverless";

export async function getMonthTransactions(monthYear, monthNumber) {
    const sql = neon(process.env.DATABASE_URL);

    try {
        const [ { beginning_balance } ] = await sql`
            SELECT
                months.beginning_balance
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

        return [ beginning_balance, transactions];

    } catch (error) {
        return {
            message: 'Database Error: Could not fetch transactions'
        }
    }

};











// month
//  beginning balance

// transctions
//   id
//   date 
//   amount
//   type
//   description 


