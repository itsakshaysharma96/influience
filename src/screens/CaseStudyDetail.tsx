"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  id: string;
}

export default function CaseStudyDetail({ id }: CaseStudyDetailProps) {
  const [email, setEmail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [caseStudy, setCaseStudy] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/casestudy/case-studies/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch case study: ${response.statusText}`);
        }

        const data: CaseStudyResponse = await response.json();
console.log(data);
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

    if (id) {
      fetchCaseStudy();
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { email, agreed, caseStudyId: id });
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
          {caseStudy.mobile_image && (
            <div className="h-[134px] w-full max-w-[250px] relative mb-8">
              <Image
                src={getImageUrl(caseStudy.mobile_image)}
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
          <Image
            src={getImageUrl(caseStudy.banner_image)}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-[rgba(21,42,89,0.25)] pt-16 pb-18">
        <div className="max-w-[1920px] mx-auto px-4 xl:px-[80px] 2xl:px-[162px]">
          <div className="flex items-start justify-between gap-12">
            {/* Left Column - Description */}
            <div className="max-w-[813px]">
              <p className="font-montserrat text-[16px] md:text-[20px] text-black tracking-[0.2px] leading-relaxed mb-12">
                <div dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
              </p>



            </div>

            {/* Right Column - Form */}
            <div className="max-w-[462px]">
              <h3 className="font-montserrat font-medium text-[20px] md:text-[25px] text-black tracking-[0.3px] mb-6">
                Fill below to access the eBook:
              </h3>

              <form onSubmit={handleSubmit} className="bg-[#f7f7f7] rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8">
                <label htmlFor="email" className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.18px] block mb-4">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-[rgba(50,88,155,0.36)] h-[65px] w-full rounded-[5px] px-4 font-montserrat text-[16px] text-black placeholder:text-[rgba(0,0,0,0.32)] outline-none mb-6"
                  required
                />

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
                  className="bg-[#152a59] h-[65px] w-full rounded-[5px] font-montserrat text-[16px] text-white tracking-[0.16px] hover:bg-[#1a3a6b] transition-colors"
                >
                  Get My Copy!
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

