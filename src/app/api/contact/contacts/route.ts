import { NextRequest, NextResponse } from 'next/server';

// Use server-side environment variable (without NEXT_PUBLIC_ prefix)
// This keeps the API URL secure and not exposed to the client
const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.martech-influence.com/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    // if (!body.full_name || !body.email) {
    //   return NextResponse.json(
    //     {
    //       status: false,
    //       message: 'Missing required fields: full_name and email are required',
    //     },
    //     { status: 400 }
    //   );
    // }

    // Construct the API URL - ensure no double slashes
    const apiUrl = `${API_BASE_URL.replace(/\/$/, '')}/contact/contacts/`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Don't cache to ensure fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      return NextResponse.json(
        {
          status: false,
          message: `API responded with status ${response.status}`,
          error: errorData.message || response.statusText
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error proxying contact request:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to submit contact form',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

