"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Squares } from "@/components/ui/squares-background"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: 'Swift Express Cargo ',
      description:
        'A cargo shipping web app for USA to Bangladesh shipments. Features include real-time shipment tracking, cost calculator, user sign-up/login, and a blog section — all with a clean and responsive UI.',
      image: '/images/swift-express.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://swift-express-cargoo.netlify.app',
      githubUrl: 'https://github.com/sanoyon211/Swift_express.git',
    },
    {
      title: 'WarmHut Fashion ',
      description:
        'A modern fashion e-commerce frontend showcasing clothing products with a stylish and responsive design, built for a smooth shopping browsing experience.',
      image: '/images/warmhut.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      liveUrl: 'https://warmhut-fashion.netlify.app',
      githubUrl: 'https://github.com/sanoyon211/warmhut.git',
    },
    {
      title: 'The Nexus Social ',
      description:
        'A social media platform UI with a clean and modern interface, designed for connecting people and sharing content in a responsive layout.',
      image: '/images/nexus-social.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      liveUrl: 'https://the-nexus-social.netlify.app',
      githubUrl: 'https://github.com/sanoyon211/nexus-social.git',
    },
    {
      title: 'EduMentor ',
      description:
        'An online learning platform frontend with a bold and modern design. Built for students to explore courses and grow their skills with an intuitive and responsive layout.',
      image: '/images/edumentor.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      liveUrl: 'https://the-edumentor.netlify.app',
      githubUrl: 'https://github.com/sanoyon211/edumentor.git',
    },
    {
      title: 'Inkwell Blog ',
      description:
        'A clean and minimal blog platform UI where users can read and explore articles. Designed with a focus on readability and a smooth browsing experience.',
      image: '/images/inkwell.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      liveUrl: 'https://inkwell-the-blog.netlify.app',
      githubUrl: 'https://github.com/sanoyon211/inkwell.git',
    },
  ];

  return (
    <section id="projects" className="relative py-20 px-8 md:px-16 lg:px-24 bg-black text-white overflow-hidden">
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
          className="text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here are some of my recent projects that showcase my skills in full-stack development, UI/UX design, and
          problem-solving.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-contain bg-gray-900"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
