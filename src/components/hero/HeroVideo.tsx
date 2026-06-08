"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const FADE_IN = 0.4;
const FADE_OUT = 0.6;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const poster = posterRef.current;
    if (!video || !poster) return;

    let fadingOut = false;

    gsap.set(video, { opacity: 0 });
    gsap.set(poster, { opacity: 0 });

    function handleCanPlay() {
      fadingOut = false;
      gsap.to(video, { opacity: 0.9, duration: FADE_IN, ease: "sine.out" });
    }

    function handleTimeUpdate() {
      if (!video || !video.duration || fadingOut) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT) {
        fadingOut = true;
        gsap.to(video, { opacity: 0, duration: remaining, ease: "sine.in" });
        gsap.to(poster, { opacity: 0.9, duration: remaining, ease: "sine.in" });
      }
    }

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <>
      <div ref={posterRef} className="absolute inset-0 hidden mix-blend-multiply md:block motion-reduce:hidden">
        <Image
          src="/videos/Hero-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <video
        ref={videoRef}
        className="absolute inset-0 hidden h-full w-full object-cover mix-blend-multiply md:block motion-reduce:hidden"
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster="/videos/Hero-poster.webp"
      >
        <source
          src="/videos/Hero.stabilized.mp4"
          type="video/mp4"
          media="(min-width: 768px) and (prefers-reduced-motion: no-preference)"
        />
      </video>
    </>
  );
}
