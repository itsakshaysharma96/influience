"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function ContactUsPage() {
  const [name, setName] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { name, companyEmail, selectedOption, message, agreed });
  };

  return (
    <div className="bg-white relative w-full min-h-screen">
      <Header />


 {/* Content Section */}
 <section className="w-full bg-[rgba(21,42,89,0.25)] pt-16 pb-18">
        <div className="max-w-[1920px] mx-auto px-4 xl:px-[80px] 2xl:px-[162px]">
          <div className="md:flex items-start justify-between gap-18">
            {/* Left Column - Description and Key Highlights */}
            <div className="">
            <h2 className="font-montserrat font-bold text-[24px] md:text-[30px] text-black tracking-[0.3px] mb-6">
                Contact Us
              </h2>
              <h3 className="font-montserrat font-bold text-[20px] md:text-[24px] text-black tracking-[0.2px] mb-4">Work with us</h3>
              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
              Partnering with Martech Influence and hosting your content on our website allows
your brand to reach the IT leaders making the decisions. Encompassing an
entire community of IT leaders, we can truly help elevate your brand and
connect you with the right audience.
              </p>

              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
              Our first-party data and partner reach, allows you to develop a targeted approach and engage with hundreds of thousands of global IT leaders who,
              every month, choose to sign up to our content request service. Our mission is to connect these in-market tech buyers with the very latest cutting-edge tech solutions.
              </p>

              <h3 className="font-montserrat font-bold text-[20px] md:text-[24px] text-black tracking-[0.2px] mb-4">Talk to us about anything else</h3>

              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
              ou can use the form on this page to send us a message. If your inquiry is
urgent, you can also call us +44 20 4525 6570.
              </p>

              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
              If you are a user or email recipient looking to update your contact preferences,
              it’s usually quickest to do so via our Martechinfluencepreference center.              </p>


            </div>

            <div className="max-w-[662px] w-full">
            <form onSubmit={handleSubmit} className="">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="h-[65px] w-full rounded-[5px] px-4 font-montserrat text-[16px] text-black border border-black placeholder:text-[rgba(0,0,0,0.32)] outline-none mb-6"
                  required
                />

                <input
                  type="email"
                  id="companyEmail"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  placeholder="Your company email address"
                  className="h-[65px] w-full rounded-[5px] px-4 font-montserrat text-[16px] text-black border border-black placeholder:text-[rgba(0,0,0,0.32)] outline-none mb-6"
                  required
                />

                <select
                  id="select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="h-[65px] w-full rounded-[5px] px-4 font-montserrat text-[16px] text-black border border-black outline-none mb-6 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Please select...</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>

                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  rows={6}
                  className="w-full rounded-[5px] px-4 py-4 font-montserrat text-[16px] text-black border border-black placeholder:text-[rgba(0,0,0,0.32)] outline-none mb-6 resize-y"
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
                  <label htmlFor="agreement" className="font-montserrat text-[14px] md:text-[14px] text-black tracking-[0.16px] leading-relaxed">
                  By clicking submit, you consent to your data being processed in accordance with our privacy notice.
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-[#152a59] h-[55px] px-18 rounded-[5px] font-montserrat text-[16px] text-white tracking-[0.16px] hover:bg-[#1a3a6b] transition-colors"
                >
                  Submit
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
