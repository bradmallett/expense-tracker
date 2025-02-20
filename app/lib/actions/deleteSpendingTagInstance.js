"use server";

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL);


export default async function deleteSpendingTagInstance(tagID, selectedMonth) {
    const { year, month } = selectedMonth;

    try{
        await sql `DELETE FROM spending_tag_instances WHERE id = ${tagID};`;
        

    } catch(error) {
        console.error(error);
        throw new Error("Failed to delete spending tag instance");
    }

    redirect(`/?year=${year}&month=${month}`);
}