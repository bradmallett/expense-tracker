"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function getTransaction(id) {

    try {
        const transaction = await sql`
            SELECT 
                id,
                date,
                amount,
                type,
                description,
                budget_category
            FROM 
                transactions
            WHERE 
                id = ${id} 
            `;

        return transaction;
    }
    catch (error) {
        throw new Error('Failed to fetch transaction.')
    }
};