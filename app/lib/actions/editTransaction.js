"use server";

import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation';


const sql = neon(process.env.DATABASE_URL);

export async function editTransaction(transactionData) {
    const { monthID, description, amountInCents, prevTransAmountInCents, transactionDate, transactionType, selectedCat } = transactionData;
    const budgetCategory = selectedCat === "" ? null : selectedCat;
    const year = transactionDate.getFullYear(); // db needs integer
    const monthNumber = transactionDate.getMonth() + 1; // db needs integer
    const yearString = year.toString();
    const monthString = monthNumber.toString().padStart(2, '0');


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
    redirect(`/?year=${yearString}&month=${monthString}`);
    


    async function updateFutureMonthBalances( currentSelectedYear, currentSelectedMonthNumber, type, newAmount ) {
        let adjustment;

        if (newAmount === prevTransAmountInCents) {
            return;
        }

        if(type === "expense") {
            adjustment = prevTransAmountInCents - newAmount;
            console.log(`Expense: Adding ${adjustment} to future balances`);
        }

        if(type === "income") {
            adjustment = newAmount - prevTransAmountInCents;
            console.log(`Income: Adding ${adjustment} to future balances`);
        }


        // Perform bulk update for all future months
        try {
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
