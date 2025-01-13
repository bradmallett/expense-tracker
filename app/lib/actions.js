"use server";
import { neon } from "@neondatabase/serverless";

export async function getTransactions() {
    const sql = neon(process.env.DATABASE_URL);

    try {
        const transactions = await sql`SELECT * FROM transactions;`;
        console.log("---DB WAS CALLED---", transactions);
        return transactions;

    } catch (error) {
        return {
            message: 'Database Error: Could not fetch transactions'
        }
    }

}









// TABLES

// spending_tag_names
    // id
    // name - unique


// spending_tag_instances
    // id
    // transaction_id = foreign key references transactions(id)
    // spending_tag_id = foreign key references spending_tags(id) 
    // unique transaction_id and spending_tag_id composite constraint


// months
    // id
    // number
    // year
    // beginning_balance


// transactions
    // id
    // date
    // month_id = foreign key references month(id)
    // amount
    // type expense, income, savings
    // description
    // budget_cat fun, fundamental, future



// transactions.type = 
    // expense
    // income
    // savings
    // new balance?


