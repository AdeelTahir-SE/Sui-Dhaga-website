"use client";

import { useEffect, useState } from "react";

const stepIcons = [
  <svg key="discover" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  <svg key="customize" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  <svg key="create" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M12 9V5M8 9V5"></path></svg>,
  <svg key="receive" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
];

export function HowItWorksDeck({ steps }: { steps: string[][] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % steps.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [steps.length]);

  const goTo = (index: number) => setActive((index + steps.length) % steps.length);

  return (
    <div className="home-deck-shell">
      <div className="home-deck-stage" aria-live="polite">
        {steps.map(([title, copy], index) => {
          const offset = (index - active + steps.length) % steps.length;
          const deckPosition = offset > steps.length / 2 ? offset - steps.length : offset;
          const distance = Math.abs(deckPosition);
          const style = {
            "--deck-x": `${deckPosition * 30 - distance * 18}px`,
            "--deck-y": `${distance * 44}px`,
            "--deck-rotate": `${deckPosition * -3 - distance * 2}deg`,
            "--deck-scale": `${1 - distance * 0.045}`,
            "--deck-z": 10 - distance,
          } as React.CSSProperties;

          return (
            <article
              className="home-deck-card"
              data-active={index === active}
              key={title}
              style={style}
            >
              <span className="step-count">0{index + 1}</span>
              <div className="step-icon">{stepIcons[index]}</div>
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          );
        })}
      </div>

      <div className="home-deck-controls" aria-label="How it works steps">
        <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div>
          {steps.map(([title], index) => (
            <button
              aria-label={`Show ${title}`}
              aria-pressed={index === active}
              className="home-deck-dot"
              key={title}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>
        <button type="button" onClick={() => goTo(active + 1)} aria-label="Next step">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  );
}
