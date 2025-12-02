"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images from public folder
const imgRectangle63 = "/images/detail/rectangle63.png";
const imgHoney1 = "/images/detail/honey1.png";
const logoPath = "/images/logo.png";

export default function DetailPage() {
  const [email, setEmail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { email, agreed });
  };

  return (
    <div className="bg-white relative w-full min-h-screen">
      {/* Header */}
      <header className="bg-[#1d252f] h-[124px] w-full flex items-center justify-between px-4 md:px-[116px] sticky top-0 z-50">
        <Link href="/" className="h-[62px] w-[200px] md:w-[308px] relative">
          <Image
            src={logoPath}
            alt="Tech Influence Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row">
        {/* Left Side - Dark Blue Panel */}
        <div className="bg-[#152a59] h-[700px] w-full md:w-1/2 flex flex-col justify-center px-4 md:px-[118px]">
          <div className="h-[134px] w-full max-w-[250px] relative mb-8">
            <Image
              src={imgHoney1}
              alt="Honeywell Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-montserrat font-medium text-[32px] md:text-[45px] text-white tracking-[0.5px] leading-tight max-w-[667px]">
            Optimizing Performance in Industrial Environments: The Honeywell Granit™ Ultra Series
          </h1>
        </div>

        {/* Right Side - Image Panel */}
        <div className="w-full md:w-1/2 h-[700px] relative overflow-hidden">
          <Image
            src={imgRectangle63}
            alt="Honeywell Granit Ultra Series Scanners"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-[rgba(21,42,89,0.25)] pt-16 pb-18">
        <div className="max-w-[1920px] mx-auto px-4 md:px-[191px]">
          <div className="flex items-start justify-between gap-12">
            {/* Left Column - Description and Key Highlights */}
            <div className="max-w-[813px]">
              <p className="font-montserrat text-[16px] md:text-[20px] text-black tracking-[0.2px] leading-relaxed mb-12">
                This eBook explores how Honeywell&apos;s Granit™ Ultra series empowers warehouses, manufacturing units, and logistics hubs to overcome scanning, durability, and operational challenges. It demonstrates how next-generation rugged scanners drive accuracy, speed, and reliability; helping businesses achieve peak performance under the toughest industrial conditions.
              </p>

              <h2 className="font-montserrat font-bold text-[24px] md:text-[30px] text-black tracking-[0.3px] mb-6">
                Key Highlights
              </h2>

              <div className="font-montserrat text-[16px] md:text-[20px] text-black tracking-[0.2px] leading-relaxed space-y-4">
                <p>
                  <span className="font-bold">Enhanced Scanning Performance:</span>{" "}
                  Captures even damaged or low-contrast barcodes quickly and accurately with advanced imaging technology.
                </p>
                <p>
                  <span className="font-bold">Ultra-Rugged Durability:</span>{" "}
                  IP65/68-rated design withstands drops, dust, moisture, and extreme temperatures, reducing downtime and repair costs.
                </p>
                <p>
                  <span className="font-bold">Operational Efficiency:</span>{" "}
                  Boosts throughput by up to 45% through AI-driven decoding, multi-code scanning, and seamless enterprise integration.
                </p>
                <p>
                  <span className="font-bold">Ergonomic, Worker-Friendly Design:</span>{" "}
                  Minimizes fatigue with lightweight build and long battery life, supporting extended shifts.
                </p>
                <p>
                  <span className="font-bold">Future-Ready Ecosystem:</span>{" "}
                  Compatible with corded/cordless setups, mobile mounts, and Honeywell software utilities for easy deployment and management.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="max-w-[462px]">
              <h3 className="font-montserrat font-medium text-[24px] md:text-[30px] text-black tracking-[0.3px] mb-6">
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

      {/* Footer */}
      <footer className="bg-[#1d252f] w-full py-8">
        <div className="max-w-[1920px] mx-auto px-4 text-center">
          <p className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize">
            © 2025 Tech Influence All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

