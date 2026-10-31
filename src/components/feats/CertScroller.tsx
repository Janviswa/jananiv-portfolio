"use client";

import { useCallback, useEffect, useRef } from "react";

interface CertScrollerProps {
  children: React.ReactNode;
}

const AUTOPLAY_DELAY = 2800;
const RESUME_AFTER_IDLE = 1200;
const AUTO_SCROLL_GUARD = 900;

export function CertScroller({ children }: CertScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const resumeRef = useRef<number | null>(null);
  const autoScrollGuardRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const userInteractingRef = useRef(false);
  const programmaticScrollRef = useRef(false);

  const getItems = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>(".cert-item") ?? []),
    [],
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) window.clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    const items = getItems();
    if (!track || !items.length) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    activeIndexRef.current = nearest;
    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === nearest);
      item.classList.toggle("is-centered", index === nearest);
    });
  }, [getItems]);

  const centerItem = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    const items = getItems();
    if (!track || !items.length) return;

    const safeIndex = (index + items.length) % items.length;
    const item = items[safeIndex];
    const target = item.offsetLeft + item.offsetWidth / 2 - track.clientWidth / 2;
    activeIndexRef.current = safeIndex;

    items.forEach((card, i) => {
      card.classList.toggle("is-active", i === safeIndex);
      card.classList.toggle("is-centered", i === safeIndex);
    });

    programmaticScrollRef.current = true;
    if (autoScrollGuardRef.current !== null) window.clearTimeout(autoScrollGuardRef.current);
    autoScrollGuardRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
      autoScrollGuardRef.current = null;
      updateActiveFromScroll();
    }, smooth ? AUTO_SCROLL_GUARD : 50);

    track.scrollTo({
      left: Math.max(0, Math.min(target, track.scrollWidth - track.clientWidth)),
      behavior: smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "smooth"
        : "auto",
    });
  }, [getItems, updateActiveFromScroll]);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    const track = trackRef.current;
    if (!track || getItems().length < 2 || document.hidden || userInteractingRef.current) return;

    autoplayRef.current = window.setInterval(() => {
      if (userInteractingRef.current || document.hidden) return;
      centerItem(activeIndexRef.current + 1, true);
    }, AUTOPLAY_DELAY);
  }, [centerItem, getItems, stopAutoplay]);

  const markUserMovement = useCallback(() => {
    userInteractingRef.current = true;
    programmaticScrollRef.current = false;
    if (autoScrollGuardRef.current !== null) {
      window.clearTimeout(autoScrollGuardRef.current);
      autoScrollGuardRef.current = null;
    }
    stopAutoplay();
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
  }, [stopAutoplay]);

  const scheduleResume = useCallback(() => {
    if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => {
      userInteractingRef.current = false;
      updateActiveFromScroll();
      startAutoplay();
      resumeRef.current = null;
    }, RESUME_AFTER_IDLE);
  }, [startAutoplay, updateActiveFromScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = getItems();
    if (!items.length) return;

    const first = items[0];
    const sidePadding = Math.max(12, (track.clientWidth - first.offsetWidth) / 2);
    track.style.paddingLeft = `${sidePadding}px`;
    track.style.paddingRight = `${sidePadding}px`;

    updateActiveFromScroll();
    centerItem(0, false);
    startAutoplay();

    const onScroll = () => {
      updateActiveFromScroll();
      // Programmatic autoplay scrolling should not pause its own timer.
      if (!programmaticScrollRef.current) {
        markUserMovement();
        scheduleResume();
      }
    };
    const onUserInput = () => markUserMovement();
    const onUserInputEnd = () => scheduleResume();
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        markUserMovement();
        // Keyboard scroll may happen after keydown; restart after the movement settles.
        window.setTimeout(scheduleResume, 0);
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) stopAutoplay();
      else if (!userInteractingRef.current) startAutoplay();
    };
    const onResize = () => {
      const currentItems = getItems();
      if (!currentItems.length) return;
      const pad = Math.max(12, (track.clientWidth - currentItems[0].offsetWidth) / 2);
      track.style.paddingLeft = `${pad}px`;
      track.style.paddingRight = `${pad}px`;
      centerItem(activeIndexRef.current, false);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", onUserInput, { passive: true });
    track.addEventListener("pointerdown", onUserInput, { passive: true });
    track.addEventListener("touchstart", onUserInput, { passive: true });
    track.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerup", onUserInputEnd, { passive: true });
    window.addEventListener("touchend", onUserInputEnd, { passive: true });
    window.addEventListener("touchcancel", onUserInputEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize);

    return () => {
      stopAutoplay();
      if (resumeRef.current !== null) window.clearTimeout(resumeRef.current);
      if (autoScrollGuardRef.current !== null) window.clearTimeout(autoScrollGuardRef.current);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", onUserInput);
      track.removeEventListener("pointerdown", onUserInput);
      track.removeEventListener("touchstart", onUserInput);
      track.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerup", onUserInputEnd);
      window.removeEventListener("touchend", onUserInputEnd);
      window.removeEventListener("touchcancel", onUserInputEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
    };
  }, [centerItem, getItems, markUserMovement, scheduleResume, startAutoplay, stopAutoplay, updateActiveFromScroll]);

  return (
    <div className="cert-scroller cert-scroller--autoplay">
      <div
        ref={trackRef}
        className="cert-track cert-track--autoplay"
        aria-label="Certifications carousel"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
