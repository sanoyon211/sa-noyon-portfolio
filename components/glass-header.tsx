"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function GlassHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-white/70 dark:bg-white/10 border-b border-neutral-200 dark:border-white/20 transition-colors duration-300"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold text-black dark:text-foreground">
          SA Noyon 
        </Link>
        <div className="flex space-x-4 items-center">
          {/* Navigation links can be added here if needed, even if sections are removed */}
          {/* <Link href="#home" className="text-foreground hover:text-muted-foreground transition-colors">Home</Link> */}
          {/* <Link href="#contact" className="text-foreground hover:text-muted-foreground transition-colors">Contact</Link> */}
          <Link href="/blog" className="text-black dark:text-foreground hover:text-neutral-500 dark:hover:text-muted-foreground transition-colors mr-4">Blog</Link>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  )
}
