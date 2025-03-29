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
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationStarting, setAnimationStarting] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  // Animasyon için metin
  const channelName = "@gbsonstage";

  // Kullanıcı etkileşimi başlatma fonksiyonu
  const startAnimation = () => {
    if (animationStarted) return;

    // 1 saniyelik gecikme ekle
    setAnimationStarting(true);

    setTimeout(() => {
      setAnimationStarted(true);
      setAnimationStarting(false);
    }, 1000); // 1 saniye gecikme
  };

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

    if (animationStarted) {
      // Toplam animasyon süresi 6 saniye, başlangıçta 1 saniye siyah ekran

      // 0.5 saniye sonra içeriği göster
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 500);

      // 1 saniye sonra video göster
      const videoTimer = setTimeout(() => {
        setShowVideo(true);
        // Videoların yüklenmesini kontrol et ve oynat
        setTimeout(() => {
          console.log("Videolar oynatılmaya çalışılıyor...");
          if (videoRef1.current) {
            console.log("Video 1 oynatılıyor");
            videoRef1.current
              .play()
              .then(() => console.log("Video 1 başarıyla oynatılıyor"))
              .catch((e) => console.error("Video 1 oynatılamadı:", e));
          }
          if (videoRef2.current) {
            console.log("Video 2 oynatılıyor");
            videoRef2.current
              .play()
              .then(() => console.log("Video 2 başarıyla oynatılıyor"))
              .catch((e) => console.error("Video 2 oynatılamadı:", e));
          }
          if (videoRef3.current) {
            console.log("Video 3 oynatılıyor");
            videoRef3.current
              .play()
              .then(() => console.log("Video 3 başarıyla oynatılıyor"))
              .catch((e) => console.error("Video 3 oynatılamadı:", e));
          }
        }, 200); // Videonun DOM'a eklenmesi için kısa bir gecikme
      }, 1000);

      // 1.5 saniye sonra başlığı göster
      const titleTimer = setTimeout(() => {
        setShowTitle(true);
      }, 1500);

      // 2.5 saniye sonra emojileri göster
      const emojiTimer = setTimeout(() => {
        setShowEmojis(true);
      }, 2500);

      // 3.5 saniye sonra beğen/abone vurgusunu göster
      const ctaTimer = setTimeout(() => {
        setShowCallToAction(true);
      }, 3500);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(titleTimer);
        clearTimeout(videoTimer);
        clearTimeout(emojiTimer);
        clearTimeout(ctaTimer);
      };
    }

    // Window yüklendiğinde bir kere dinleyici ekle
    window.addEventListener("click", startAnimation, { once: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", startAnimation);
    };
  }, [animationStarted]);

  // Emoji listesi
  const emojis = ["🐱", "🎮", "🎯", "🎲", "🎪", "😺", "🐈", "🕹️"];

  // Harf animasyonları için varyantlar
  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Harf animasyonu için varyantlar - Neon versiyonu
  const letterAnimationVariants = {
    initial: { opacity: 0, y: 0, scale: 1 },
    animate: (i) => ({
      opacity: 1,
      y: i % 2 === 0 ? [-3, 0, 3, 0] : [3, 0, -3, 0],
      scale: i % 3 === 0 ? [1, 1.05, 1] : [1, 1, 1],
      filter: [
        "drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(153, 51, 255, 0.9))",
        "drop-shadow(0 0 3px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 6px rgba(153, 51, 255, 0.9))",
        "drop-shadow(0 0 2px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 4px rgba(153, 51, 255, 0.9))",
      ],
      textShadow: [
        "0 0 5px #fff, 0 0 7px #fff, 0 0 15px rgba(153, 51, 255, 0.8), 0 0 30px rgba(153, 51, 255, 0.6)",
        "0 0 5px #fff, 0 0 10px #fff, 0 0 20px rgba(153, 51, 255, 0.8), 0 0 40px rgba(153, 51, 255, 0.6)",
        "0 0 5px #fff, 0 0 7px #fff, 0 0 15px rgba(153, 51, 255, 0.8), 0 0 30px rgba(153, 51, 255, 0.6)",
      ],
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.05,
        },
        scale: {
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.05,
        },
        filter: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.07,
        },
        textShadow: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.07,
        },
      },
    }),
  };

  // Video animasyonları için varyantlar - Hızlandırılmış
  const videoContainerVariants = {
    animate1: {
      scale: [1, 1.03, 0.98, 1],
      rotate: [0, 1, -1, 0],
      transition: {
        scale: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        },
        rotate: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
    animate2: {
      scale: [1, 0.97, 1.05, 1],
      rotate: [0, -1, 2, 0],
      transition: {
        scale: {
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse",
        },
        rotate: {
          duration: 4.5,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
    animate3: {
      scale: [1, 1.02, 0.95, 1],
      rotate: [0, 1.5, -0.5, 0],
      transition: {
        scale: {
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
        },
        rotate: {
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
  };

  // Beğen/Abone butonu için varyantlar
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(153, 51, 255, 0.8)",
    },
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden"
      onClick={startAnimation}
    >
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
              transition={{ duration: 0.8 }}
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
              transition={{ duration: 3, repeat: 1, repeatType: "reverse" }}
            />

            {/* Logo animasyonu */}
            <motion.div className="flex justify-center items-center w-full relative z-30">
              <LogoAnimation />
            </motion.div>

            {/* Video Bölümü 1 - Sol Alt */}
            {showVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.03, 0.98, 1],
                  rotate: [0, 1, -1, 0],
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                className="absolute bottom-36 left-16 w-[240px] h-[180px] rounded-xl overflow-hidden z-20 shadow-[0_0_15px_rgba(153,51,255,0.6)]"
                style={{
                  boxShadow: "0 0 20px rgba(153, 51, 255, 0.7)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 mix-blend-overlay z-10"
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <video
                  ref={videoRef1}
                  src="/tatli_kedi.mp4"
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
                animate={{
                  opacity: 1,
                  scale: [1, 0.97, 1.05, 1],
                  rotate: [0, -1, 2, 0],
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  scale: {
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  rotate: {
                    duration: 4.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                className="absolute top-20 right-16 w-[240px] h-[180px] rounded-xl overflow-hidden z-20 shadow-[0_0_15px_rgba(153,51,255,0.6)]"
                style={{
                  boxShadow: "0 0 20px rgba(153, 51, 255, 0.7)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 mix-blend-overlay z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <video
                  ref={videoRef2}
                  src="/tatli_kedi2.mp4"
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
                animate={{
                  opacity: 1,
                  scale: [1, 1.02, 0.95, 1],
                  rotate: [0, 1.5, -0.5, 0],
                  y: 0,
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  rotate: {
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                className="absolute top-20 left-16 w-[240px] h-[180px] rounded-xl overflow-hidden z-20 shadow-[0_0_15px_rgba(153,51,255,0.6)]"
                style={{
                  boxShadow: "0 0 20px rgba(153, 51, 255, 0.7)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 mix-blend-overlay z-10"
                  animate={{
                    opacity: [0.5, 0.65, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <video
                  ref={videoRef3}
                  src="/tatli_kedi3.mp4"
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
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="z-20 absolute bottom-[15%] left-1/2 transform -translate-x-1/2"
              >
                <div className="flex items-center justify-center mb-8 overflow-hidden">
                  <div className="text-center relative">
                    {/* Arka plan glow efekti */}
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full opacity-30 blur-3xl"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [0.8, 1.2, 0.8],
                        background: [
                          "radial-gradient(circle, rgba(153,51,255,0.4) 0%, rgba(153,51,255,0.1) 70%, rgba(0,0,0,0) 100%)",
                          "radial-gradient(circle, rgba(138,58,185,0.4) 0%, rgba(138,58,185,0.1) 70%, rgba(0,0,0,0) 100%)",
                          "radial-gradient(circle, rgba(153,51,255,0.4) 0%, rgba(153,51,255,0.1) 70%, rgba(0,0,0,0) 100%)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                    />

                    {/* Katmanlı neon efekti */}
                    <div className="relative">
                      {/* 1. Katman: En alttaki bulanık glow */}
                      <div
                        aria-hidden
                        className="absolute blur-xl inset-0 opacity-70"
                        style={{
                          color: "#5D26C1",
                          transform: "translateY(2px)",
                          filter: "blur(10px)",
                        }}
                      >
                        {channelName}
                      </div>

                      {/* 2. Katman: Orta bulanık glow */}
                      <div
                        aria-hidden
                        className="absolute blur-md inset-0 opacity-90"
                        style={{
                          color: "#7B2FF7",
                          transform: "translateY(1px)",
                          filter: "blur(4px)",
                        }}
                      >
                        {channelName}
                      </div>

                      {/* 3. Katman: Dış kontur */}
                      <div
                        aria-hidden
                        className="absolute blur-[1px] inset-0 opacity-90"
                        style={{
                          color: "transparent",
                          WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                        }}
                      >
                        {channelName}
                      </div>

                      {/* 4. Katman: Esas görünen metin */}
                      <h1
                        className="text-7xl relative z-10 text-white"
                        style={{
                          fontFamily: "var(--font-pacifico)",
                          fontWeight: 400,
                          textShadow:
                            "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #9333EA, 0 0 20px #9333EA, 0 0 25px #9333EA",
                          animation: "flicker 3s linear infinite",
                        }}
                      >
                        {channelName}
                      </h1>
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
                      duration: 2.5,
                      delay: Math.random() * 0.8,
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
                transition={{ duration: 0.4 }}
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
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, -20, 20, 0] }}
                    transition={{ duration: 0.7, repeat: 1, delay: 0.2 }}
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
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.7, repeat: 1, delay: 0.5 }}
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
                  duration: Math.random() * 2 + 1.5,
                  repeat: 1,
                  delay: Math.random() * 1.5,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {!animationStarted && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50 cursor-pointer">
          {!animationStarting && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full animate-pulse">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-white text-2xl"
              >
                Animasyonu başlatmak için tıkla!
              </motion.div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes flicker {
          0%,
          19.999%,
          22%,
          62.999%,
          64%,
          64.999%,
          70%,
          100% {
            opacity: 1;
          }
          20%,
          21.999%,
          63%,
          63.999%,
          65%,
          69.999% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
