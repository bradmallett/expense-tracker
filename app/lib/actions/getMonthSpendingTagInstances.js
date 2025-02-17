"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function getMonthSpendingTagInstances(transactions) {
    if(!transactions || transactions.length === 0) return [];

    const transactionIDs = transactions.map(t => t.id);

    try {
        const spendingTagInstances = await sql `
            SELECT sti.transaction_id, stn.name AS tag_name, sti.id AS tag_id
            FROM spending_tag_instances sti
            JOIN spending_tag_names stn
            ON sti.spending_tag_name_id = stn.id
            WHERE sti.transaction_id = ANY(${transactionIDs})
        ;`;

        return spendingTagInstances;
    } catch (error) {
        throw new Error("Failed to fetch spending tag instances")
    }
 
}