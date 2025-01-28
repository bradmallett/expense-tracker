"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function getMonthTransactions(monthYear, monthNumber) {

    if( monthYear && monthNumber ) {
        const [ month ] = await sql`
            SELECT
                months.id,
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
                transactions.date ASC;
            `;

        return { month, transactions };
    }
};