'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IconDownload } from '@tabler/icons-react';
import { PurpleFlowingLights } from '@/components/ui/purple-flowing-lights';
import Image from 'next/image';

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
          About Me
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
                src="/images/sa-noyon.jpg"
                alt="Md. Sohab Akter Noyon"
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
              Hello! I'm Md Sohab Akter Noyon
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm a 22-year-old Computer Science student from Dinajpur,
              Bangladesh who enjoys building modern and responsive web
              applications. I love turning ideas into real working websites and
              continuously learning new tools to make my projects better. I'm
              focused on becoming a skilled Full-Stack Web Developer with
              expertise in the MERN Stack.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I work with both front-end and back-end technologies, including
              React.js, Next.js, Node.js, Express.js, MongoDB, and JavaScript, to create
              robust and scalable web applications.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, I enjoy exploring new technologies and
              sharpening my design skills using Figma and Adobe Photoshop. I
              believe in always learning and staying updated with the latest
              trends in web development.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                <span className="text-foreground font-medium">Age: 22</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                <span className="text-foreground font-medium">
                  Location: Bangladesh
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                <span className="text-foreground font-medium">
                  Experience: Fresher (Industrial Trainee — BD Calling IT
                  Industry)
                </span>
              </div>
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
                <a href="/Md_Sohab_Akter_Noyon_FrontEnd_Developer.pdf" download="Md_Sohab_Akter_Noyon_FrontEnd_Developer.pdf">
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
