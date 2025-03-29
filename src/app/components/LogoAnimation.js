"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoAnimation() {
  return (
    <div className="relative">
      {/* Animasyonlu çerçeve */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-4 border-purple-500 border-opacity-40"
        style={{
          boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
        }}
      />

      {/* Dönen çerçeve */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.7, rotate: 180 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-indigo-300 border-opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Animasyonlu logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 120,
        }}
        className="relative w-[300px] h-[300px] z-10"
      >
        <motion.div
          className="absolute inset-0 rounded-full opacity-40 blur-2xl -z-10"
          animate={{
            boxShadow: [
              "0 0 40px 10px rgba(168, 85, 247, 0.4)",
              "0 0 60px 15px rgba(168, 85, 247, 0.6)",
              "0 0 40px 10px rgba(168, 85, 247, 0.4)",
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: 2,
            repeatType: "reverse",
          }}
        />
        <Image
          src="/gbs_badge.PNG"
          alt="GBS Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </motion.div>

      {/* Parlayan ışık efekti */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{
          duration: 2,
          repeat: 2,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Etrafında dönen ışık noktaları */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-purple-500 blur-sm"
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            x: [0, Math.cos((i * (Math.PI * 2)) / 5) * 180],
            y: [0, Math.sin((i * (Math.PI * 2)) / 5) * 180],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2 + 0.5,
            ease: "easeOut",
          }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 10px 5px rgba(168, 85, 247, 0.5)",
          }}
        />
      ))}
    </div>
  );
}
