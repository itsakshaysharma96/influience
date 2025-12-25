"use client";

import { useState } from "react";
import Image from "next/image";

const imgSearchWhite2 = "/images/homepage/search-white.png";
const logoPath = "/images/logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#1d252f] min-h-[80px] md:h-[124px] w-full flex items-center justify-between px-4 xl:px-[80px] 2xl:px-[162px] sticky top-0 z-50">
      <div className="h-[40px] w-[150px] md:h-[62px] md:w-[200px] xl:w-[358px] relative">
        <Image
          src={logoPath}
          alt="Tech Influence Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4 md:gap-8">
        <div className="w-[22px] h-[22px] md:w-[36px] md:h-[36px] relative cursor-pointer">
          <Image
            src={imgSearchWhite2}
            alt="Search"
            fill
            className="object-contain"
          />
        </div>
        <a href="/about-us" className="font-montserrat text-[14px] md:text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer">About Us</a>
        {/* <span className="font-montserrat text-[14px] md:text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer">Blogs</span> */}
        <a href="/contact-us" className="font-montserrat text-[14px] md:text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer">Contact Us</a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col gap-1.5 w-6 h-6 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              toggleMenu();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Navigation Menu */}
      <nav
        className={`fixed top-[80px] right-0 bg-[#1d252f] w-full max-w-[280px] h-[calc(100vh-80px)] transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6">
          <div className="w-[22px] h-[22px] relative cursor-pointer mb-2">
            <Image
              src={imgSearchWhite2}
              alt="Search"
              fill
              className="object-contain"
            />
          </div>
          <a
            href="/about-us"
            onClick={toggleMenu}
            className="font-montserrat text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer py-2 border-b border-gray-700"
          >
            About Us
          </a>
          <a
            href="/contact-us"
            onClick={toggleMenu}
            className="font-montserrat text-[18px] text-white hover:opacity-80 transition-opacity cursor-pointer py-2 border-b border-gray-700"
          >
            Contact Us
          </a>
        </div>
      </nav>
    </header>
  );
}
