"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";

// API Base URL for images
const IMAGE_API_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_API_URL || "https://api.martech-influence.com/api";

// Category interface from API
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Dynamic field interface from API
interface DynamicField {
  id: number;
  field_name: string;
  placeholder: string;
  sequence: number;
  is_active: boolean;
}

// Content data structure matching API response
interface ContentItem {
  id: number;
  title: string;
  short_title: string | null;
  slug: string;
  author_username: string;
  author_full_name: string;
  category: Category;
  short_description: string;
  banner_image: string;
  logo_image: string | null;
  lp_image: string | null;
  mobile_image: string;
  client_name: string | null;
  client_industry: string | null;
  estimated_time: string | null;
  content: string;
  status: string;
  is_featured: boolean;
  is_pinned: boolean;
  views_count: number;
  likes_count: number;
  shares_count: number;
  downloads_count: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  dynamic_fields?: DynamicField[];
  external_link?: string | null;
  downloadable_file?: string | null;
}

// API Response structure for single case study
interface CaseStudyResponse {
  status: boolean;
  status_code: number;
  message_code: string;
  message: string;
  data: ContentItem;
}

// Helper function to get full image URL
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${IMAGE_API_BASE_URL}${imagePath}`;
};

interface CaseStudyDetailProps {
  slug?: string;
  id?: string;
}

export default function CaseStudyDetail({ slug, id }: CaseStudyDetailProps) {
  const [agreed, setAgreed] = useState<boolean>(false);

  // Case study data and loading states
  const [caseStudy, setCaseStudy] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form submission states
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Dynamic field values - keyed by field id
  const [dynamicFieldValues, setDynamicFieldValues] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use slug if available, otherwise fall back to id
        const identifier = slug || id;
        if (!identifier) {
          throw new Error("Slug or ID is required");
        }

        // Use Next.js API route to proxy the request
        const apiUrl = slug
          ? `/api/casestudy/case-studies/slug/${slug}`
          : `/api/casestudy/case-studies/${id}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch case study: ${response.statusText}`);
        }

        const data: CaseStudyResponse = await response.json();
        if (data.status && data.data) {
          setCaseStudy(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch case study");
        }
      } catch (err) {
        console.error("Error fetching case study:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching case study");
      } finally {
        setLoading(false);
      }
    };

    if (slug || id) {
      fetchCaseStudy();
    }
  }, [slug, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("Please agree to the privacy policy to continue.");
      return;
    }

    if (!caseStudy) {
      toast.error("Case study data not loaded. Please refresh the page.");
      return;
    }

    setSubmitting(true);

    try {
      // Build dynamic fields payload
      const dynamicFieldsPayload: Record<string, string> = {};
      if (caseStudy.dynamic_fields) {
        caseStudy.dynamic_fields
          .filter((field) => field.is_active)
          .forEach((field) => {
            const value = dynamicFieldValues[field.id]?.trim() || "";
            if (value) {
              dynamicFieldsPayload[field.field_name] = value;
            }
          });
      }

      const payload = {
        case_study: caseStudy.id,
        data: {
          ...dynamicFieldsPayload,
        },
      };

      const response = await fetch("/api/casestudy/case-study-leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to submit form: ${response.statusText}`);
      }

      if (data.status) {
        toast.success("Thank you! Your request has been submitted successfully.");

        setAgreed(false);
        // Reset dynamic fields
        setDynamicFieldValues({});

        // Handle external_link or downloadable_file after successful submission
        if (caseStudy.external_link && caseStudy.external_link.trim() !== '') {
          // Open external link in a new tab
          window.open(caseStudy.external_link, '_blank', 'noopener,noreferrer');
        } else if (caseStudy.downloadable_file && caseStudy.downloadable_file.trim() !== '') {
          // Trigger download for downloadable file
          const fileUrl = caseStudy.downloadable_file.startsWith('http')
            ? caseStudy.downloadable_file
            : `${IMAGE_API_BASE_URL}${caseStudy.downloadable_file}`;

          // Create a temporary anchor element to trigger download
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = ''; // Let browser determine filename
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err instanceof Error ? err.message : "An error occurred while submitting the form");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white relative w-full min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[500px]">
          <p className="font-montserrat text-[20px] text-black">Loading case study...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="bg-white relative w-full min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[500px]">
          <p className="font-montserrat text-[20px] text-red-600">
            {error || "Case study not found"}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white relative w-full min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row">
        {/* Left Side - Dark Blue Panel */}
        <div className="bg-[#152a59] h-[700px] w-full md:w-1/2 flex flex-col justify-center px-4 xl:px-[80px] 2xl:px-[162px]">
          {/* Client Logo */}
          {caseStudy.logo_image && (
            <div className="h-[134px] w-full max-w-[250px] relative mb-8">
              <Image
                src={getImageUrl(caseStudy.logo_image)}
                alt={caseStudy.client_name || "Client Logo"}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}
          <h1 className="font-montserrat font-medium text-[32px] md:text-[40px] text-white tracking-[0.5px] leading-tight max-w-[667px]">
            {caseStudy.title}
          </h1>
        </div>

        {/* Right Side - Image Panel */}
        <div className="w-full md:w-1/2 h-[700px] relative overflow-hidden">
          {caseStudy.lp_image && (
            <Image
              src={getImageUrl(caseStudy.lp_image)}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-[rgba(21,42,89,0.25)] pt-16 pb-18">
        <div className="max-w-[1920px] mx-auto px-4 xl:px-[80px] 2xl:px-[162px]">
          <div className="flex items-start justify-between gap-12">
            {/* Left Column - Description */}
            <div className="max-w-[813px]">
              {caseStudy.short_description && (
                <p className="font-montserrat text-[16px] md:text-[20px] text-black tracking-[0.2px] leading-relaxed mb-8">
                  {caseStudy.short_description}
                </p>
              )}
              {caseStudy.content && (
                <div className="font-montserrat text-[16px] md:text-[20px] text-black tracking-[0.2px] leading-relaxed mb-12">
                  <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
                </div>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="max-w-[462px]">
              <h3 className="font-montserrat font-medium text-[20px] md:text-[25px] text-black tracking-[0.3px] mb-6">
                Fill below to access the eBook:
              </h3>

              <form onSubmit={handleSubmit} className="bg-[#f7f7f7] rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8">
                {/* Dynamic Fields */}
                {caseStudy.dynamic_fields
                  ?.filter((field) => field.is_active)
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((field) => {
                    const fieldId = `dynamic-field-${field.id}`;
                    return (
                      <div key={field.id} className="mb-6">
                        <label
                          htmlFor={fieldId}
                          className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.18px] block mb-2"
                        >
                          {field.field_name} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={fieldId}
                          data-name={field.field_name}
                          value={dynamicFieldValues[field.id] || ""}
                          onChange={(e) =>
                            setDynamicFieldValues((prev) => ({
                              ...prev,
                              [field.id]: e.target.value,
                            }))
                          }
                          placeholder={field.placeholder}
                          className="bg-[rgba(50,88,155,0.36)] h-[50px] w-full rounded-[5px] px-4 font-montserrat text-[16px] text-black placeholder:text-[rgba(0,0,0,0.32)] outline-none"
                          required
                        />
                      </div>
                    );
                  })}

                <div className="flex items-start gap-3 mb-6">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-[13px] h-[14px] bg-[#dcdbdb] border border-[rgba(0,0,0,0.25)] rounded cursor-pointer shrink-0"
                    required
                  />
                  <label htmlFor="agreement" className="font-montserrat text-[14px] md:text-[16px] text-black tracking-[0.16px] leading-relaxed">
                    Please note that by accessing the advertiser&apos;s content, your data may be transmitted to the advertiser to fulfill the offer. Subscribers also have the ability to track offer fulfillment by email, phone, or letter. See the{" "}
                    <a href="/privacy" className="text-[#152a59] hover:underline">
                      Privacy Policy
                    </a>
                    {" "}for more information.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#152a59] h-[65px] w-full rounded-[5px] font-montserrat text-[16px] text-white tracking-[0.16px] hover:bg-[#1a3a6b] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Get My Copy!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

