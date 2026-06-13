"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Squares } from "@/components/ui/squares-background"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { projects as staticProjects } from "@/data/projects"
import { useState, useEffect } from "react"

export function ProjectsSection() {
  const [projectsList, setProjectsList] = useState(staticProjects);
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <section id="projects" className="relative py-20 px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden">
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
          className="text-lg text-neutral-700 dark:text-neutral-300 text-center mb-12 max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here are some of my recent projects that showcase my skills in full-stack development, UI/UX design, and
          problem-solving.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg overflow-hidden hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 group hover:scale-105 shadow-sm dark:shadow-none"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-contain bg-gray-900"
                />
                <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-white/90"
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white text-foreground hover:bg-white hover:text-black bg-transparent"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-foreground">{project.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 leading-relaxed font-medium dark:font-normal">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-full text-xs text-neutral-800 dark:text-neutral-200 font-medium dark:font-normal"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-end items-center gap-4">
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
    </section>
  )
}
