"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function GlassHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-white/10 border-b border-white/20"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold text-white">
          Muhammad Musa Khan 
        </Link>
        <div className="flex space-x-4">
          {/* Navigation links can be added here if needed, even if sections are removed */}
          {/* <Link href="#home" className="text-white hover:text-neutral-300 transition-colors">Home</Link> */}
          {/* <Link href="#contact" className="text-white hover:text-neutral-300 transition-colors">Contact</Link> */}
        </div>
      </nav>
    </motion.header>
  )
}
