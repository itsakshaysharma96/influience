"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images from public folder
const imgRectangle13 = "/images/homepage/rectangle13.png";
const imgRectangle36 = "/images/homepage/rectangle36.png";
const imgHoneyWell1 = "/images/homepage/honeywell.png";
const imgRectangle25 = "/images/homepage/rectangle25.png";
const imgRectangle46 = "/images/homepage/rectangle46.png";
const imgDellLogo21 = "/images/homepage/dell-logo.png";
const imgRectangle26 = "/images/homepage/rectangle26.png";
const imgRectangle48 = "/images/homepage/rectangle48.png";
const imgSearchWhite2 = "/images/homepage/search-white.png";
const logoPath = "/images/logo.png";

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
    categories: ["Data Center", "Servers", "Security", "Storage and Virtualization", "Data Management and Analytics", "Hardware", "Product Development & QA", "IT Management"]
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
    categories: ["Data Management and Analytics", "Product Development & QA", "Emerging Tech", "Hardware"]
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
  "Data Center",
  "Servers",
  "Storage and Virtualization",
  "Data Management and Analytics",
  "Security",
  "Hardware"
];

const secondaryCategories = [
  "Emerging Tech",
  "Technology",
  "Product Development & QA",
  "IT Management"
];

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Data Center");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter content based on selected category and search query
  const filteredContent = contentItems.filter((item) => {
    const matchesCategory = item.categories.includes(selectedCategory);
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
      {/* Header */}
      <header className="bg-[#1d252f] h-[124px] w-full flex items-center justify-between px-4 md:px-[116px] sticky top-0 z-50">
        <div className="h-[62px] w-[200px] md:w-[358px] relative">
          <Image
            src={logoPath}
            alt="Tech Influence Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <nav className="flex items-center gap-4 md:gap-8">
          <div className="w-[22px] h-[22px] md:w-[36px] md:h-[36px] relative cursor-pointer">
            <Image
              src={imgSearchWhite2}
              alt="Search"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-montserrat text-[14px] md:text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer">About Us</span>
          <span className="font-montserrat text-[14px] md:text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer">Blogs</span>
          <span className="font-montserrat text-[14px] md:text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer">Contact Us</span>
        </nav>
      </header>

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
              className="w-full h-full outline-none text-black font-montserrat text-[14px] md:text-[16px] placeholder:text-black/60"
            />
          </div>
          <button type="submit" className="bg-black h-[52px] rounded-[5px] w-full sm:w-[117px] flex items-center justify-center hover:bg-gray-800 transition-colors">
            <span className="font-montserrat text-[14px] md:text-[16px] text-white">Search</span>
          </button>
        </form>
      </section>

      {/* Category Filters */}
      <section className="w-full bg-[rgba(21,42,89,0.25)] py-12">
        <div className="max-w-[1920px] mx-auto px-4 md:px-[162px]">
          {/* Primary Category Filters */}
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            {primaryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`h-[50px] rounded-[5px] px-4 md:px-6 flex items-center transition-colors ${
                  selectedCategory === category
                    ? "bg-black"
                    : "bg-transparent hover:bg-gray-200"
                }`}
              >
                <span
                  className={`font-montserrat font-medium text-[16px] md:text-[20px] ${
                    selectedCategory === category ? "text-white" : "text-black"
                  }`}
                >
                  {category}
                </span>
              </button>
            ))}
          </div>

          {/* Secondary Category Filters */}
          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            {secondaryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`h-[50px] rounded-[5px] px-4 md:px-6 flex items-center transition-colors ${
                  selectedCategory === category
                    ? "bg-black"
                    : "bg-transparent hover:bg-gray-200"
                }`}
              >
                <span
                  className={`font-montserrat font-medium text-[16px] md:text-[20px] ${
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
                  <div className={`${item.id === 5 || item.id === 6 ? "h-[301px]" : "h-[330px]"} w-full relative rounded-[10px] shadow-[6px_8px_21.6px_1px_rgba(0,0,0,0.25)] mb-4 overflow-hidden`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
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

      {/* Footer */}
      <footer className="bg-[#1d252f] w-full py-12">
        <div className="max-w-[1920px] mx-auto px-4 md:px-[119px] w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-4">
            <a href="/about" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">About Us</a>
            <a href="/contact" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">Contact Us</a>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <a href="/preferences" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">Update Your Preferences</a>
            <p className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize">© 2025 Tech Influence All Rights Reserved</p>
            <a href="/privacy" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">Privacy Notice</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
