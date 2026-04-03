"use client"

import { HeroDemo } from "@/components/hero-demo"
import { MainHeader } from "@/components/main-header"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { WhyChooseMeSection } from "@/components/why-choose-me-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechnologiesSection } from "@/components/technologies-section"
import { ContactSection } from "@/components/contact-section"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#000] text-white">
      <MainHeader />
      <main>
        <HeroDemo />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <WhyChooseMeSection />
        <ProjectsSection />
        <TechnologiesSection />
        <ContactSection />
      </main>
      {/* Footer */}
      <footer className="py-8 px-8 md:px-16 lg:px-24 bg-[#000] text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} SA Noyon. All rights reserved.</p>
      </footer>
    </div>
  )
}
