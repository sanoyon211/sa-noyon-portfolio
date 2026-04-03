'use client';

import { motion } from 'framer-motion';

export function TechnologiesSection() {
  const technologies = [
    { name: 'HTML5', image: '/images/html5-icon.png' },
    { name: 'CSS3', image: '/images/css3-icon.png' },
    { name: 'JavaScript', image: '/images/javascript-icon.png' },
    { name: 'Tailwind CSS', image: '/images/tailwind.png' },
    { name: 'React', image: '/images/react.png' },
    { name: 'VS Code', image: '/images/vscode.png' },
    { name: 'ChatGPT', image: '/images/chatgpt.png' },
    { name: 'Gemini', image: '/images/gemini.png' },
    { name: 'Github', image: '/images/github.png' },
  ];

  return (
    <section
      id="technologies"
      className="relative py-24 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white overflow-hidden"
    >
      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Title animation */}
        <motion.h2
          className="text-5xl font-extrabold mb-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Technologies, Tools & Platforms
        </motion.h2>

        {/* Icons grid with subtle hover animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 place-items-center">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                scale: 1.15,
                rotate: 3,
                transition: { duration: 0.3 },
              }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src={tech.image}
                  alt={tech.name}
                  className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                />
              </div>
              <p className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
