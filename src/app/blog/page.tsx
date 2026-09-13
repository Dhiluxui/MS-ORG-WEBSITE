import { BlogHero } from './_components/BlogHero'
import { BlogGrid } from './_components/BlogGrid'
import { NewsletterSocial } from './_components/NewsletterSocial'

export const metadata = {
  title: 'Blog & Intel - Magadh Striker Esports',
  description: 'Tournament recaps, patch analysis, and roster announcements.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1">
        <BlogHero />
        {/* BlogGrid is a Server Component fetching from Supabase */}
        <BlogGrid />
        <NewsletterSocial />
      </main>
    </div>
  )
}
