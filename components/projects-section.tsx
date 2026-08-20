"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Squares } from "@/components/ui/squares-background"
import { ExternalLink, Eye } from "lucide-react"
import Image from "next/image"
import { projects as staticProjects, Project } from "@/data/projects"
import { useState, useEffect } from "react"
import { ProjectDetailsModal } from "@/components/project-details-modal"

export function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          setProjectsList(json.data);
        }
      })
      .catch(err => console.error("Failed to fetch projects from DB", err));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projectsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projectsList.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden">
      {/* Squares Background */}
      <div className="absolute inset-0">
        <Squares 
          direction="diagonal"
          speed={0.3}
          squareSize={50}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 text-center mb-12 max-w-3xl mx-auto font-medium px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore my recent work spanning web applications, e-commerce, and SaaS platforms. Click View Details for full specifications.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title + index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl overflow-hidden hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              {/* Image & Desktop Hover Actions */}
              <div 
                className="relative overflow-hidden cursor-pointer h-48 sm:h-52"
                onClick={() => handleOpenDetails(project)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  unoptimized={Boolean(project.image?.startsWith('data:') || project.image?.startsWith('http'))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-neutral-100 dark:bg-neutral-900"
                />
                
                {/* Desktop Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex flex-row items-center justify-center gap-3 backdrop-blur-[2px]">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 shadow-md font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, "_blank");
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Live Demo
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-md font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetails(project);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 
                    className="text-lg font-bold text-neutral-900 dark:text-white mb-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={() => handleOpenDetails(project)}
                  >
                    {project.title}
                  </h3>
                  
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/60 rounded-md text-xs font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-md text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons (Mobile & Tablet Only) */}
                <div className="flex lg:hidden items-center gap-2 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <Button
                      variant="outline"
                      className="flex-1 h-10 px-3 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold rounded-lg"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1 text-purple-500" />
                      Live Demo
                    </Button>
                  )}
                  <Button
                    className="flex-1 h-10 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-sm border-none rounded-lg"
                    onClick={() => handleOpenDetails(project)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View Details
                  </Button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border-neutral-300 dark:border-neutral-700"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border-neutral-300 dark:border-neutral-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
