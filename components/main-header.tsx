"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, User, Briefcase, Code, Mail, Sparkles, Cpu } from "lucide-react" // ✅ Added Cpu
import { useState, useEffect } from "react"

export function MainHeader() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "home", label: "Home", url: "#", icon: Home },
    { name: "about", label: "About", url: "#about", icon: User },
    { name: "skills", label: "Skills", url: "#skills", icon: Code },
    { name: "experience", label: "Experience", url: "#experience", icon: Briefcase },
    { name: "projects", label: "Projects", url: "#projects", icon: Sparkles },
    { name: "technologies", label: "Technologies", url: "#technologies", icon: Cpu }, // ✅ Added Technologies section
    { name: "contact", label: "Contact", url: "#contact", icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      const scrollPosition = window.scrollY + 100

      // Check if we're at the top (home section)
      if (scrollPosition < 200) {
        setActiveSection("home")
        return
      }

      // ✅ Added "technologies" in scroll tracking
      const sections = ["about", "skills", "experience", "projects", "technologies", "contact"]
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigation = (sectionName: string) => {
    setActiveSection(sectionName)

    if (sectionName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(sectionName)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? "scale-95" : "scale-100"
      }`}
    >
      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 shadow-2xl shadow-black/20">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          <span className="text-white/90 font-semibold text-sm mr-2">SA</span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.name

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`relative group px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className="transition-transform group-hover:scale-110" />
                  <span className="text-xs font-medium hidden sm:inline">{item.label}</span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl -z-10 animate-pulse"></div>
    </motion.header>
  )
}
