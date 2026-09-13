import { StoryHero } from './_components/StoryHero'
import { OriginSection } from './_components/OriginSection'
import { MilestoneTimeline } from './_components/MilestoneTimeline'
import { RosterSection } from './_components/RosterSection'
import { ValuesSection } from './_components/ValuesSection'

export const metadata = {
  title: 'Our Story - Magadh Striker Esports',
  description: 'The history, roster, and values of Magadh Striker.',
}

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1">
        <StoryHero />
        <OriginSection />
        <MilestoneTimeline />
        {/* RosterSection is a server component fetching from Supabase */}
        <RosterSection />
        <ValuesSection />
      </main>
    </div>
  )
}
