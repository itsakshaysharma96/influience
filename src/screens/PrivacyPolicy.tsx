"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Privacy Policy data structure from API
interface PrivacyPolicyData {
  id?: number;
  title?: string;
  description?: string;
  content?: string;
  [key: string]: unknown; // Allow for additional fields from API
}

// API Response structure
interface PrivacyPolicyResponse {
  status: boolean;
  status_code: number;
  message_code: string;
  message: string;
  data: PrivacyPolicyData | PrivacyPolicyData[] | null;
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export default function PrivacyPolicyPage() {
  const [privacyData, setPrivacyData] = useState<PrivacyPolicyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use Next.js API route to proxy the request and avoid CORS issues
        const response = await fetch('/api/privacy-policy/list');

        if (!response.ok) {
          throw new Error(`Failed to fetch privacy policy: ${response.statusText}`);
        }

        const data: PrivacyPolicyResponse = await response.json();

        if (data.status && data.data) {
          // Handle both single object and array responses
          if (Array.isArray(data.data)) {
            // If it's an array, use the first item or combine them
            setPrivacyData(data.data[0] || null);
          } else {
            setPrivacyData(data.data);
          }
        } else {
          throw new Error(data.message || "Failed to fetch privacy policy");
        }
      } catch (err) {
        console.error("Error fetching privacy policy:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching privacy policy");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  // Helper function to render content - handles HTML strings or plain text
  const renderContent = (content: string | undefined | null) => {
    if (!content) return null;

    // Check if content contains HTML tags
    const hasHTML = /<[a-z][\s\S]*>/i.test(content);

    if (hasHTML) {
      return (
        <div
          className="privacy-policy-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }

    // If plain text, split by newlines and render as paragraphs
    return content.split('\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;
      return (
        <p key={`paragraph-${index}-${trimmed.substring(0, 20)}`} className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-6">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="bg-white relative w-full min-h-screen">
      <Header />

      {/* Content Section */}
      <section className="w-full bg-[rgba(21,42,89,0.25)] pt-16 pb-18 min-h-[600px]">
        <div className="max-w-[1920px] mx-auto px-4 xl:px-[80px] 2xl:px-[162px] py-0">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="font-montserrat text-[20px] text-black">Loading privacy policy...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="font-montserrat text-[20px] text-red-600">{error}</p>
            </div>
          )}

          {/* Privacy Policy Content */}
          {!loading && !error && privacyData && (
            <div className=" ">
              {privacyData.title && (
                <h1 className="font-montserrat font-bold text-[28px] md:text-[36px] lg:text-[42px] text-black tracking-[0.3px] mb-8">
                  {privacyData.title}
                </h1>
              )}

              {/* Render description if available */}
              {privacyData.description && (
                <div className="mb-8 privacy-policy-content">
                  {renderContent(privacyData.description)}
                </div>
              )}

              {/* Render content if available */}
              {privacyData.content && (
                <div className="privacy-policy-content">
                  {renderContent(privacyData.content)}
                </div>
              )}

              {/* If no specific content fields, render all data as fallback */}
              {!privacyData.description && !privacyData.content && (
                <div className="space-y-8 privacy-policy-content">
                  {Object.entries(privacyData).map(([key, value]) => {
                    // Skip id and other non-content fields
                    if (key === 'id' || key === 'created_at' || key === 'updated_at') return null;
                    if (typeof value !== 'string') return null;

                    return (
                      <div key={key} className="mb-8">
                        <h2 className="font-montserrat font-semibold text-[22px] md:text-[26px] text-black tracking-[0.3px] mb-4 capitalize">
                          {key.replaceAll('_', ' ')}
                        </h2>
                        {renderContent(value)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* No data state */}
          {!loading && !error && !privacyData && (
            <div className="text-center py-12">
              <p className="font-montserrat text-[20px] text-black">
                No privacy policy content available.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

