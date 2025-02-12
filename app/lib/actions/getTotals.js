"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function getTotals(year, month) {

    try {
        const data = await sql `
            SELECT 
                type,
                SUM(amount) FILTER (WHERE EXTRACT(YEAR FROM date) = ${year}) AS year_total,
                SUM(amount) FILTER (WHERE EXTRACT(YEAR FROM date) = ${year} AND EXTRACT(MONTH FROM date) = ${month}) AS month_total
            FROM TRANSACTIONS
            WHERE EXTRACT(YEAR FROM date) = ${year}
            GROUP BY type;
            `;

        return data;
    } catch (error) {
        return {
            message: 'Could not fetch totals'
        }
    }


};