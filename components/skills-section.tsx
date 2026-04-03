"use client"

import { motion } from "framer-motion"
import { BackgroundPathsOnly } from "@/components/ui/background-paths"
import {
  IconBrandReact,
  IconBrandAdobe,
  IconBrandNodejs,
  IconBrandPython,
  IconDatabase,
  IconBrandGit,
  IconCloud,
  IconDeviceMobile,
} from "@tabler/icons-react"

// Custom Skills Card Component
const SkillsCard = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}) => {
  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
      
      {/* Icon with enhanced styling */}
      <div className="mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
        <div className="p-3 bg-blue-500/10 rounded-lg w-fit group-hover:bg-blue-500/20 transition-all duration-300">
          {icon}
        </div>
      </div>
      
      {/* Title with enhanced hover effect */}
      <h3 className="text-lg font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300 leading-relaxed">
        {description}
      </p>
      
      {/* Animated underline on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

export function SkillsSection() {
  const skills = [
    {
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript ES6+",
      icon: <IconBrandReact className="w-6 h-6" />,
    },
  
    {
      title: "Version Control",
      description: "Git, GitHub, Project Collaboration",
      icon: <IconCloud className="w-6 h-6" />,
    },

    {
      title: "Mobile Development",
      description: "React Native, Progressive Web Apps, Responsive Design",
      icon: <IconDeviceMobile className="w-6 h-6" />,
    },
    {
      title: "Programming Languages",
      description: "JavaScript",
      icon: <IconBrandPython className="w-6 h-6" />,
    },
    {
      title: "Graphics Design",
      description: "Adobe Photoshop, Adobe Illustrator ",
      icon: <IconBrandAdobe className="w-6 h-6" />,
    },
  ]

  return (
    <section id="skills" className="relative py-20 px-8 md:px-16 lg:px-24 bg-black text-white overflow-hidden">
      {/* Background Paths Animation */}
      <div className="absolute inset-0">
        <BackgroundPathsOnly />
      </div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-purple-800/20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          I'm a full-stack developer with expertise in modern web technologies. Here are the key skills and technologies
          I work with to bring ideas to life.
        </motion.p>
        
        {/* Skills Grid with consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillsCard 
                title={skill.title} 
                description={skill.description} 
                icon={skill.icon} 
                index={index} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
