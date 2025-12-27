"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

// API Base URL for images - the actual API base URL for fetching images
// For API calls, we use the Next.js API route to avoid CORS issues
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
  //array tags
  tags: { name: string }[];
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

// API Response structure
interface CaseStudiesResponse {
  status: boolean;
  status_code: number;
  message_code: string;
  message: string;
  data: ContentItem[];
  count: number;
  next: string | null;
  previous: string | null;
}

// "Latest Content" is a special filter that shows all items
const LATEST_CONTENT_CATEGORY = "Latest Content";

// Helper function to get full image URL
const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${IMAGE_API_BASE_URL}${imagePath}`;
};


export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(LATEST_CONTENT_CATEGORY);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<string[]>([LATEST_CONTENT_CATEGORY]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // Track mounted state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch case studies from API via Next.js API route (proxy to avoid CORS)
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use Next.js API route to proxy the request and avoid CORS issues
        const response = await fetch('/api/casestudy/case-studies');

        if (!response.ok) {
          throw new Error(`Failed to fetch case studies: ${response.statusText}`);
        }

        const data: CaseStudiesResponse = await response.json();
console.log(data);
        if (data.status && data.data) {
          setContentItems(data.data);

          // Extract unique category names from API response
          const apiCategories = data.data
            .map(item => item.category?.name)
            .filter((name): name is string => Boolean(name) && name.trim() !== "");

          // Get unique categories and sort them alphabetically
          const uniqueCategories = Array.from(new Set(apiCategories)).sort((a, b) => a.localeCompare(b));

          // Add "Latest Content" as the first option
          setCategories([LATEST_CONTENT_CATEGORY, ...uniqueCategories]);
        } else {
          throw new Error(data.message || "Failed to fetch case studies");
        }
      } catch (err) {
        console.error("Error fetching case studies:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching case studies");
        // Keep default empty state or handle error UI
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  // Filter content based on selected category and search query
  const filteredContent = contentItems.filter((item) => {
    // If "Latest Content" is selected, show all items
    const matchesCategory = selectedCategory === LATEST_CONTENT_CATEGORY || item.category?.name === selectedCategory;

    // If no search query, return all items matching the category
    if (!searchQuery.trim()) {
      return matchesCategory;
    }

    // Normalize search query for case-insensitive matching
    const normalizedQuery = searchQuery.toLowerCase().trim();

    // Search in title and description (main search criteria)
    const matchesTitle = item.title?.toLowerCase().includes(normalizedQuery) || false;
    const matchesDescription = item.short_description?.toLowerCase().includes(normalizedQuery) || false;

    // Also search in category name for better discoverability
    const matchesCategoryName = item.category?.name?.toLowerCase().includes(normalizedQuery) || false;

    const matchesSearch = matchesTitle || matchesDescription || matchesCategoryName;

    return matchesCategory && matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by filteredContent
  };
  return (
    <div className="bg-white relative w-full min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#152a59] min-h-[617px] w-full flex flex-col items-center justify-center px-4 py-16">
        <h1 className="font-montserrat font-semibold text-[32px] md:text-[50px] text-center text-white tracking-[0.5px] max-w-[865px] mb-8 leading-tight">
          Content Library of Technology Shaping Businesses Today!
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-[600px] w-full">
          <div className="bg-white h-[52px] rounded-[5px] flex-1 flex items-center px-4">
            <input
              type="text"
              placeholder="Search for whitepapers, topics, and case studies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full outline-none text-black py-5 font-montserrat text-[14px] md:text-[16px] placeholder:text-black/60"
            />
          </div>
          <button type="submit" className="bg-black h-[52px] rounded-[5px] w-full sm:w-[117px] flex items-center justify-center hover:bg-gray-800 transition-colors">
            <span className="font-montserrat text-[14px] md:text-[16px] text-white">Search</span>
          </button>
        </form>
      </section>

      {/* Category Filters */}
      <section className="w-full bg-[rgba(21,42,89,0.25)] py-12">
        <div className="max-w-[1920px] mx-auto px-4 xl:px-[80px] 2xl:px-[162px]">
          {/* Category Filters - Only render after mount and data is loaded to avoid hydration mismatch */}
          {mounted && !loading && (
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-[50px] rounded-[5px] px-2 md:px-4 flex items-center transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-black"
                      : "bg-transparent hover:bg-gray-200"
                  }`}
                >
                  <span
                    className={`font-montserrat font-medium text-[14px] md:text-[16px] lg:text-[18px] ${
                      selectedCategory === category ? "text-white" : "text-black"
                    }`}
                  >
                    {category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="font-montserrat text-[20px] text-black">Loading case studies...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="font-montserrat text-[20px] text-red-600">{error}</p>
            </div>
          )}

          {/* Content Grid */}
          {!loading && !error && (
            <>
              {filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent.map((item) => (
                    <Link
                      key={item.id}
                      href={`/case-studies/${item.id}`}
                      className="bg-[#f7f7f7] rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 hover:shadow-lg transition-shadow cursor-pointer block"
                      >
                      <div className={`h-[34px] ${item.mobile_image === "Honeywell" ? "w-[180px]" : "w-[171px]"} relative mb-4`}>
                    <Image
                            src={getImageUrl(item.mobile_image)}
                            alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className={`w-full mb-4 relative flex items-center justify-center h-110`}>
                    <Image
                      src={getImageUrl(item.banner_image)}
                      alt={item.title}
                      height={300}
                      width={300}
                      className="mx-auto rounded-[10px] shadow-[6px_8px_21.6px_1px_rgba(0,0,0,0.25)] object-contain"
                    />
                  </div>


                  <h3 className="font-montserrat font-medium text-[18px] md:text-[22px] text-black mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-montserrat text-[12px] text-black mb-4 leading-relaxed">
                      {item.short_description}
                      </p>

                      <div className="border-t border-gray-300 mb-4"></div>

                      {/* tag Badge */}
                      <div className="flex flex-wrap gap-2" >
                      {item.tags?.map((tag: { name: string }) => (
                          <span key={tag.name} className="bg-[#152a59] text-white text-[10px] md:text-[12px] px-2 py-1 rounded-[5px] font-montserrat">
                            {tag.name}
                          </span>
                      ))}
                       </div>

                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-montserrat text-[20px] text-black">
                    No content found matching your criteria. Try selecting a different category or search term.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#1d252f] w-full py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-[112px]">
          <h2 className="font-montserrat font-medium text-[36px] md:text-[50px] text-center text-white tracking-[0.5px] mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <p className="font-montserrat font-medium text-[22px] md:text-[25px] text-white tracking-[0.3px] leading-relaxed">
              Tech-Influence is a free-to-access digital library and content subscription platform built for professionals. It offers an extensive collection of whitepapers, eBooks, case studies, guides, and articles; all curated to inform, inspire, and empower decision-making across industries.
            </p>
            <div className="space-y-6">
              <p className="font-montserrat text-[16px] md:text-[18px] text-white tracking-[0.2px] leading-relaxed">
                You can explore our extensive library effortlessly using the search and topic filters to discover the most relevant insights for your field. Through our Preference Center, you have complete control over your communication and content choices — across Tech-Influence and our partner publications.
              </p>
              <p className="font-montserrat text-[16px] md:text-[18px] text-white tracking-[0.2px] leading-relaxed">
                All our resources are free to access and share. In return, we ask for your consent to share your professional details with the respective authors or content providers. To learn more about how we operate and handle data, you&apos;ll find clear, jargon-free information linked below.
              </p>
              <p className="font-montserrat text-[16px] md:text-[18px] text-white tracking-[0.2px] leading-relaxed">
                From time to time, we may email you with curated content aligned with your role and industry. You can update or change these preferences anytime using the Update Your Preferences link.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
