import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const client = DynamoDBDocument.from(new DynamoDB({}));


export const getTransactions = async () => {
    try {
        const params = {
            TableName: "Transactions"
        };
        const result = await client.scan(params);

        return result;
    } catch (error) {
        console.error("------ERROR ADDING EXPENSE TO DB----: ", error);
    }
}


export const putExpense = async ({yearMonth, amount, category, date, expenseName, tag}) => {

    try {
        // Create the item to be put into the table
        const ExpenseItem = {
            YearMonth: yearMonth,
            TransactionID: uuid(),
            Amount: amount,
            Category: category,
            Date: date,
            Name: expenseName,
            Tag: tag,
            Type: "Expense"
        };

        // Define the parameters for the put operation
        const params = {
            TableName: "Transactions",
            Item: ExpenseItem
        };

        // Put the item into the table using the document client
        const result = await client.put(params);

        return result;
    } catch (error) {
        console.error("------ERROR ADDING EXPENSE TO DB----: ", error);
    }
}


export const putIncome = async ({yearMonth, amount, date, incomeName}) => {
    try {
        // Create the item to be put into the table
        const incomeItem = {
            YearMonth: yearMonth,
            TransactionID: uuid(),
            Amount: amount,
            Date: date,
            Name: incomeName,
            Type: "Income"
        };

        // Define the parameters for the put operation
        const params = {
            TableName: "Transactions",
            Item: incomeItem
        };

        // Put the item into the table using the document client
        const result = await client.put(params);

        return result;
    } catch (error) {
        console.error("------ERROR ADDING EXPENSE TO DB----: ", error);
    }
}