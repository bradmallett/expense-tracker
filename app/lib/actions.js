"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function getMonthTransactions(monthYear, monthNumber) {

    if( monthYear && monthNumber ) {
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
                transactions.description
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

};




    
    // if no month exists, create a new month record
    // grab month_id from months.id to insert into transactions table
    // create new transaction
    // revalidate path
export async function addTransaction(monthData, formData) {
    if(!monthData || !formData) {
        return 'Please fill out all form fields.';
    }

    const { monthID, year, month } = monthData;

    // monthID : months table needs integer
    // year: months table needs integer
    // month: months table needs integer
    const transactionDate = formData.get('date');
    const transactionType = formData.get('transactionType');
    const description = formData.get('description');
    const amount = Math.round(Number(formData.get('amount')) * 100); // db needs integer
    const budgetCategory = formData.get('budgetCategory');
    
    try {
        await sql`
            INSERT INTO transactions
                (date, month_id, amount, type, description, budget_category)
            VALUES (${transactionDate}, ${monthID}, ${amount}, ${transactionType}, ${description}, ${budgetCategory});
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Transaction'
        }
    }

    // console.log("Date: ", transactionDate, "type: ", typeof transactionDate);
    // console.log("transactionType: ", transactionType, "type: ", typeof transactionType)
    // console.log("description: ", description, "type: ", typeof description)
    // console.log("amount: ", amount, "type: ", typeof amount)
    // console.log("budgetCategory: ", budgetCategory, "type: ", typeof budgetCategory)
    // console.log("monthIDNumber: ", monthID, "type: ", typeof monthID)
    // console.log("year: ", year, "type: ", typeof year)
    // console.log("month: ", month, "type: ", typeof month)

// ===FROM CLIENT
// Date:  2025-01-23 type:  string
// transactionType:  expense type:  string
// description:  bought a pumpkin type:  string
// amount:  528.18 type:  string
// budgetCategory:  fun type:  string
// monthID:  2 type:  number
// year:  2025 type:  string
// month:  01 type:  string




    

}






