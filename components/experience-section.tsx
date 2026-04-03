"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Squares } from "@/components/ui/squares-background"
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap, Award } from "lucide-react"

export function ExperienceSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Experience',
      icon: <Briefcase className="w-8 h-8" />,
      items: [
        {
          title: 'Industrial Trainee',
          company: 'BD Calling IT Industry, Mohakhali (On-site)',
          period: '2025',
          description:
            'Completed industrial training in front-end web development using HTML, CSS, JavaScript and React.js. Gained hands-on experience in real-world project application and teamwork in a professional environment.',
        },
      ],
    },
    {
      title: 'Education',
      icon: <GraduationCap className="w-8 h-8" />,
      items: [
        {
          title: 'Diploma in Computer Science & Technology',
          company: 'Dinajpur Polytechnic Institute',
          period: '2021 - 2025',
          description:
            'Completed Diploma in Computer Science & Technology. Gained strong foundation in programming, web development, and software engineering principles.',
        },
        {
          title: 'Secondary School Certificate (SSC)',
          company: 'Setabgonj Ideal Academy',
          period: '2018 - 2021',
          description:
            'Completed SSC with a GPA of 5.00. Built a strong academic foundation in mathematics, science, and logical thinking.',
        },
        {
          title: 'Online Courses & Bootcamps',
          company: 'Various Platforms',
          period: '2019 - Present',
          description:
            'Completed multiple online courses in React and modern web development from platforms like Programming Hero and YouTube.',
        },
      ],
    },
    
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="experience" className="relative py-20 px-8 md:px-16 lg:px-24 bg-black text-white overflow-hidden">
      {/* Squares Background */}
      <div className="absolute inset-0">
        <Squares 
          direction="right"
          speed={0.2}
          squareSize={60}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Journey
        </motion.h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              {slides[currentSlide].icon}
              <h3 className="text-2xl font-semibold">{slides[currentSlide].title}</h3>
            </div>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {slides[currentSlide].items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                    <span className="text-sm text-neutral-400 mt-1 md:mt-0">{item.period}</span>
                  </div>
                  <p className="text-blue-400 font-medium mb-2">{item.company}</p>
                  <p className="text-neutral-300 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
