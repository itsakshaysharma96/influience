export default function Footer() {
  return (
    <footer className="bg-[#1d252f] w-full py-12">
      <div className="max-w-[1920px] mx-auto px-4 md:px-[119px] w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <a href="/about-us" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">About Us</a>
          <a href="/contact-us" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">Contact Us</a>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          {/* <a href="/preferences" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">Update Your Preferences</a> */}
          <p className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize">© 2025 Martech Influence All Rights Reserved</p>
          <a href="/privacy" className="font-montserrat font-light text-[16px] md:text-[20px] text-white tracking-[0.2px] capitalize hover:opacity-80 transition-opacity">Privacy Notice</a>
        </div>
      </div>
    </footer>
  );
}
