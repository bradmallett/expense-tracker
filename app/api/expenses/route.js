import { NextRequest, NextResponse } from 'next/server';



export async function POST(request) {
    // Get the request body as a JSON object
    const body = await request.json();
  
    // Now you can work with the data in the body
    console.log('Received data:', body);
  
    // Return an appropriate response (e.g., send back a JSON response)
    return NextResponse.json({ message: 'Request received successfully' });
  }