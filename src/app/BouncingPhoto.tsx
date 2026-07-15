"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SIZE = 120;
const SPEED = 1.35;

export function BouncingPhoto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 40;
    let y = 80;
    let vx = SPEED;
    let vy = SPEED * 0.85;
    let raf = 0;
    let reduced = false;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      reduced = mq.matches;
    };
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const tick = () => {
      if (!reduced) {
        const maxX = Math.max(0, window.innerWidth - SIZE);
        const maxY = Math.max(0, window.innerHeight - SIZE);

        x += vx;
        y += vy;

        if (x <= 0) {
          x = 0;
          vx = Math.abs(vx);
        } else if (x >= maxX) {
          x = maxX;
          vx = -Math.abs(vx);
        }

        if (y <= 0) {
          y = 0;
          vy = Math.abs(vy);
        } else if (y >= maxY) {
          y = maxY;
          vy = -Math.abs(vy);
        }

        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-50 will-change-transform"
      style={{ width: SIZE, height: SIZE }}
      aria-hidden
    >
      <Image
        src="/camper.png"
        alt=""
        width={SIZE}
        height={SIZE}
        className="h-full w-full rounded-full border-4 border-white object-cover shadow-[0_10px_28px_rgba(30,58,95,0.28)]"
        priority
      />
    </div>
  );
}
