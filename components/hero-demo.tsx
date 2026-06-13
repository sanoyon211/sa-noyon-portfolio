"use client"

import { Scene } from "@/components/ui/hero-section"
import { Button } from "@/components/ui/button"
import { Cpu, ShieldCheck, Layers, Zap } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Cpu,
    title: "Performance",
    description: "Optimized for speed and efficiency.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Robust solutions built for stability.",
  },
  {
    icon: Layers,
    title: "Scalability",
    description: "Designed to grow with your needs.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Leveraging cutting-edge technologies.",
  },
]

// Variants for text animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Variants for button animation
const buttonContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Variants for cards animation
const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.0, // Start after buttons animation
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
}

const HeroDemo = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  const headingText = "Hi, I'm"
  const nameText = "Md Sohab Akter Noyon"
  const subheadingText = "Building the future, one line of code at a time."
  const descriptionText = "Passionate about building secure and creative web solutions using modern technologies."

  // Reset animation state on component mount
  useEffect(() => {
    setIsAnimationComplete(false)
    const timer = setTimeout(() => {
      setIsAnimationComplete(true)
    }, 100) // Complete animation after 100ms

    return () => clearTimeout(timer)
  }, [])

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactMe = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#09090b] text-black dark:text-white flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden pt-16">
      {/* Premium Background Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[150px] -z-10 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-4 flex items-center justify-center flex-col relative">
            
            <motion.h1
              className="text-2xl md:text-5xl lg:text-6xl font-semibold tracking-tight max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate={isAnimationComplete ? "visible" : "hidden"}
            >
              {headingText.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={wordVariants}
                className="inline-block mr-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm pb-2"
              >
                {nameText}
              </motion.span>
              <br />
              {subheadingText.split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-2">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl font-medium"
              variants={containerVariants}
              initial="hidden"
              animate={isAnimationComplete ? "visible" : "hidden"}
            >
              {descriptionText.split(" ").map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-1">
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto px-4 sm:px-0"
              variants={buttonContainerVariants}
              initial="hidden"
              animate={isAnimationComplete ? "visible" : "hidden"}
            >
              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={handleViewProjects}
                  className="w-full sm:w-auto text-sm px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white border border-purple-400/50 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  View Projects
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={handleContactMe}
                  className="w-full sm:w-auto text-sm px-8 py-3 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-md text-black dark:text-white border border-black/10 dark:border-white/10 shadow-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 font-medium hover:scale-105"
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Cards Section - Now follows proper sequence */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto px-2"
          variants={cardsContainerVariants}
          initial="hidden"
          animate={isAnimationComplete ? "visible" : "hidden"}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl p-5 h-36 md:h-40 flex flex-col justify-start items-start space-y-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <feature.icon size={18} className="text-foreground/80 md:w-5 md:h-5" />
              <h3 className="text-sm md:text-base font-medium">{feature.title}</h3>
              <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-tight">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0">
        <Scene />
      </div>
    </section>
  )
}

export { HeroDemo }
