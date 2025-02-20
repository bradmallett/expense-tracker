"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function getSpendingTagNames(year, month) {

    try {
        const spendingTagNames = await sql `SELECT * FROM spending_tag_names `;

        return spendingTagNames;
    } catch (error) {
        return {
            message: 'Could not fetch spending tag names'
        }
    }


};