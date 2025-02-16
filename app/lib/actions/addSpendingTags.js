"use server";

import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);


export default async function addSpendingTags(spendingTags, transactionID) {
    for(const tag of spendingTags) {
        let spendingTagNameID = tag.tagID;

        if(spendingTagNameID === null) {
            try {
                const [ newSpendingTagNameID ] = await sql `
                    INSERT INTO spending_tag_names
                        (name)
                    VALUES(${tag.tagName})
                    RETURNING id;`
                ;

                spendingTagNameID = newSpendingTagNameID.id;
            } catch (error) {
                return {
                    message: 'Not able to add new spending tags'
                }
            }
        }

        try {
            await sql `
            INSERT INTO spending_tag_instances
                (transaction_id, spending_tag_name_id)
            VALUES(${transactionID}, ${spendingTagNameID});`
            ;
        } catch(error) {
            return {
                message: 'Not able to add new spending tags'
            }
        }
    }
}