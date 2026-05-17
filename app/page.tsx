import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { syncGitHubData } from '@/lib/github'

export const revalidate = 86400 // Revalidate every 24 hours

async function initializeData() {
  try {
    // Try to sync GitHub data on first load
    await syncGitHubData()
  } catch (error) {
    console.error('[v0] Initial sync error:', error)
    // Don't fail the page if sync fails
  }
}

export default async function Home() {
  // Initialize GitHub data on each page load (ISR handles caching)
  await initializeData()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="certifications">
          <Certifications />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  )
}
