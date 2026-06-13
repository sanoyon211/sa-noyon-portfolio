"use client"

import { useState } from "react"
import { toast } from "sonner"

import { motion } from "framer-motion"
import { BackgroundPathsOnly } from "@/components/ui/background-paths"
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
      url: 'https://www.linkedin.com/in/sa-noyon/',
      color: 'hover:text-blue-400',
    },
    {
      icon: <IconBrandFacebook className="w-6 h-6" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/sa.noyon.602467',
      color: 'hover:text-blue-400',
    },
    
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const response = await fetch("https://formspree.io/f/xwvjwwkg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      
      if (response.ok) {
        toast.success("Message sent successfully!")
        form.reset()
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden min-h-screen">
      {/* Background Paths Animation */}
      <div className="absolute inset-0">
        <BackgroundPathsOnly />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-white/40 to-blue-100/40 dark:from-purple-900/20 dark:via-black/50 dark:to-purple-800/20" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-700 dark:text-neutral-300 text-center mb-12 max-w-3xl mx-auto font-medium"
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
            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl p-8 shadow-sm dark:shadow-none"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Send Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">First Name</label>
                  <Input 
                    type="text" 
                    name="firstName"
                    required
                    placeholder="John"
                    className="bg-white/80 dark:bg-white/10 border-black/10 dark:border-white/20 text-foreground placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Last Name</label>
                  <Input 
                    type="text" 
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="bg-white/80 dark:bg-white/10 border-black/10 dark:border-white/20 text-foreground placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
                <Input 
                  type="email" 
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="bg-white/80 dark:bg-white/10 border-black/10 dark:border-white/20 text-foreground placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Subject</label>
                <Input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="Project Inquiry"
                  className="bg-white/80 dark:bg-white/10 border-black/10 dark:border-white/20 text-foreground placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Message</label>
                <Textarea 
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={8}
                  className="bg-white/80 dark:bg-white/10 border-black/10 dark:border-white/20 text-foreground placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-purple-500 resize-none"
                />
              </div>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none disabled:opacity-50"
              >
                <IconSend className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
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
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 group shadow-sm dark:shadow-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-colors duration-300">
                      <div className="text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{info.title}</h4>
                      <p className="text-neutral-600 dark:text-muted-foreground group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors duration-300 font-medium dark:font-normal">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 text-neutral-600 dark:text-neutral-300 shadow-sm dark:shadow-none ${social.color}`}
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
              className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-sm border border-purple-200 dark:border-purple-500/30 rounded-xl p-6 shadow-sm dark:shadow-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h4 className="text-lg font-semibold mb-3 text-foreground">Let's Work Together</h4>
              <p className="text-neutral-700 dark:text-muted-foreground leading-relaxed text-justify tracking-tight font-medium dark:font-normal">
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