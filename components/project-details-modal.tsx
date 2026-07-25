"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code2, Server, Globe, Sparkles } from "lucide-react"
import Image from "next/image"
import { Project } from "@/data/projects"

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!project) return null

  // Determine repository links logic
  const hasClient = Boolean(project.githubClientUrl && project.githubClientUrl !== "#")
  const hasServer = Boolean(project.githubServerUrl && project.githubServerUrl !== "#")
  const hasSingleGithub = Boolean(project.githubUrl && project.githubUrl !== "#") && !hasClient && !hasServer

  const showBothRepos = hasClient && hasServer
  const showSingleClient = hasClient && !hasServer
  const showSingleServer = hasServer && !hasClient

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden bg-white/95 dark:bg-[#0a0a0c]/95 border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl backdrop-blur-xl rounded-2xl max-h-[90vh] flex flex-col transition-all duration-300">
        
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/20 dark:bg-purple-600/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.35, 0.15],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 dark:bg-blue-600/30 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.07]" />
        </div>

        {/* Scrollable Container */}
        <div className="relative z-10 overflow-y-auto max-h-[90vh] custom-scrollbar p-5 sm:p-7 md:p-8 space-y-6">
          
          {/* Header Image Banner */}
          <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-xl overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80 shadow-md group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Live Indicator */}
            {project.liveUrl && project.liveUrl !== "#" && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 bg-emerald-500/90 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                Live Project
              </div>
            )}
          </div>

          {/* Dialog Header Title */}
          <DialogHeader className="text-left space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {project.title}
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 rounded-lg text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 shadow-sm hover:border-purple-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Full Description */}
          <div className="space-y-2 border-t border-neutral-200/60 dark:border-neutral-800/80 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Project Description
            </h4>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line font-normal">
              {project.description}
            </p>
          </div>

          {/* Dynamic Action Buttons */}
          <div className="border-t border-neutral-200/60 dark:border-neutral-800/80 pt-5 flex flex-col sm:flex-row flex-wrap items-center gap-3">
            
            {/* Live Demo Button */}
            {project.liveUrl && project.liveUrl !== "#" && (
              <Button
                size="lg"
                className="w-full sm:w-auto flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-purple-500/20 border-none transition-all duration-300"
                onClick={() => window.open(project.liveUrl, "_blank")}
              >
                <Globe className="w-4 h-4 mr-2" />
                Live Demo
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
              </Button>
            )}

            {/* Case 1: Both Client & Server Repos */}
            {showBothRepos && (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto flex-1 border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition-all"
                  onClick={() => window.open(project.githubClientUrl, "_blank")}
                >
                  <Code2 className="w-4 h-4 mr-2 text-purple-500" />
                  Client Repo
                  <Github className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto flex-1 border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition-all"
                  onClick={() => window.open(project.githubServerUrl, "_blank")}
                >
                  <Server className="w-4 h-4 mr-2 text-blue-500" />
                  Server Repo
                  <Github className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                </Button>
              </>
            )}

            {/* Case 2: Only Client Repo */}
            {showSingleClient && (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto flex-1 border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition-all"
                onClick={() => window.open(project.githubClientUrl, "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Repo
              </Button>
            )}

            {/* Case 3: Only Server Repo */}
            {showSingleServer && (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto flex-1 border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition-all"
                onClick={() => window.open(project.githubServerUrl, "_blank")}
              >
                <Server className="w-4 h-4 mr-2 text-blue-500" />
                Server Repo
                <Github className="w-3.5 h-3.5 ml-1.5 opacity-70" />
              </Button>
            )}

            {/* Case 4: Generic Single githubUrl */}
            {hasSingleGithub && (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto flex-1 border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium transition-all"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Repo
              </Button>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
