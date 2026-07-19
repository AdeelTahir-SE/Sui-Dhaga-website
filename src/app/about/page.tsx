import { PublicShell } from "@/components/common/site-shell";
import {
  Shield,
  Target,
  CheckCircle,
  Users,
  Wand2,
  Lock,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const CustomCheckCircle = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12" cy="12" r="11" fill="#14919b" stroke="white" strokeWidth="2"/>
    <path d="M7.5 12L10.5 15L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function AboutPage() {
  return (
    <PublicShell>
      <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#111]">
        <div className="max-w-[1100px] mx-auto px-6 pt-[140px] pb-20">
          {/* Breadcrumbs */}
          <div className="text-sm text-[#666] mb-12 font-medium">
            <Link href="/" className="text-[#666] no-underline">
              Home
            </Link>{" "}
            <span className="mx-2">&gt;</span>{" "}
            <span className="text-[#111]">About Us</span>
          </div>

          {/* Hero Section */}
          <div className="flex gap-20 items-center mb-[100px] flex-wrap">
            <div className="flex-[1_1_400px] relative">
              <h1 className="text-[46px] font-extrabold mb-6 tracking-tight leading-tight">
                About Sui Dhaga
              </h1>
              <p className="text-lg leading-relaxed text-[#555] max-w-[440px] m-0">
                Sui Dhaga is where tradition meets technology. We connect you
                with expert tailors and AI tools to create outfits that are
                uniquely yours.
              </p>

              {/* Decorative Motifs */}
              <div className="absolute right-4 top-20 text-[#FF6B6B]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" stroke="#111" strokeWidth="2">
                  <rect x="16" y="2" width="12" height="12" transform="rotate(45 16 2)" />
                </svg>
                {/* Dots */}
                <div className="absolute -left-3 top-2 w-1.5 h-1.5 bg-[#111] rounded-full"></div>
                <div className="absolute left-0 -bottom-3 w-1 h-1 bg-[#111] rounded-full"></div>
                <div className="absolute left-6 bottom-1 w-1.5 h-1.5 bg-[#111] rounded-full"></div>
              </div>
            </div>

            <div className="flex-[1_1_400px] relative flex justify-center items-center">
              {/* Background Shapes */}
              {/* Zigzag */}
              <div className="absolute -top-8 -right-2 text-[#111] z-0">
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="miter">
                  <path d="M0 20 L15 0 L30 20 L45 0 L60 20" />
                </svg>
              </div>

              {/* Red Cloud bottom-left */}
              <div className="absolute -bottom-20 -left-20 z-0">
                <svg width="120" height="70" viewBox="0 0 120 70" fill="#FF6B6B" stroke="#111" strokeWidth="3">
                  <path d="M5 65 Q 15 20 45 35 Q 70 5 105 40 Q 115 55 110 65 Z" />
                </svg>
              </div>

              {/* Yellow Blob */}
              <div className="absolute bottom-4 left-4 w-[130px] h-[130px] bg-[#FFD13B] border-[3px] border-[#111] z-0" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>

              {/* Teal Stairs */}
              <div className="absolute bottom-0 -right-6 z-0">
                <svg width="120" height="140" viewBox="0 0 120 140" fill="#14919b" stroke="#111" strokeWidth="3">
                  <path d="M0 140 L0 90 L40 90 L40 40 L80 40 L80 0 L120 0 L120 140 Z" />
                </svg>
              </div>

              {/* Small BG Image */}
              <Image
                src="/images/about/about-main-bg.png"
                alt="Background Shape"
                width={380}
                height={380}
                className="absolute z-[5] w-full max-w-[380px] object-contain rounded-xl top-9"
              />

              {/* Main Image */}
              <Image
                src="/images/about/about-main.png"
                alt="Tailor measuring"
                width={480}
                height={480}
                className="relative z-10 w-full max-w-[480px] object-contain"
              />
            </div>
          </div>

          <hr className=" border-t border-[#EAEAEA] mb-20" />

          {/* Cards Section */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-[100px]">
            <div className="bg-[#FFEDD5] p-12 rounded-3xl">
              <div className="flex items-start gap-5 mb-6 min-h-[88px]">
                <div className="w-14 h-14 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white shrink-0">
                  <Shield size={28} />
                </div>
                <h2 className="text-2xl font-extrabold m-0 tracking-tight">
                  The Problem We Solve
                </h2>
              </div>
              <p className="text-base leading-relaxed text-[#444] m-0">
                Finding the right tailor, explaining your style, and getting the
                perfect fit can be difficult and time-consuming.
              </p>
            </div>

            <div className="bg-[#E0F2F2] p-12 rounded-3xl">
              <div className="flex items-start gap-5 mb-6 min-h-[88px]">
                <div className="w-14 h-14 bg-[#14919b] rounded-full flex items-center justify-center text-white shrink-0">
                  <Target size={28} />
                </div>
                <h2 className="text-2xl font-extrabold m-0 tracking-tight">
                  Our Mission
                </h2>
              </div>
              <p className="text-base leading-relaxed text-[#444] m-0">
                To make custom fashion accessible, personalized, and effortless
                for everyone through expert tailors and AI innovation.
              </p>
            </div>
          </div>

          <hr className=" border-t border-[#EAEAEA] mb-20" />

          {/* For Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center  mb-20">
            {/* Left Photo */}
            <div className="flex justify-start">
              <Image
                src="/images/about/for-customers.png"
                alt="Happy Customer"
                width={360}
                height={260}
                className="w-full max-w-[360px] h-[260px] object-cover rounded-3xl object-top"
              />
            </div>

            {/* Middle Content */}
            <div className="flex justify-center">
              <div>
                <h2 className="text-[36px] font-extrabold mb-8 tracking-tight">
                  For Customers
                </h2>
                <ul className="list-none p-0 m-0 flex flex-col gap-6">
                  <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                    <CustomCheckCircle size={28} /> Verified expert tailors
                  </li>
                  <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                    <CustomCheckCircle size={28} /> Easy booking &amp; secure payments
                  </li>
                  <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                    <CustomCheckCircle size={28} /> Custom outfits, made just for you
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-end">
              <Image
                src="/images/about/for-customers-illustration.png"
                alt="Tailor Illustration"
                width={500}
                height={500}
                className="w-full max-w-[500px] object-contain scale-110 origin-right"
              />
            </div>
          </div>

          <hr className=" border-t border-[#EAEAEA] mb-20" />

          {/* For Tailors */}
          <div className="flex gap-20 items-center mb-20 flex-wrap-reverse">
            <div className="flex-[1_1_400px]">
              <h2 className="text-[32px] font-extrabold mb-8 tracking-tight">
                For Tailors
              </h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-6">
                <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                  <CustomCheckCircle size={32} /> Grow your business
                </li>
                <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                  <CustomCheckCircle size={32} /> Reach more customers
                </li>
                <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                  <CustomCheckCircle size={32} /> Smart tools to manage orders
                </li>
              </ul>
            </div>
            <div className="flex-[1_1_400px]">
              <Image
                src="/images/about/for-tailors.png"
                alt="For Tailors"
                width={800}
                height={600}
                className="w-full h-[360px] object-cover rounded-[32px]"
              />
            </div>
          </div>

          <hr className=" border-t border-[#EAEAEA] mb-20" />

          {/* Why Sui Dhaga? */}
          <div className="mb-[100px] text-center relative">
            {/* Decorative Left Dots */}
            <svg
              viewBox="0 0 80 120"
              className="absolute top-10 -left-12 w-[80px] h-[120px] -z-10 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#111" opacity="0.4">
                <circle cx="20" cy="10" r="1.5" />
                <circle cx="35" cy="5" r="1" />
                <circle cx="50" cy="15" r="1.5" />
                <circle cx="10" cy="25" r="1.5" />
                <circle cx="25" cy="30" r="1" />
                <circle cx="40" cy="25" r="1.5" />
                <circle cx="60" cy="35" r="1" />
                <circle cx="0" cy="45" r="1" />
                <circle cx="15" cy="50" r="1.5" />
                <circle cx="30" cy="45" r="1" />
                <circle cx="45" cy="55" r="1.5" />
                <circle cx="70" cy="50" r="1" />
                <circle cx="5" cy="65" r="1.5" />
                <circle cx="20" cy="70" r="1" />
                <circle cx="35" cy="65" r="1.5" />
                <circle cx="50" cy="75" r="1" />
                <circle cx="15" cy="85" r="1" />
                <circle cx="30" cy="90" r="1.5" />
                <circle cx="45" cy="85" r="1" />
              </g>
            </svg>
            <h2 className="text-[32px] font-extrabold mb-12 tracking-tight">
              Why Sui Dhaga?
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
              <div className="bg-white py-10 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-[#FAF8F5] rounded-full flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/about/trusted-network-icon.png"
                    alt="Trusted Network"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111] text-center">
                  Trusted Network
                  <br />
                  <span className="font-medium text-[#555]">
                    of expert tailors
                  </span>
                </h3>
              </div>
              <div className="bg-white py-10 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-[#FAF8F5] rounded-full flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/about/ai-powered-icon.png"
                    alt="AI-Powered Design"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111] text-center">
                  AI-Powered
                  <br />
                  <span className="font-medium text-[#555]">Design Studio</span>
                </h3>
              </div>
              <div className="bg-white py-10 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-[#FAF8F5] rounded-full flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/about/secure-icon.png"
                    alt="Secure & Easy Experience"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111] text-center">
                  Secure &amp; Easy
                  <br />
                  <span className="font-medium text-[#555]">Experience</span>
                </h3>
              </div>
              <div className="bg-white py-10 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-6">
                <div className="w-24 h-24 bg-[#FAF8F5] rounded-full flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/about/globe-icon.png"
                    alt="Made for India, Loved Globally"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111] text-center">
                  Made for India,
                  <br />
                  <span className="font-medium text-[#555]">
                    Loved Globally
                  </span>
                </h3>
              </div>
            </div>
          </div>

          <hr className=" border-t border-[#EAEAEA] mb-20" />

          {/* Our Team */}
          <div className="mb-[100px] text-center relative">
            <h2 className="text-[32px] font-extrabold mb-12 tracking-tight">
              Our Team
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              {[
                {
                  name: "Ayesha Khan",
                  role: "Co-Founder & CEO",
                  image: "/images/home/recent-look-1.png",
                },
                {
                  name: "Rohit Sharma",
                  role: "Co-Founder & CTO",
                  image: "/images/home/recent-look-2.png",
                },
                {
                  name: "Meena Verma",
                  role: "Head of Design",
                  image: "/images/home/recent-look-3.png",
                },
                {
                  name: "Arjun Malhotra",
                  role: "Head of Operations",
                  image: "/images/home/recent-look-4.png",
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl border border-[#EAEAEA] flex flex-col items-center"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={240}
                    className="w-full h-[240px] object-cover rounded-xl mb-5 bg-[#F0EFEA]"
                  />
                  <h3 className="text-lg font-bold m-0 mb-1 text-[#111]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#666] m-0 mb-4">{member.role}</p>
                  <Link href="#" className="text-[#0077b5] flex">
                   <Image 
                    src="/icons/about/linkedin-icon.png"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Decorative SVGs */}
        <svg
          viewBox="0 0 100 50"
          className="absolute -bottom-5 -right-5 w-20 h-10 -z-10 pointer-events-none scale-x-[-1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 25 L 15 10 L 30 25 L 45 10 L 60 25 L 75 10 L 90 25"
            fill="none"
            stroke="#111"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          viewBox="0 0 200 200"
          className="absolute bottom-0 left-0 w-[250px] h-[250px] -z-10 pointer-events-none scale-x-[-1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Right Dark Dots */}
          <g fill="#111" opacity="0.3">
            <circle cx="120" cy="20" r="1.5" />
            <circle cx="135" cy="15" r="1" />
            <circle cx="150" cy="25" r="1.5" />
            <circle cx="110" cy="35" r="1.5" />
            <circle cx="125" cy="40" r="1" />
            <circle cx="140" cy="35" r="1.5" />
            <circle cx="160" cy="45" r="1" />
            <circle cx="100" cy="55" r="1" />
            <circle cx="115" cy="60" r="1.5" />
            <circle cx="130" cy="55" r="1" />
            <circle cx="145" cy="65" r="1.5" />
            <circle cx="170" cy="60" r="1" />
            <circle cx="95" cy="75" r="1.5" />
            <circle cx="110" cy="80" r="1" />
            <circle cx="125" cy="75" r="1.5" />
            <circle cx="140" cy="85" r="1" />
            <circle cx="105" cy="95" r="1" />
            <circle cx="120" cy="100" r="1.5" />
            <circle cx="135" cy="95" r="1" />
          </g>

          {/* Shadow / Offset Blob */}
          <path
            fill="#2E1A1A"
            d="M 180 0 C 150 10 120 40 130 80 C 140 120 80 120 30 150 C 10 160 0 180 10 200 L 200 200 L 200 0 Z"
            transform="translate(-3, 3)"
          />

          {/* Main Wavy Red Blob */}
          <path
            fill="#FF6B6B"
            stroke="#111"
            strokeWidth="2"
            d="M 180 0 C 150 10 120 40 130 80 C 140 120 80 120 30 150 C 10 160 0 180 10 200 L 200 200 L 200 0 Z"
          />

          {/* White Dots Grid inside the Red Blob */}
          <g fill="#fff" opacity="0.8">
            <circle cx="150" cy="100" r="1" />
            <circle cx="165" cy="100" r="1" />
            <circle cx="180" cy="100" r="1" />

            <circle cx="142.5" cy="110" r="1" />
            <circle cx="157.5" cy="110" r="1" />
            <circle cx="172.5" cy="110" r="1" />
            <circle cx="187.5" cy="110" r="1" />

            <circle cx="135" cy="120" r="1" />
            <circle cx="150" cy="120" r="1" />
            <circle cx="165" cy="120" r="1" />
            <circle cx="180" cy="120" r="1" />
            <circle cx="195" cy="120" r="1" />

            <circle cx="127.5" cy="130" r="1" />
            <circle cx="142.5" cy="130" r="1" />
            <circle cx="157.5" cy="130" r="1" />
            <circle cx="172.5" cy="130" r="1" />
            <circle cx="187.5" cy="130" r="1" />

            <circle cx="105" cy="140" r="1" />
            <circle cx="120" cy="140" r="1" />
            <circle cx="135" cy="140" r="1" />
            <circle cx="150" cy="140" r="1" />
            <circle cx="165" cy="140" r="1" />
            <circle cx="180" cy="140" r="1" />
            <circle cx="195" cy="140" r="1" />

            <circle cx="97.5" cy="150" r="1" />
            <circle cx="112.5" cy="150" r="1" />
            <circle cx="127.5" cy="150" r="1" />
            <circle cx="142.5" cy="150" r="1" />
            <circle cx="157.5" cy="150" r="1" />
            <circle cx="172.5" cy="150" r="1" />
            <circle cx="187.5" cy="150" r="1" />

            <circle cx="75" cy="160" r="1" />
            <circle cx="90" cy="160" r="1" />
            <circle cx="105" cy="160" r="1" />
            <circle cx="120" cy="160" r="1" />
            <circle cx="135" cy="160" r="1" />
            <circle cx="150" cy="160" r="1" />
            <circle cx="165" cy="160" r="1" />
            <circle cx="180" cy="160" r="1" />
            <circle cx="195" cy="160" r="1" />

            <circle cx="67.5" cy="170" r="1" />
            <circle cx="82.5" cy="170" r="1" />
            <circle cx="97.5" cy="170" r="1" />
            <circle cx="112.5" cy="170" r="1" />
            <circle cx="127.5" cy="170" r="1" />
            <circle cx="142.5" cy="170" r="1" />
            <circle cx="157.5" cy="170" r="1" />
            <circle cx="172.5" cy="170" r="1" />
            <circle cx="187.5" cy="170" r="1" />

            <circle cx="45" cy="180" r="1" />
            <circle cx="60" cy="180" r="1" />
            <circle cx="75" cy="180" r="1" />
            <circle cx="90" cy="180" r="1" />
            <circle cx="105" cy="180" r="1" />
            <circle cx="120" cy="180" r="1" />
            <circle cx="135" cy="180" r="1" />
            <circle cx="150" cy="180" r="1" />
            <circle cx="165" cy="180" r="1" />
            <circle cx="180" cy="180" r="1" />
            <circle cx="195" cy="180" r="1" />

            <circle cx="37.5" cy="190" r="1" />
            <circle cx="52.5" cy="190" r="1" />
            <circle cx="67.5" cy="190" r="1" />
            <circle cx="82.5" cy="190" r="1" />
            <circle cx="97.5" cy="190" r="1" />
            <circle cx="112.5" cy="190" r="1" />
            <circle cx="127.5" cy="190" r="1" />
            <circle cx="142.5" cy="190" r="1" />
            <circle cx="157.5" cy="190" r="1" />
            <circle cx="172.5" cy="190" r="1" />
            <circle cx="187.5" cy="190" r="1" />
          </g>
        </svg>
      </div>
    </PublicShell>
  );
}
