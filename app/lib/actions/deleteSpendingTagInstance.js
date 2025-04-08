"use server";

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL);


export default async function deleteSpendingTagInstance(tagID, selectedMonth) {
    const { year, month } = selectedMonth;

    try {
        const [ tagNameID ] = await sql `
            DELETE FROM spending_tag_instances 
            WHERE id = ${tagID}
            RETURNING spending_tag_name_id
            ;`;

        const { spending_tag_name_id } = tagNameID;

        const instances = await sql `
            SELECT id FROM spending_tag_instances 
            WHERE spending_tag_name_id = ${spending_tag_name_id}
            ;`;

        const [ spendingTagName ] = await sql `
            SELECT name FROM spending_tag_names 
            WHERE id = ${spending_tag_name_id}
            ;`;
        const { name } = spendingTagName;

        if(instances.length === 0) {
            if(name !== 'food' && name !== 'home' && name !== 'car' && name !== 'restaurant') {
                await sql `
                    DELETE FROM spending_tag_names
                    WHERE id = ${spending_tag_name_id}
                ;`;
            }
        }
    } catch(error) {
        console.error(error);
        throw new Error("Failed to delete spending tag instance");
    }

    redirect(`/?year=${year}&month=${month}`);
}