"use client";

import { useEffect } from "react";

export function useSwipe(cardRef: any, like: any, dislike: any, deps: any[]) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startX = 0;

    function start(e: any) {
      startX = e.touches[0].clientX;
    }

    function move(e: any) {
      if (!startX) return;
      const diff = e.touches[0].clientX - startX;
      card.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
    }

    function end(e: any) {
      const diff = e.changedTouches[0].clientX - startX;

      if (diff > 120) like();
      else if (diff < -120) dislike();

      card.style.transform = "";
      startX = 0;
    }

    card.addEventListener("touchstart", start);
    card.addEventListener("touchmove", move);
    card.addEventListener("touchend", end);

    return () => {
      card.removeEventListener("touchstart", start);
      card.removeEventListener("touchmove", move);
      card.removeEventListener("touchend", end);
    };
  }, deps);
}
