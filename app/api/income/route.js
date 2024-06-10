import { NextResponse } from "next/server";
import { putIncome } from "../../repositories/transactionsRepository";

export async function POST(request) {
    const myRequest = await request.json();
  
    // Calling our DB interactor function
    const myResponse = await putIncome(myRequest);
    
    // Return an appropriate response (e.g., send back a JSON response)
    return NextResponse.json('Income added to Database');
  }