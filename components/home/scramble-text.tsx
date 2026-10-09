"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARSET = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Text that resolves into `text` character by character (scramble/decode effect)
 * and re-scrambles every `repeatInterval` ms.
 */
export function ScrambleText({
  text,
  className,
  delay = 0,
  speed = 45,
  repeatInterval = 6000,
}: {
  text: string;
  className?: string;
  /** ms before the first resolve starts */
  delay?: number;
  /** ms per character step */
  speed?: number;
  /** ms between re-scrambles; 0 disables looping */
  repeatInterval?: number;
}) {
  const [output, setOutput] = useState("");
  const [glitch, setGlitch] = useState(false);
  const frame = useRef<ReturnType<typeof setInterval>>();

  const run = useCallback(() => {
    let iteration = 0;
    const length = text.length;

    setGlitch(true);

    frame.current = setInterval(() => {
      let result = "";
      for (let i = 0; i < length; i++) {
        if (i < iteration || text[i] === " ") {
          result += text[i];
        } else {
          result += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
      }

      setOutput(result);

      if (iteration >= length) {
        if (frame.current) clearInterval(frame.current);
        setGlitch(false);
      }

      iteration += 1 / 2;
    }, speed);
  }, [speed, text]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = (ms: number) => {
      timeout = setTimeout(() => {
        run();
        if (repeatInterval > 0) schedule(repeatInterval);
      }, ms);
    };

    schedule(delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
      if (frame.current) clearInterval(frame.current);
    };
  }, [delay, repeatInterval, run]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
      {glitch && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 -z-10 text-primary/60 [clip-path:inset(0_0_55%_0)] motion-safe:animate-[glitch-a_260ms_ease-in-out_infinite]"
        >
          {output}
        </span>
      )}
      {glitch && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 -z-10 text-secondary/60 [clip-path:inset(45%_0_0_0)] motion-safe:animate-[glitch-b_320ms_ease-in-out_infinite]"
        >
          {output}
        </span>
      )}
    </span>
  );
}