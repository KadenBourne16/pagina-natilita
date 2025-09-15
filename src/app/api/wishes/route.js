import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `*[_type == "wish_message"] | order(_createdAt desc) {
      _id,
      username,
      message,
      image{
        asset->{
          url
        }
      },
      _createdAt
    }`;

    const wishes = await client.fetch(query);
    return NextResponse.json(wishes);
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishes' },
      { status: 500 }
    );
  }
}

// Export other HTTP methods as needed
export { GET };

export const dynamic = 'force-dynamic';
