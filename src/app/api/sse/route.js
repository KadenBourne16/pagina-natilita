import { NextResponse } from 'next/server';

// Store all active connections
const clients = new Set();

// Function to send updates to all connected clients
export function sendUpdateToClients() {
  const data = JSON.stringify({ type: 'update' });
  for (const client of clients) {
    client.write(`data: ${data}\n\n`);
  }
}

export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  let isClosed = false; // 👈 track closed state

  const client = {
    write: (chunk) => {
      if (!isClosed) {
        writer.write(encoder.encode(chunk)).catch(() => {});
      }
    },
    close: () => {
      if (!isClosed) {
        isClosed = true;
        writer.close().catch(() => {});
      }
    }
  };

  // Add client
  clients.add(client);

  // Send initial message
  client.write('data: ' + JSON.stringify({ type: 'connected' }) + '\n\n');

  // Heartbeat
  const heartbeat = setInterval(() => {
    client.write(':\n\n'); // SSE comment
  }, 30000);

  // Clean up
  const cleanup = () => {
    clearInterval(heartbeat);
    clients.delete(client);
    client.close();
  };

  // When the stream closes
  writer.closed.then(cleanup).catch(cleanup);

  // Return SSE response
  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Content-Encoding': 'none',
      'X-Accel-Buffering': 'no',
    },
  });
}

export const dynamic = 'force-dynamic';
