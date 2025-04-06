"use server";

import { neon } from "@neondatabase/serverless";


const sql = neon(process.env.DATABASE_URL);


export default async function seedSpendingTagNames() {
    const requiredTags = ["food", "home", "car", "restaurant"];

    try {
        const spendingTagNames = await sql`
        SELECT name FROM spending_tag_names
        WHERE name = ANY(${requiredTags}::text[])
    `;

        const tagsFromDB = spendingTagNames.map(tag => tag.name);
        const missingTags = requiredTags.filter(tag => !tagsFromDB.includes(tag));

        if(missingTags.length > 0) {
            for(const tag of missingTags) {
                await sql `
                    INSERT INTO spending_tag_names (name)
                    VALUES (${tag})
                    ;`
                ;
            }
        }
        
    } catch (error) {
        console.error("Error inserting spending tag names:", error);
        return {
            message: 'Unable to insert spending tag names',
        }
    }
}