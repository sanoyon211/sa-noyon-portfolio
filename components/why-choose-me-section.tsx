"use client"

import { motion } from "framer-motion"
import { BackgroundPathsOnly } from "@/components/ui/background-paths"
import {
  IconRocket,
  IconUsers,
  IconClock,
  IconShield,
  IconBulb,
  IconTrendingUp,
  IconHeart,
  IconStar,
} from "@tabler/icons-react"

// Custom Why Choose Me Card Component
const WhyChooseCard = ({
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
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
      
      {/* Icon with enhanced styling */}
      <div className="mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
        <div className="p-3 bg-purple-500/10 rounded-lg w-fit group-hover:bg-purple-500/20 transition-all duration-300">
          {icon}
        </div>
      </div>
      
      {/* Title with enhanced hover effect */}
      <h3 className="text-lg font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300 leading-relaxed">
        {description}
      </p>
      
      {/* Animated underline on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 ease-out" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

export function WhyChooseMeSection() {
  const reasons = [
    {
  title: "Fast Delivery",
  description: "I deliver projects on time with good quality and clear communication throughout the process.",
  icon: <IconRocket className="w-6 h-6" />,
},

    {
      title: "Collaborative Approach",
      description:
        "I work closely with clients, ensuring clear communication and regular updates throughout the project.",
      icon: <IconUsers className="w-6 h-6" />,
    },
    {
      title: "24/7 Support",
      description: "Available for support and maintenance even after project completion. Your success is my priority.",
      icon: <IconClock className="w-6 h-6" />,
    },
    {
      title: "Secure & Reliable",
      description: "I follow industry best practices for security and write clean, maintainable code.",
      icon: <IconShield className="w-6 h-6" />,
    },
    {
      title: "Innovative Solutions",
      description: "I bring creative problem-solving skills and stay updated with the latest technologies.",
      icon: <IconBulb className="w-6 h-6" />,
    },
    {
      title: "Scalable Architecture",
      description: "I build applications that can grow with your business needs and handle increased traffic.",
      icon: <IconTrendingUp className="w-6 h-6" />,
    },
    {
      title: "Passionate Developer",
      description: "I genuinely love what I do, and this passion reflects in the quality of my work.",
      icon: <IconHeart className="w-6 h-6" />,
    },
   {
  title: "Satisfied Clients",
  description: "Delivered multiple freelance projects successfully with positive client feedback and consistent results.",
  icon: <IconStar className="w-6 h-6" />,
},

  ]

  return (
    <section className="relative py-20 px-8 md:px-16 lg:px-24 bg-black text-white overflow-hidden">
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
          Why Choose Me?
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here's what sets me apart as a developer and why clients choose to work with me for their projects.
        </motion.p>
        
        {/* Reasons Grid with consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WhyChooseCard 
                title={reason.title} 
                description={reason.description} 
                icon={reason.icon} 
                index={index} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
