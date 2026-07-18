"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const floatingImages = [
  {
    className: "hero-float hero-float-main",
    src: "/images/home/hero-float-pastel-anarkali.png",
    alt: "Pastel anarkali design",
    depth: 0.5,
    baseTransform: "rotate(-3deg)",
  },
  {
    className: "hero-float hero-float-kurta",
    src: "/images/home/hero-float-cream-kurta.png",
    alt: "Cream kurta set design",
    depth: 1,
    baseTransform: "rotate(-12deg)",
  },
  {
    className: "hero-float hero-float-lehenga",
    src: "/images/home/hero-float-coral-lehenga.png",
    alt: "Coral lehenga design",
    depth: 2,
    baseTransform: "rotate(6deg)",
  },
  {
    className: "hero-float hero-float-tailor",
    src: "/images/home/hero-float-gold-saree.png",
    alt: "Gold saree design",
    depth: 1.5,
    baseTransform: "rotate(14deg)",
  },
  {
    className: "hero-float hero-float-look-one",
    src: "/images/home/hero-float-royal-blue-lehenga.png",
    alt: "Royal blue lehenga design",
    depth: 4,
    baseTransform: "rotate(-5deg)",
  },
  {
    className: "hero-float hero-float-look-two",
    src: "/images/home/hero-float-teal-sherwani.png",
    alt: "Teal sherwani design",
    depth: 2.4,
    baseTransform: "rotate(19deg)",
  },
];

const rotatingWords = ["style.", "fit.", "look.", "story.", "craft."];

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatingRefs = useRef<Array<HTMLImageElement | null>>([]);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [titleLineWidth, setTitleLineWidth] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const measure = measureRef.current;
    if (!measure) return;

    const updateWidth = () => {
      setTitleLineWidth(Math.ceil(measure.getBoundingClientRect().width));
    };

    updateWidth();
    document.fonts?.ready.then(updateWidth);
  }, [wordIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      floatingRefs.current.forEach((element, index) => {
        if (!element) return;
        const item = floatingImages[index];
        const strength = item.depth * 5;
        const x = currentX * strength;
        const y = currentY * strength;
        element.style.transform = `translate3d(${x}px, ${y}px, 0) ${item.baseTransform}`;
      });

      frame = requestAnimationFrame(render);
    };

    const updateFromPoint = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (clientX - rect.left - rect.width / 2) / (rect.width / 2)));
      targetY = Math.max(-1, Math.min(1, (clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateFromPoint(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updateFromPoint(touch.clientX, touch.clientY);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("touchmove", handleTouchMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height * 0.58), 0), 1);
      section.style.setProperty("--hero-scroll-progress", progress.toFixed(3));
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="home-hero" ref={sectionRef}>
      <div className="home-hero-floaters" aria-hidden="true">
        {floatingImages.map((image, index) => (
          <img
            key={image.src}
            ref={(element) => {
              floatingRefs.current[index] = element;
            }}
            className={image.className}
            src={image.src}
            alt=""
            draggable={false}
          />
        ))}
      </div>

      <div className="home-hero-copy">
        <h1>
          <span
            className="hero-title-line"
            style={titleLineWidth ? { width: `${titleLineWidth}px` } : undefined}
          >
            Your{" "}
            <span className="hero-rotating-word" key={rotatingWords[wordIndex]}>
              {rotatingWords[wordIndex]}
            </span>
          </span>
          <span className="hero-title-measure" ref={measureRef} aria-hidden="true">
            Your {rotatingWords[wordIndex]}
          </span>
          <span>Our craft.</span>
        </h1>
        <p>
          Discover expert tailors near you or create custom outfits with AI.
          Perfect fit, made easy.
        </p>
        <div className="button-row">
          <Link className="btn primary" href="/tailors">Find a Tailor</Link>
          <Link className="btn secondary" href="/design-studio">Start AI Designing</Link>
        </div>
      </div>
    </section>
  );
}
