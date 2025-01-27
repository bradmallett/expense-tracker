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





export async function addTransaction(monthID, formData) {
    const transactionDate = formData.get('date');
    const transactionType = formData.get('transactionType');
    const description = formData.get('description');
    const amount = Math.round(Number(formData.get('amount')) * 100); // db needs integer
    const budgetCategory = formData.get('budgetCategory');
    const year = Number(transactionDate.split('-')[0]);
    const monthNumber = Number(transactionDate.split('-')[1]);

    //hard coding this in for now:
    // will need to calculate this value
    const beginningBalance = 300000;

    if (!monthID) {
            const [newMonthrecord] = await sql`
                INSERT INTO months
                    (number, year, beginning_balance)
                VALUES
                    (${monthNumber}, ${year}, ${beginningBalance})
                RETURNING id;
            `;

            if(!newMonthrecord) {
                throw new Error("Failed to create a new month record.")
            }

            monthID = newMonthrecord.id;
    }


   async function insertTransaction(id, transactionData) {
        const {transactionDate, amount, transactionType, description, budgetCategory} = transactionData;

        await sql`
            INSERT INTO transactions
                (date, month_id, amount, type, description, budget_category)
            VALUES 
                (${transactionDate}, ${id}, ${amount}, ${transactionType}, ${description}, ${budgetCategory});
        `;
        
    }

    await insertTransaction(monthID, {transactionDate, amount, transactionType, description, budgetCategory})



}






