import { NextResponse } from 'next/server';
import { sendUpdateToClients } from '../route';

export async function POST() {
  try {
    // Send update to all connected clients
    sendUpdateToClients();
    
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error notifying clients:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to notify clients' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Export the POST method
export { POST };

// This is needed to prevent Next.js from buffering the response
export const dynamic = 'force-dynamic';
