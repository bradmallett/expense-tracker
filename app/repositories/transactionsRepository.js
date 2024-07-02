import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const client = DynamoDBDocument.from(new DynamoDB({}));

export const getMonthTransactions = async (yearMonth) => {
    try {
        const params = {
            TableName: "Transactions",
            KeyConditionExpression: "#ym = :ymValue",
            ExpressionAttributeNames: {
                "#ym": "YearMonth"
            },
            ExpressionAttributeValues: {
                ":ymValue": yearMonth
            }
        };
        const result = await client.query(params);

        return result;
    } catch (error) {
        console.error("------ERROR ADDING TRANSACTION TO DB----: ", error);
    }
}


export const putExpense = async ({yearMonth, amountValue, category, isoString, expenseName, tag}) => {

    try {
        // Create the item to be put into the table
        const ExpenseItem = {
            YearMonth: yearMonth,
            TransactionID: uuid(),
            Amount: amountValue,
            Category: category,
            Date: isoString,
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


export const putIncome = async ({yearMonth, amountValue, isoString, incomeName}) => {
    try {
        // Create the item to be put into the table
        const incomeItem = {
            YearMonth: yearMonth,
            TransactionID: uuid(),
            Amount: amountValue,
            Date: isoString,
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