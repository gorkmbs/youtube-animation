"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import LogoAnimation from "./components/LogoAnimation";

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });
  const [showContent, setShowContent] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  // Animasyon için metin
  const channelName = "@gbsonstage";

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // 1 saniye sonra içeriği göster
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    // 1.5 saniye sonra video göster
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
      // Videolar gösterildiğinde otomatik başlat
      if (videoRef1.current) videoRef1.current.play();
      if (videoRef2.current) videoRef2.current.play();
      if (videoRef3.current) videoRef3.current.play();
    }, 1500);

    // 2 saniye sonra başlığı göster
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 2000);

    // 3 saniye sonra emojileri göster
    const emojiTimer = setTimeout(() => {
      setShowEmojis(true);
    }, 3000);

    // 4 saniye sonra beğen/abone vurgusunu göster
    const ctaTimer = setTimeout(() => {
      setShowCallToAction(true);
    }, 4000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(contentTimer);
      clearTimeout(titleTimer);
      clearTimeout(videoTimer);
      clearTimeout(emojiTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  // Emoji listesi
  const emojis = ["🐱", "🎮", "🎯", "🎲", "🎪", "😺", "🐈", "🕹️"];

  // Harf animasyonları için varyantlar
  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2 + i * 0.1,
        duration: 0.8,
      },
    }),
  };

  // Harf animasyonu için varyantlar
  const letterAnimationVariants = {
    initial: { opacity: 0, y: 0, scale: 1 },
    animate: (i) => ({
      opacity: 1,
      y: i % 2 === 0 ? [-5, 0, 5, 0] : [5, 0, -5, 0],
      scale: i % 3 === 0 ? [1, 1.1, 1] : [1, 1, 1],
      textShadow: [
        "0 0 7px rgba(153, 51, 255, 0.8), 0 0 10px rgba(153, 51, 255, 0.5), 0 0 21px rgba(153, 51, 255, 0.3)",
        "0 0 20px rgba(153, 51, 255, 0.8), 0 0 30px rgba(153, 51, 255, 0.5), 0 0 41px rgba(153, 51, 255, 0.3)",
        "0 0 7px rgba(153, 51, 255, 0.8), 0 0 10px rgba(153, 51, 255, 0.5), 0 0 21px rgba(153, 51, 255, 0.3)",
      ],
      transition: {
        y: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.1,
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.05,
        },
        textShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.1,
        },
      },
    }),
  };

  // Beğen/Abone butonu için varyantlar
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(153, 51, 255, 0.8)",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Next.js hata mesajını gizleyen overlay */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="w-full h-32 bg-black"></div>
      </div>

      <AnimatePresence>
        {showContent && (
          <>
            {/* Parlayan arka plan efekti */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute w-full h-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(25,25,25,0.8) 0%, rgba(0,0,0,1) 100%)",
              }}
            />

            <motion.div
              className="absolute w-full h-full opacity-30"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.5,
                background: [
                  "radial-gradient(circle, rgba(138,58,185,0.2) 0%, rgba(0,0,0,0) 50%)",
                  "radial-gradient(circle, rgba(98,0,234,0.2) 0%, rgba(0,0,0,0) 50%)",
                  "radial-gradient(circle, rgba(153,51,255,0.2) 0%, rgba(0,0,0,0) 50%)",
                ],
              }}
              transition={{ duration: 4, repeat: 1, repeatType: "reverse" }}
            />

            {/* Logo animasyonu */}
            <motion.div className="flex justify-center items-center w-full relative z-30">
              <LogoAnimation />
            </motion.div>

            {/* Video Bölümü 1 - Sol Alt */}
            {showVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-36 left-16 w-[240px] h-[180px] rounded-xl overflow-hidden z-20 shadow-[0_0_15px_rgba(153,51,255,0.6)]"
                style={{
                  boxShadow: "0 0 20px rgba(153, 51, 255, 0.7)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 mix-blend-overlay z-10" />
                <video
                  ref={videoRef1}
                  src="/tatli_kedi.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 80%, 75% 100%, 0 100%)" /* Sağ alt köşeyi kırpıyor */,
                  }}
                />
              </motion.div>
            )}

            {/* Video Bölümü 2 - Sağ Üst */}
            {showVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-20 right-16 w-[240px] h-[180px] rounded-xl overflow-hidden z-20 shadow-[0_0_15px_rgba(153,51,255,0.6)]"
                style={{
                  boxShadow: "0 0 20px rgba(153, 51, 255, 0.7)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 mix-blend-overlay z-10" />
                <video
                  ref={videoRef2}
                  src="/tatli_kedi2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 80%)" /* Sol alt köşeyi kırpıyor */,
                  }}
                />
              </motion.div>
            )}

            {/* Video Bölümü 3 - Sol Üst */}
            {showVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-20 left-16 w-[240px] h-[180px] rounded-xl overflow-hidden z-20 shadow-[0_0_15px_rgba(153,51,255,0.6)]"
                style={{
                  boxShadow: "0 0 20px rgba(153, 51, 255, 0.7)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 mix-blend-overlay z-10" />
                <video
                  ref={videoRef3}
                  src="/tatli_kedi3.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 25% 100%, 0 80%)" /* Sol alt köşeyi kırpıyor */,
                  }}
                />
              </motion.div>
            )}

            {/* Harf harf animasyonlu kullanıcı adı */}
            {showTitle && (
              <motion.div className="z-20 absolute bottom-[15%] left-1/2 transform -translate-x-1/2">
                <div className="flex items-center justify-center mb-8 overflow-hidden">
                  <div className="flex overflow-hidden relative">
                    {/* Arka plan glow efekti */}
                    <motion.div
                      className="absolute inset-0 bg-purple-500 blur-2xl rounded-full opacity-30 -z-10"
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                    />

                    {/* Harfler */}
                    <div className="flex">
                      {channelName.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          custom={index}
                          variants={letterAnimationVariants}
                          initial="initial"
                          animate="animate"
                          className={`text-6xl font-bold ${
                            index < 1
                              ? "text-pink-500"
                              : index < 4
                              ? "text-fuchsia-500"
                              : index < 6
                              ? "text-purple-500"
                              : index < 8
                              ? "text-violet-500"
                              : "text-indigo-500"
                          }`}
                          style={{
                            display: "inline-block",
                            textShadow:
                              "0 0 15px rgba(153, 51, 255, 0.8), 0 0 30px rgba(153, 51, 255, 0.5)",
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Emoji Animasyonları */}
            {showEmojis && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {emojis.map((emoji, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-4xl z-20"
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: Math.random() * windowSize.width,
                      y: windowSize.height + 100,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1.2, 1, 0],
                      y: [
                        windowSize.height,
                        Math.random() * windowSize.height * 0.7,
                      ],
                      x: `calc(${Math.random() * windowSize.width}px + ${
                        Math.random() > 0.5 ? "+" : "-"
                      }${Math.random() * 50}px)`,
                      rotate: [0, Math.random() > 0.5 ? 360 : -360],
                    }}
                    transition={{
                      duration: 3,
                      delay: Math.random() * 1.5,
                      ease: "easeOut",
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Beğenme ve Abone Çağrısı */}
            {showCallToAction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-36 right-16 flex flex-col items-center gap-3 z-20"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full text-white shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(153, 51, 255, 0.5)",
                      "0 0 15px rgba(153, 51, 255, 0.5)",
                      "0 0 5px rgba(153, 51, 255, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, -20, 20, 0] }}
                    transition={{ duration: 1, repeat: 1, delay: 0.5 }}
                  >
                    👍
                  </motion.span>
                  <span className="font-bold">Beğenmeyi Unutma!</span>
                </motion.div>

                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 px-5 py-2 rounded-full text-white shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(220, 38, 38, 0.5)",
                      "0 0 15px rgba(220, 38, 38, 0.5)",
                      "0 0 5px rgba(220, 38, 38, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: 1, delay: 1 }}
                  >
                    🔔
                  </motion.span>
                  <span className="font-bold">Abone Ol!</span>
                </motion.div>
              </motion.div>
            )}

            {/* Yıldız parçacıkları */}
            {[...Array(15)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 bg-white rounded-full z-0"
                initial={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  x: `calc(${Math.random() * windowSize.width}px + ${
                    Math.random() > 0.5 ? "+" : "-"
                  }${Math.random() * 50}px)`,
                  y: `calc(${Math.random() * windowSize.height}px + ${
                    Math.random() > 0.5 ? "+" : "-"
                  }${Math.random() * 50}px)`,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: 1,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
