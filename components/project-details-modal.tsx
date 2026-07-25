"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code2, Server, Globe } from "lucide-react"
import { PurpleFlowingLights } from "@/components/ui/purple-flowing-lights"
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
        
        {/* Purple Flowing Lights Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <PurpleFlowingLights />
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
          </div>

          {/* Dialog Header Title */}
          <DialogHeader className="text-left space-y-2">
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {project.title}
            </DialogTitle>
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
          <div className="border-t border-neutral-200/60 dark:border-neutral-800/80 pt-5 flex flex-col sm:flex-row flex-wrap items-center gap-3.5">
            
            {/* Live Demo Button */}
            {project.liveUrl && project.liveUrl !== "#" && (
              <Button
                className="w-full sm:w-auto flex-1 h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/20 border-none transition-all duration-300 active:scale-[0.98]"
                onClick={() => window.open(project.liveUrl, "_blank")}
              >
                <Globe className="w-5 h-5 mr-2" />
                Live Demo
                <ExternalLink className="w-4 h-4 ml-2 opacity-80" />
              </Button>
            )}

            {/* Case 1: Both Client & Server Repos */}
            {showBothRepos && (
              <>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex-1 h-12 px-6 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
                  onClick={() => window.open(project.githubClientUrl, "_blank")}
                >
                  <Code2 className="w-5 h-5 mr-2 text-purple-500" />
                  Client Repo
                  <Github className="w-4 h-4 ml-2 opacity-70" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex-1 h-12 px-6 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
                  onClick={() => window.open(project.githubServerUrl, "_blank")}
                >
                  <Server className="w-5 h-5 mr-2 text-blue-500" />
                  Server Repo
                  <Github className="w-4 h-4 ml-2 opacity-70" />
                </Button>
              </>
            )}

            {/* Case 2: Only Client Repo */}
            {showSingleClient && (
              <Button
                variant="outline"
                className="w-full sm:w-auto flex-1 h-12 px-6 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
                onClick={() => window.open(project.githubClientUrl, "_blank")}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub Repo
              </Button>
            )}

            {/* Case 3: Only Server Repo */}
            {showSingleServer && (
              <Button
                variant="outline"
                className="w-full sm:w-auto flex-1 h-12 px-6 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
                onClick={() => window.open(project.githubServerUrl, "_blank")}
              >
                <Server className="w-5 h-5 mr-2 text-blue-500" />
                Server Repo
                <Github className="w-4 h-4 ml-2 opacity-70" />
              </Button>
            )}

            {/* Case 4: Generic Single githubUrl */}
            {hasSingleGithub && (
              <Button
                variant="outline"
                className="w-full sm:w-auto flex-1 h-12 px-6 rounded-xl border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm sm:text-base transition-all active:scale-[0.98]"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub Repo
              </Button>
            )}

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
