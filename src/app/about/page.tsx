import { PublicShell } from "@/components/common/site-shell";
import { Shield, Target, CheckCircle, Users, Wand2, Lock, Globe } from "lucide-react";
import Link from "next/link";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <Link href="/" className="text-[#666] no-underline">Home</Link> <span className="mx-2">&gt;</span> <span className="text-[#111]">About Us</span>
          </div>

          {/* Hero Section */}
          <div className="flex gap-20 items-center mb-[100px] flex-wrap">
            <div className="flex-[1_1_400px] relative">
              <h1 className="text-[56px] font-extrabold mb-6 tracking-tight leading-tight">About Sui Dhaga</h1>
              <p className="text-lg leading-relaxed text-[#555] max-w-[440px] m-0">
                Sui Dhaga is where tradition meets technology. We connect you with expert tailors and AI tools to create outfits that are uniquely yours.
              </p>
              
              {/* Decorative Motifs */}
              <div className="absolute right-10 top-2.5 text-[#FF5252]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="12" y="2" width="14" height="14" transform="rotate(45 12 2)" />
                </svg>
              </div>
              <div className="absolute right-0 bottom-0 text-[#111]">
                <svg width="60" height="20" viewBox="0 0 60 20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10" />
                </svg>
              </div>
            </div>
            <div className="flex-[1_1_400px] relative">
              {/* Background Shapes */}
              <div className="absolute -bottom-5 -left-7 w-[140px] h-[140px] bg-[#FFD13B] rounded-tl-[40px] rounded-tr-[40px] rounded-bl-none rounded-br-[40px] z-0"></div>
              <div className="absolute -bottom-5 -right-5 w-[200px] h-[160px] bg-[#14919b] rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] rounded-bl-none z-0"></div>
              <div className="absolute -top-5 right-10 w-[100px] h-[100px] bg-[#F3EFE9] rounded-full z-0"></div>
              
              <img 
                src="/images/home/category-kurtas-suits.png" 
                alt="Tailor measuring" 
                className="relative z-10 w-full h-[440px] object-cover rounded-[32px] border-8 border-white" 
              />
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-[100px]">
            <div className="bg-[#FFF7ED] p-12 rounded-3xl">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white">
                  <Shield size={28} />
                </div>
                <h2 className="text-2xl font-extrabold m-0 tracking-tight">The Problem We Solve</h2>
              </div>
              <p className="text-base leading-relaxed text-[#444] m-0">
                Finding the right tailor, explaining your style, and getting the perfect fit can be difficult and time-consuming.
              </p>
            </div>
            
            <div className="bg-[#F0F8F8] p-12 rounded-3xl">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 bg-[#14919b] rounded-full flex items-center justify-center text-white">
                  <Target size={28} />
                </div>
                <h2 className="text-2xl font-extrabold m-0 tracking-tight">Our Mission</h2>
              </div>
              <p className="text-base leading-relaxed text-[#444] m-0">
                To make custom fashion accessible, personalized, and effortless for everyone through expert tailors and AI innovation.
              </p>
            </div>
          </div>

          <hr className="border-none border-t border-[#EAEAEA] mb-20" />

          {/* For Customers */}
          <div className="flex gap-10 items-center justify-between mb-20 flex-wrap">
            {/* Left Photo */}
            <div className="flex-[1_1_300px] max-w-[350px]">
              <img 
                src="/images/about/for-customers.png" 
                alt="Happy Customer" 
                className="w-full h-[220px] object-cover rounded-3xl object-top" 
              />
            </div>
            
            {/* Middle Content */}
            <div className="flex-[1_1_300px]">
              <h2 className="text-[28px] font-extrabold mb-6 tracking-tight">For Customers</h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-5">
                <li className="flex items-center gap-4 text-base font-semibold text-[#333]">
                  <CheckCircle color="#fff" fill="#14919b" size={24} /> Verified expert tailors
                </li>
                <li className="flex items-center gap-4 text-base font-semibold text-[#333]">
                  <CheckCircle color="#fff" fill="#14919b" size={24} /> Easy booking &amp; secure payments
                </li>
                <li className="flex items-center gap-4 text-base font-semibold text-[#333]">
                  <CheckCircle color="#fff" fill="#14919b" size={24} /> Custom outfits, made just for you
                </li>
              </ul>
            </div>

            {/* Right Illustration */}
            <div className="flex-[1_1_300px] max-w-[350px] flex justify-end">
              <img 
                src="/images/about/for-customers-illustration.png" 
                alt="Tailor Illustration" 
                className="w-full max-w-[300px] object-contain" 
              />
            </div>
          </div>

          <hr className="border-none border-t border-[#EAEAEA] mb-20" />

          {/* For Tailors */}
          <div className="flex gap-20 items-center mb-20 flex-wrap-reverse">
            <div className="flex-[1_1_400px]">
              <h2 className="text-[32px] font-extrabold mb-8 tracking-tight">For Tailors</h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-6">
                <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Grow your business
                </li>
                <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Reach more customers
                </li>
                <li className="flex items-center gap-4 text-lg font-semibold text-[#333]">
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Smart tools to manage orders
                </li>
              </ul>
            </div>
            <div className="flex-[1_1_400px]">
              <img 
                src="/images/about/for-tailors.png" 
                alt="For Tailors" 
                className="w-full h-[360px] object-cover rounded-[32px]" 
              />
            </div>
          </div>

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
            <h2 className="text-[32px] font-extrabold mb-12 tracking-tight">Why Sui Dhaga?</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
              <div className="bg-white py-8 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-5">
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-[#FFD13B] rounded-full z-0"></div>
                  <Users size={32} className="relative z-10 text-[#111]" />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111]">Trusted Network<br/><span className="font-medium text-[#444]">of expert tailors</span></h3>
              </div>
              <div className="bg-white py-8 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-5">
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#14919b] rounded-lg z-0"></div>
                  <Wand2 size={32} className="relative z-10 text-[#111]" />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111]">AI-Powered<br/><span className="font-medium text-[#444]">Design Studio</span></h3>
              </div>
              <div className="bg-white py-8 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-5">
                <div className="w-12 h-12 bg-[#14919b] rounded-xl flex items-center justify-center text-white">
                  <Lock size={24} />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111]">Secure &amp; Easy<br/><span className="font-medium text-[#444]">Experience</span></h3>
              </div>
              <div className="bg-white py-8 px-6 rounded-2xl border border-[#EAEAEA] flex flex-col items-center gap-5">
                <div className="w-12 h-12 bg-[#FF5252] rounded-full flex items-center justify-center text-white">
                  <Globe size={24} />
                </div>
                <h3 className="text-base font-bold m-0 text-[#111]">Made for India,<br/><span className="font-medium text-[#444]">Loved Globally</span></h3>
              </div>
            </div>
          </div>

          <hr className="border-none border-t border-[#EAEAEA] mb-20" />

          {/* Our Team */}
          <div className="mb-[100px] text-center relative">
            <h2 className="text-[32px] font-extrabold mb-12 tracking-tight">Our Team</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              {[
                { name: 'Ayesha Khan', role: 'Co-Founder & CEO', image: '/images/home/recent-look-1.png' },
                { name: 'Rohit Sharma', role: 'Co-Founder & CTO', image: '/images/home/recent-look-2.png' },
                { name: 'Meena Verma', role: 'Head of Design', image: '/images/home/recent-look-3.png' },
                { name: 'Arjun Malhotra', role: 'Head of Operations', image: '/images/home/recent-look-4.png' }
              ].map((member, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-[#EAEAEA] flex flex-col items-center">
                  <img src={member.image} alt={member.name} className="w-full h-[240px] object-cover rounded-xl mb-5 bg-[#F0EFEA]" />
                  <h3 className="text-lg font-bold m-0 mb-1 text-[#111]">{member.name}</h3>
                  <p className="text-sm text-[#666] m-0 mb-4">{member.role}</p>
                  <a href="#" className="text-[#0077b5] flex"><LinkedinIcon /></a>
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
              <path d="M 0 25 L 15 10 L 30 25 L 45 10 L 60 25 L 75 10 L 90 25" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
              <path fill="#2E1A1A" d="M 180 0 C 150 10 120 40 130 80 C 140 120 80 120 30 150 C 10 160 0 180 10 200 L 200 200 L 200 0 Z" transform="translate(-3, 3)" />
              
              {/* Main Wavy Red Blob */}
              <path fill="#FF6B6B" stroke="#111" strokeWidth="2" d="M 180 0 C 150 10 120 40 130 80 C 140 120 80 120 30 150 C 10 160 0 180 10 200 L 200 200 L 200 0 Z" />
              
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
