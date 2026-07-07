import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Arrivals.css';

// Word component for the water flow effect
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="word">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export function Arrivals() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"]
  });

  const text = "THAT IS WHY AFTER 20 PLUS YEARS OF EXPERIENCE IN THE EXPORT MARKET. WE DECIDED TO OPEN AN ONLINE STORE FOR INDONESIAN MARKET. WE ARE DETERMINE TO GIVE YOU THE BEST FURNITURE AND SERVICE POSSIBLE.";
  const words = text.split(" ");

  return (
    <div className="arrivals-section">
      <div className="arrivals-content">
        <h4 className="arrivals-subtitle">FURNITURE HOME FURNITURE ONLINE STORE</h4>
        
        <p className="arrivals-reveal-text" ref={containerRef}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}
