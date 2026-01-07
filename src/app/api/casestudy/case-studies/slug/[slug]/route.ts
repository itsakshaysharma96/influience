import { NextRequest, NextResponse } from 'next/server';

// Use server-side environment variable (without NEXT_PUBLIC_ prefix)
// This keeps the API URL secure and not exposed to the client
const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.martech-influence.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          status: false,
          message: 'Case study slug is required',
        },
        { status: 400 }
      );
    }

    // Construct the API URL - try query parameter approach first (more common for slug-based fetching)
    // Try with query parameter: /casestudy/case-studies/?slug=...
    const apiUrlWithQuery = `${API_BASE_URL.replace(/\/$/, '')}/casestudy/case-studies/?slug=${encodeURIComponent(slug)}`;
    let response = await fetch(apiUrlWithQuery, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // If query parameter approach fails, try direct path approach
    if (!response.ok) {
      const apiUrlDirect = `${API_BASE_URL.replace(/\/$/, '')}/casestudy/case-studies/${slug}/`;
      response = await fetch(apiUrlDirect, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
    }

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

    // Handle case where API returns a list (when using query parameters)
    // vs a single object (when using direct path)
    let responseData = data;
    if (data.data && Array.isArray(data.data)) {
      // Find the case study with matching slug
      const matchingCaseStudy = data.data.find((item: { slug?: string }) => item.slug === slug);
      if (matchingCaseStudy) {
        responseData = {
          ...data,
          data: matchingCaseStudy
        };
      } else {
        return NextResponse.json(
          {
            status: false,
            message: 'Case study not found',
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error proxying case study request:', error);
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to fetch case study',
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

