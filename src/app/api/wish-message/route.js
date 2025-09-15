export async function POST(request) {
    try {
      const jsonData = await request.json();
      
      const response = await fetch('http://192.168.166.178:3000/wish-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      });
  
      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
  
  export async function OPTIONS() {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  