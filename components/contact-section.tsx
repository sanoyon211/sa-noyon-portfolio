"use client"

import { motion } from "framer-motion"
import { Component as EtherealShadow } from "@/components/ui/ethereal-shadow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconSend,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandTiktok,
  IconBrandFacebook,
  IconBrandTwitterFilled,
  IconBrandInstagram
} from "@tabler/icons-react"

export function ContactSection() {
  const contactInfo = [
    {
      icon: <IconMail className="w-6 h-6" />,
      title: 'Email',
      value: 'sanoyon211@gmail.com',
      link: 'mailto:sanoyon211@gmail.com',
    },
    {
      icon: <IconPhone className="w-6 h-6" />,
      title: 'Phone',
      value: '01715825331',
      link: 'tel:+8801715825331',
    },
    {
      icon: <IconMapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Dhaka, Bangladesh',
      link: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <IconBrandGithub className="w-6 h-6" />,
      name: 'GitHub',
      url: 'https://github.com/sanoyon211',
      color: 'hover:text-gray-400',
    },
    {
      icon: <IconBrandLinkedin className="w-6 h-6" />,
      name: 'LinkedIn',
      url: 'www.linkedin.com/in/sa-noyon/',
      color: 'hover:text-blue-400',
    },
    {
      icon: <IconBrandFacebook className="w-6 h-6" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/sa.noyon.602467',
      color: 'hover:text-blue-400',
    },
    
  ];

  return (
    <section id="contact" className="relative py-20 px-8 md:px-16 lg:px-24 bg-black text-white overflow-hidden min-h-screen">
      {/* Ethereal Shadow Background */}
      <div className="absolute inset-0">
        <EtherealShadow
          color="rgba(147, 51, 234, 0.4)"
          animation={{ scale: 80, speed: 60 }}
          noise={{ opacity: 0.6, scale: 1.2 }}
          sizing="fill"
          className="opacity-50"
        />
      </div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/60 to-purple-800/30" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-300 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to start your next project? Let's discuss how I can help bring your ideas to life.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Send Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">First Name</label>
                  <Input 
                    type="text" 
                    placeholder="John"
                    className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Last Name</label>
                  <Input 
                    type="text" 
                    placeholder="Doe"
                    className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Subject</label>
                <Input 
                  type="text" 
                  placeholder="Project Inquiry"
                  className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                <Textarea 
                  placeholder="Tell me about your project..."
                  rows={8}
                  className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-purple-500 resize-none"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none"
              >
                <IconSend className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{info.title}</h4>
                      <p className="text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 text-neutral-300 ${social.color}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h4 className="text-lg font-semibold mb-3 text-white">Let's Work Together</h4>
              <p className="text-neutral-300 leading-relaxed text-justify tracking-tight">
                I'm always excited to take on new challenges and collaborate on innovative projects. 
                Whether you have a specific idea in mind or need help conceptualizing your next big thing, 
                I'm here to help bring your vision to life.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 