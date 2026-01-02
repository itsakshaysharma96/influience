import { NextRequest, NextResponse } from 'next/server';

// Use server-side environment variable (without NEXT_PUBLIC_ prefix)
// This keeps the API URL secure and not exposed to the client
const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.martech-influence.com/api';

export async function GET(_request: NextRequest) {
  try {
    // Construct the API URL - ensure no double slashes
    const apiUrl = `${API_BASE_URL.replace(/\/$/, '')}/privacy-policy/list/`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Don't cache to ensure fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: false,
          message: `API responded with status ${response.status}`,
          error: response.statusText
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error proxying privacy policy request:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch privacy policy',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

