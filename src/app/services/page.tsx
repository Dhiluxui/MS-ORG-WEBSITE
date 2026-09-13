import { ServicesHero } from './_components/ServicesHero'
import { ServicesGrid } from './_components/ServicesGrid'
import { StreamingAndGames } from './_components/StreamingAndGames'
import { SponsorshipTiers } from './_components/SponsorshipTiers'
import { ContactSection } from './_components/ContactSection'

export const metadata = {
  title: 'Services - Magadh Striker Esports',
  description: 'Full-stack esports offerings, tournament hosting, and sponsorships.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1">
        <ServicesHero />
        <ServicesGrid />
        <StreamingAndGames />
        <SponsorshipTiers />
        <ContactSection />
      </main>
    </div>
  )
}
