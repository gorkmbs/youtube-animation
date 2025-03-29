"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function LogoAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-[380px] h-[380px]">
      {/* Arka plan ışık patlaması */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0.9, 0.4],
          scale: [0, 1.3, 1],
          background: [
            "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(0,0,0,0) 70%)",
            "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(0,0,0,0) 70%)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full blur-xl"
      />

      {/* Animasyonlu çerçeve 1 - Yavaş dönen */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2, rotate: 0 }}
        animate={{
          opacity: 0.8,
          scale: 1,
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1 },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-4 border-purple-500 border-opacity-50"
        style={{
          boxShadow: "0 0 40px rgba(168, 85, 247, 0.7)",
        }}
      />

      {/* Animasyonlu çerçeve 2 - Ters dönen */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
          opacity: 0.8,
          rotate: -360,
          borderColor: [
            "rgba(139, 92, 246, 0.6)",
            "rgba(236, 72, 153, 0.6)",
            "rgba(139, 92, 246, 0.6)",
          ],
        }}
        transition={{
          opacity: { duration: 1 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 3, repeat: Infinity, repeatType: "reverse" },
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border-2 border-indigo-300 border-opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Animasyonlu logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -30 }}
        animate={{
          opacity: 1,
          scale: [0.9, 1, 0.95, 1],
          y: 0,
          rotateY: [0, 15, 0, -15, 0],
        }}
        transition={{
          opacity: { duration: 1 },
          y: { duration: 1 },
          scale: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          },
          rotateY: {
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] z-10"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Logo glow efekti */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-60 blur-2xl -z-10"
          animate={{
            boxShadow: [
              "0 0 50px 15px rgba(168, 85, 247, 0.6)",
              "0 0 70px 20px rgba(236, 72, 153, 0.8)",
              "0 0 50px 15px rgba(168, 85, 247, 0.6)",
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Logo resmi */}
        <motion.div
          className="w-full h-full relative"
          animate={{
            filter: [
              "drop-shadow(0 0 12px rgba(168, 85, 247, 0.9))",
              "drop-shadow(0 0 20px rgba(236, 72, 153, 0.9))",
              "drop-shadow(0 0 12px rgba(168, 85, 247, 0.9))",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src="/gbs_badge.PNG"
            alt="GBS Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Parlayan ışık efekti */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Etrafında dönen ışık noktaları */}
      {isVisible &&
        [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full z-20"
            style={{
              top: "50%",
              left: "50%",
              background:
                i % 3 === 0
                  ? "linear-gradient(to right, #ec4899, #a855f7)"
                  : i % 3 === 1
                  ? "linear-gradient(to right, #a855f7, #8b5cf6)"
                  : "linear-gradient(to right, #8b5cf6, #ec4899)",
              boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.6)",
            }}
            initial={{
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.cos((i * (Math.PI * 2)) / 10) * 180],
              y: [0, Math.sin((i * (Math.PI * 2)) / 10) * 180],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2 + 0.5,
              repeat: Infinity,
              repeatDelay: 3 + i * 0.3,
            }}
          />
        ))}

      {/* Rastgele parlayan yıldızlar */}
      {isVisible &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full z-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1 + Math.random() * 1,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}

      {/* Dalgalanan enerji halkası */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0.8, 1.5, 2.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-purple-400 border-opacity-30 z-0"
      />
    </div>
  );
}
