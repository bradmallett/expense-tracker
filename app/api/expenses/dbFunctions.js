import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

const client = DynamoDBDocument.from(new DynamoDB({}));

export const putExpense = async ({expenseAmount, expenseName, selectedCategory}) => {

    try {
        // Create the item to be put into the table
        const item = {
            ExpenseID: uuid(),
            ExpenseAmount: expenseAmount,
            ExpenseCategory: selectedCategory,
            ExpenseName: expenseName
        };

        // Define the parameters for the put operation
        const params = {
            TableName: "Expenses",
            Item: item
        };

        // Put the item into the table using the document client
        const result = await client.put(params);
        console.log('------ITEM SENT TO DB-------')
        return result;
        
    } catch (error) {
        console.error("------ERROR ADDING EXPENSE TO DB----: ", error);
    }
}