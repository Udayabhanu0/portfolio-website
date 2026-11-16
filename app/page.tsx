import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { CursorGlow } from '@/components/cursor-glow'
import { syncGitHubData } from '@/lib/github'

export const revalidate = 86400 // Revalidate every 24 hours (ISR)

async function initializeData() {
  try {
    // Safely sync GitHub public data in background (ISR cached)
    await syncGitHubData()
  } catch (error) {
    // Graceful fallback: do not fail page render if database or GitHub API limits occur
    console.error('[v0] Initial sync error:', error)
  }
}

export default async function Home() {
  await initializeData()

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-cyan-500/20 selection:text-white">
      <CursorGlow />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
