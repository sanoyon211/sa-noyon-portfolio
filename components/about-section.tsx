'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IconDownload } from '@tabler/icons-react';
import { PurpleFlowingLights } from '@/components/ui/purple-flowing-lights';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';

export function AboutSection() {


  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      {/* Purple Flowing Lights Background */}
      <div className="absolute inset-0">
        <PurpleFlowingLights />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {portfolioData.about.title}
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[450px] aspect-square border-2 border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl">
              <Image
                src={portfolioData.about.imageSrc}
                alt={portfolioData.about.title}
                width={450}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground">
              {portfolioData.about.greeting}
            </h3>
            {portfolioData.about.descriptionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-muted-foreground leading-relaxed ${
                  index === 0 ? "text-base sm:text-lg" : "text-lg"
                }`}
              >
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-4 mt-8">
              {portfolioData.about.infoCards.map((card, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                  <span className="text-foreground font-medium">
                    {card.label}: {card.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CV Download Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                asChild
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <a href={portfolioData.about.resumeUrl} download={portfolioData.about.resumeFilename}>
                  <IconDownload className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
