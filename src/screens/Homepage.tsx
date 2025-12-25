"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Images from public folder
const imgRectangle13 = "/images/homepage/rectangle13.png";
const imgRectangle36 = "/images/homepage/rectangle36.png";
const imgHoneyWell1 = "/images/homepage/honeywell.png";
const imgRectangle25 = "/images/homepage/rectangle25.png";
const imgRectangle46 = "/images/homepage/rectangle46.png";
const imgDellLogo21 = "/images/homepage/dell-logo.png";
const imgRectangle26 = "/images/homepage/rectangle26.png";
const imgRectangle48 = "/images/homepage/rectangle48.png";

// Content data structure
interface ContentItem {
  id: number;
  brandLogo: string;
  brandName: string;
  image: string;
  title: string;
  description: string;
  categories: string[];
}

const contentItems: ContentItem[] = [
  {
    id: 1,
    brandLogo: imgHoneyWell1,
    brandName: "Honeywell",
    image: imgRectangle13,
    title: "Optimizing Performance in Industrial Environments: The Honeywell Granit™ Ultra Series",
    description: "This eBook explores how Honeywell's Granit™ Ultra series empowers warehouses, manufacturing units, and logistics hubs to overcome scanning, durability, and operational challenges. It demonstrates how next-generation rugged scanners drive accuracy, speed, and reliability; helping businesses achieve peak performance under the toughest industrial conditions.",
    categories: ["Data Center, Servers, Storage and Virtualization", "Data Management and Analytics", "Security", "Hardware"]
  },
  {
    id: 2,
    brandLogo: imgDellLogo21,
    brandName: "Dell",
    image: imgRectangle25,
    title: "Meet Our New AI PC Family: A Unified Portfolio for the AI PC Era",
    description: "This presentation introduces Dell's newly unified AI PC portfolio, simplified into three streamlined categories designed to meet the needs of users across work, creation, and play. Powered by Intel® Core Ultra processors, these devices embody Dell's commitment to performance, design, and AI-driven innovation for the next generation of computing.",
    categories: ["Emerging Tech", "Hardware", "Technology", "IT Management", "Product Development & QA"]
  },
  {
    id: 3,
    brandLogo: imgDellLogo21,
    brandName: "Dell",
    image: imgRectangle26,
    title: "Prepare for the Next Chapter in Your Business",
    description: "This asset explores how small and mid-sized businesses can unlock AI-driven efficiency and resilience with Dell's new generation of AI PCs powered by Intel vPro® and Copilot in Windows. It emphasizes secure, manageable, and high-performing computing that enables growth, collaboration, and data protection in the AI era.",
    categories: ["Data Management and Analytics", "Security", "Technology", "IT Management", "Hardware"]
  },
  {
    id: 4,
    brandLogo: imgDellLogo21,
    brandName: "Dell",
    image: imgRectangle36,
    title: "Give Your Workforce a Boost with Trusted AI PCs",
    description: "This eBook outlines how Dell AI PCs powered by Intel® Core™ Ultra processors are redefining workplace productivity and security. It explores how businesses can prepare for the next wave of hybrid work by upgrading to AI-ready devices that deliver faster performance, smarter collaboration, simplified management, and enhanced cyber resilience.",
    categories: ["Data Management and Analytics", "IT Management", "Security", "Technology"]
  },
  {
    id: 5,
    brandLogo: imgDellLogo21,
    brandName: "Dell",
    image: imgRectangle46,
    title: "Simplifying GenAI Development",
    description: "This eBook demonstrates how NVIDIA AI Workbench, powered by Dell Pro Max high-performance PCs, helps developers and data scientists streamline the process of building, testing, and scaling generative AI (GenAI) models. It highlights how automated setup, workload portability, and integrated productivity tools simplify GenAI workflows from local development to enterprise-scale deployment.",
    categories: ["Product Development & QA", "Emerging Tech", "Hardware", "Data Management and Analytics"]
  },
  {
    id: 6,
    brandLogo: imgDellLogo21,
    brandName: "Dell",
    image: imgRectangle48,
    title: "10 Questions to Kickstart AI Initiatives",
    description: "This guide helps organizations begin their AI journey by framing the right strategic, operational, and technical questions to align cross-functional teams. It breaks down the fundamentals of AI adoption—from defining goals and evaluating data readiness to assessing infrastructure and risk—while highlighting how Dell and NVIDIA solutions simplify deployment and accelerate results.",
    categories: ["Data Management and Analytics", "IT Management", "Technology", "Hardware", "Emerging Tech"]
  }
];

// Category definitions
const primaryCategories = [
  "Latest Content",
  "Business Solutions",
  "Cloud Hosting and Services",
  "Data Center, Servers, Storage and Virtualization",
  "Data Management and Analytics",
  "Database",
  "Emerging Tech",
  "Hardware",
  "IT Management",
  "Mobile, Wireless and Telecommunication",
  "Networking (inc wireless)",
  "Product Development & QA",
  "Security",
  "Software Engineering, Programming, APIs & Services",
  "Technology"
];

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Latest Content");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter content based on selected category and search query
  const filteredContent = contentItems.filter((item) => {
    // If "Latest Content" is selected, show all items
    const matchesCategory = selectedCategory === "Latest Content" || item.categories.includes(selectedCategory);
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

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
          {/* Category Filters */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 flex-wrap">
            {primaryCategories.map((category) => (
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

          {/* Content Grid */}
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <Link
                  key={item.id}
                  href="/detail"
                  className="bg-[#f7f7f7] rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 hover:shadow-lg transition-shadow cursor-pointer block"
                >
                  <div className={`h-[34px] ${item.brandName === "Honeywell" ? "w-[180px]" : "w-[111px]"} relative mb-4`}>
                    <Image
                      src={item.brandLogo}
                      alt={`${item.brandName} Logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className={`w-full mb-4 relative flex items-center justify-center h-110`}>
                    <Image
                      src={item.image}
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
                    {item.description}
                  </p>
                  <div className="border-t border-gray-300 mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    {item.categories.map((category) => (
                      <span
                        key={category}
                        className="bg-[#152a59] text-white text-[10px] md:text-[12px] px-2 py-1 rounded-[5px] font-montserrat"
                      >
                        {category}
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
