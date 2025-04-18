"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function getMonthTransactions( searchParams ) {
    const monthYear = searchParams?.year;
    const monthNumber = searchParams?.month;
    
    if( monthYear && monthNumber ) {
        try{
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
                    transactions.description,
                    transactions.budget_category
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
        catch (error) {
            console.error(error);
            throw new Error("Failed to fetch month transactions");
        }
    }
};