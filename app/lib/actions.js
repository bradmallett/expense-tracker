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
    const budgetCategory = formData.get('budgetCategory') === "" ? null : formData.get('budgetCategory');
    const year = Number(transactionDate.split('-')[0]);
    const monthNumber = Number(transactionDate.split('-')[1]);

    if (!monthID) {
        const beginningBalance = await calculateNewMonthBalance();

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

     await insertTransaction(monthID, {transactionDate, amount, transactionType, description, budgetCategory});

    async function insertTransaction(id, transactionData) {
        const {transactionDate, amount, transactionType, description, budgetCategory} = transactionData;

        await sql`
            INSERT INTO transactions
                (date, month_id, amount, type, description, budget_category)
            VALUES 
                (${transactionDate}, ${id}, ${amount}, ${transactionType}, ${description}, ${budgetCategory});
        `;
        
    }





    async function calculateNewMonthBalance() {
        // find most recent month record based on year and monthNumber
        const [ mostRecentMonth ] = await sql`
            SELECT id, beginning_balance
            FROM months
            ORDER BY year DESC, number DESC
            LIMIT 1;
        `;
        
        if (!mostRecentMonth) {
            throw new Error("No previous month records found. Cannot calculate beginning balance.");
        }

        const {id: mostRecentMonthID, beginning_balance: mostRecentMonthBegBalance } = mostRecentMonth;

        const mostRecentTransactions = await sql `
            SELECT amount, type
            FROM transactions
            WHERE month_id = ${mostRecentMonthID};
        `;

        let newMonthBalance = mostRecentMonthBegBalance;

        for (const trans of mostRecentTransactions) {
            if(trans.type === "expense") {
                console.log("Before Transaction: ", newMonthBalance)
                console.log("Transaction Amount: ", trans.amount)

                newMonthBalance = newMonthBalance - trans.amount;
                console.log("After Transaction: ", newMonthBalance)
            }

            if(trans.type === "income") {
                console.log("Before Transaction: ", newMonthBalance)
                console.log("Transaction Amount: ", trans.amount)

                newMonthBalance = newMonthBalance + trans.amount;
                console.log("After Transaction: ", newMonthBalance)
            }
        }

        return newMonthBalance;
    }

}


// feb end balance: $1730.21






