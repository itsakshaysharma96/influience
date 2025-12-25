import Header from "./components/Header";
import Footer from "./components/Footer";

export default function AboutUsPage() {

  return (
    <div className="bg-white relative w-full min-h-screen">
      <Header />


 {/* Content Section */}
 <section className="w-full bg-[rgba(21,42,89,0.25)] pt-16 pb-18">
        <div className="max-w-[1920px] mx-auto px-4 xl:px-[80px] 2xl:px-[162px]">
          <div className="flex items-start justify-between gap-12">
            {/* Left Column - Description and Key Highlights */}
            <div className="">
            <h2 className="font-montserrat font-bold text-[24px] md:text-[30px] text-black tracking-[0.3px] mb-6">
                About Us
              </h2>
              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
                Martech Influence connects IT professionals and business leaders to content and events provided by vendors whose products and services help businesses work better.
              </p>

              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
                We work with enterprises that need to engage, inform, and add value to business leaders in their chosen market. By utilizing precise audience identification and direct phone and email communication, supported by easy-to-use preference options, we make these connections in a way that maximizes efficiency for vendors and buyers.
              </p>

              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
                You may hear from us, either because you have opted in, or because, based on your role and job title, we think it&apos;s likely you will be interested in the content or opportunity we are sharing.
              </p>

              <p className="font-montserrat text-[16px] md:text-[18px] text-black tracking-[0.2px] leading-relaxed mb-8">
                Whether email or phone-based, our communications are always:
              </p>

              <ul className="font-montserrat text-[16px] md:text-[18px] pl-8 text-black tracking-[0.2px] leading-relaxed space-y-4 list-disc list-inside">
                <li>
                  <span className="">Likely to be highly relevant to your role and needs</span>{" "}
                  - based on our close collaboration with the vendors and knowledge of their market, customers and users
                </li>
                <li>
                  <span className="">Clearly presented</span>{" "}
                    - making it easy for you to identify potential value
                </li>
                <li>
                  <span className="">Simple to access</span>{" "}
                  - typically, we only need you to confirm an email address, and we&apos;ll deliver your content or event link to your inbox within minutes
                </li>
                <li>
                  <span className="">Easy to change preferences or opt out of</span>{" "}
                  - simply tell us at <a href="https://preferences.martech.influence./" className="text-blue-600 hover:underline">https://preferences.martech.influence./</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
