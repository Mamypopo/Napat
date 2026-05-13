"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&";

export function TextScramble({
  text,
  className,
  style,
  delay = 0,
  duration = 900,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = Math.ceil(duration / 16);

      const tick = () => {
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * text.length);

        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " " || char === "·" || char === "—" || char === ".") return char;
              if (i < revealedCount) return char;
              return CHARSET[Math.floor(Math.random() * CHARSET.length)];
            })
            .join("")
        );

        frame++;
        if (frame <= totalFrames) requestAnimationFrame(tick);
        else setDisplay(text);
      };

      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, text, delay, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
