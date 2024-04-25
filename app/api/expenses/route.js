import { NextResponse } from "next/server";
import { putExpense } from "./expenseRepository";

export async function POST(request) {
    const myRequest = await request.json();
  
    // Calling our DB interactor function
    const myResponse = await putExpense(myRequest);
    console.log('RESPONSE FROM DYNAMO: ', myResponse);
    
    // Return an appropriate response (e.g., send back a JSON response)
    return NextResponse.json('Expense added to Database');
  }

  