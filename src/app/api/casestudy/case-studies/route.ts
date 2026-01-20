import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.martech-influence.com/api";

export async function GET(request: NextRequest) {
  try {
    // Read query params from frontend request
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    // Build backend API URL with pagination
    const apiUrl = `${API_BASE_URL.replace(/\/$/, "")}/casestudy/case-studies/?page=${page}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: false,
          message: `API responded with status ${response.status}`,
          error: response.statusText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error proxying case studies request:", error);

    return NextResponse.json(
      {
        status: false,
        message: "Failed to fetch case studies",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
