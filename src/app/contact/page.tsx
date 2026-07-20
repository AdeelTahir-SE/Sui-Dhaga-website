"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bot,
  ChevronRight,
  Clock3,
  CreditCard,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Scissors,
  Shirt,
  Users,
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";

const helpCards = [
  {
    title: "General Support",
    copy: "Get help with orders, bookings & more",
    icon: Headphones,
  },
  {
    title: "Tailor Support",
    copy: "For tailors & partner inquiries",
    icon: Shirt,
  },
  {
    title: "AI Design Help",
    copy: "Assistance with AI design tools",
    icon: Bot,
  },
  {
    title: "Payments & Refunds",
    copy: "Payment queries & refund requests",
    icon: CreditCard,
  },
  {
    title: "Partnerships",
    copy: "Collaboration & business inquiries",
    icon: Users,
  },
];

const quickAnswers = [
  {
    question: "How do I book a tailor?",
    answer:
      "Choose a tailor from the marketplace, review their services and availability, then confirm your appointment or order request.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most standard stitching orders take 5 to 10 days. Complex bridal or heavily customized outfits may take longer depending on the tailor.",
  },
  {
    question: "Can I modify my order?",
    answer:
      "Yes, you can request changes before the tailor starts stitching. Once work begins, changes depend on the fabric, design, and order stage.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Sui Dhaga supports common digital payment options, including cards, UPI, and wallet-style payments where available.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Open your orders page to see the current status, delivery estimate, tailor updates, and any pending actions for your order.",
  },
];

export default function Page() {
  const [openAnswer, setOpenAnswer] = useState<number | null>(null);

  return (
    <PublicShell>
      <div className="contact-reference-page">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-hero-copy">
            <p className="contact-breadcrumb">Home &gt; Contact Us</p>
            <h1 id="contact-title">Get in Touch</h1>
            <p>
              We would love to hear from you. Reach out for any queries, support or
              partnership opportunities.
            </p>
          </div>

          <div className="contact-hero-art">
            <img
              src="/images/contact/support-hero.png"
              alt="Sui Dhaga support representative on a phone call"
            />
          </div>
        </section>

        <section className="contact-main-grid" aria-label="Contact form and information">
          <form className="contact-card contact-form">
            <h2>Send us a Message</h2>
            <label>
              <span>Full Name</span>
              <input placeholder="Enter your name" />
            </label>
            <label>
              <span>Email Address</span>
              <input type="email" placeholder="Enter your email" />
            </label>
            <label>
              <span>Subject</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select a subject
                </option>
                <option>General Support</option>
                <option>Tailor Support</option>
                <option>Payments & Refunds</option>
                <option>Partnerships</option>
              </select>
            </label>
            <label>
              <span>Message</span>
              <textarea placeholder="Type your message..." />
            </label>
            <button type="button">Send Message</button>
          </form>

          <div className="contact-side-stack">
            <article className="contact-card contact-info-card">
              <h2>Contact Information</h2>
              <ContactInfo icon={Mail} title="Email Us" detail="support@suidhaga.com" />
              <ContactInfo icon={Phone} title="Call Us" detail="+91 98765 43210" />
              <ContactInfo
                icon={Clock3}
                title="Business Hours"
                detail="Mon - Sat: 9:00 AM - 7:00 PM"
              />
            </article>

            <article className="contact-card contact-location-card">
              <div>
                <h2>Our Location</h2>
                <strong>Sui Dhaga HQ</strong>
                <p>123, Fashion Street, Connaught Place, New Delhi - 110001</p>
                <Link href="/tailors/map">View on Map</Link>
              </div>
              <img src="/images/contact/location-map.png" alt="Map near Sui Dhaga HQ" />
            </article>
          </div>
        </section>

        <section className="contact-card contact-help" aria-labelledby="contact-help-title">
          <h2 id="contact-help-title">How can we help you?</h2>
          <div className="contact-help-grid">
            {helpCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title}>
                  <span>
                    <Icon size={30} strokeWidth={1.8} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="contact-card contact-faq-preview" aria-labelledby="contact-quick-title">
          <div className="contact-quick-list">
            <h2 id="contact-quick-title">Quick Answers</h2>
            {quickAnswers.map((item, index) => {
              const isOpen = openAnswer === index;

              return (
                <div className="contact-quick-item" data-open={isOpen} key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenAnswer(isOpen ? null : index)}
                  >
                  {item.question}
                  <ChevronRight size={17} />
                  </button>
                  <div className="contact-quick-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="contact-faq-cta">
            <div>
              <h2>Still have questions?</h2>
              <p>Visit our full FAQ page for detailed answers.</p>
              <Link href="/faqs">Go to FAQs</Link>
            </div>
            <img src="/images/contact/faq-helper-embedded.png" alt="Sui Dhaga support helper" />
          </div>
        </section>

        <img
          className="contact-yellow-corner"
          src="/images/contact/yellow-corner.png"
          alt=""
          aria-hidden="true"
        />

        <Scissors className="contact-floating-scissors" aria-hidden="true" />
        <ReceiptText className="contact-floating-receipt" aria-hidden="true" />
        <MapPin className="contact-floating-pin" aria-hidden="true" />
      </div>
    </PublicShell>
  );
}

function ContactInfo({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof Mail;
  title: string;
  detail: string;
}) {
  return (
    <div className="contact-info-row">
      <span>
        <Icon size={22} strokeWidth={1.9} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
    </div>
  );
}
