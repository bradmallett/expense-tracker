"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function editTransaction({monthID, transactionDate, prevTransactionAmount}, formData) {
    const transactionType = formData.get('transactionType');
    const description = formData.get('description');
    const amountInCents = Math.round(Number(formData.get('amount')) * 100); // db needs integer
    const budgetCategory = formData.get('budgetCategory') === "" ? null : formData.get('budgetCategory');
    const year = new Date(transactionDate).getFullYear(); // db needs integer
    const monthNumber = new Date(transactionDate).getMonth() + 1; // db needs integer


    try {
        await sql`
            UPDATE transactions
            SET amount = ${amountInCents}, type = ${transactionType}, description = ${description}, budget_category = ${budgetCategory}
            WHERE id = ${monthID};
        `;
    } catch (error) {
        return {
            message: `Could not update the transaction.`
        }
    }

    await updateFutureMonthBalances(year, monthNumber, transactionType, amountInCents);
    



    async function updateFutureMonthBalances( currentSelectedYear, currentSelectedMonthNumber, type, newAmount ) {
        let adjustment;

        if (newAmount === prevTransactionAmount) {
            return;
        }

        if(type === "expense") {
            adjustment = prevTransactionAmount - newAmount;
            console.log(`Expense: Adding ${adjustment} to future balances`);
        }

        if(type === "income") {
            adjustment = newAmount - prevTransactionAmount;
            console.log(`Income: Adding ${adjustment} to future balances`);
        }


        // Perform bulk update for all future months
        try{
            await sql`
                UPDATE months
                SET beginning_balance = beginning_balance + ${adjustment}
                WHERE (year > ${currentSelectedYear})
                OR (year = ${currentSelectedYear} AND number > ${currentSelectedMonthNumber});
            `;
        } catch (error) {
            return {
                message: 'Could not update future month balances'
            }
        }
    };

}