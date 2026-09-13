import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'LAN Events - Magadh Striker Esports',
}

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })

  // Mock past events
  const pastEvents = [
    { id: '1', name: 'WINTER INVITATIONAL 2025', date: '15 DEC 2025', venue: 'MUMBAI, IN' },
    { id: '2', name: 'BGMI SHOWDOWN', date: '02 NOV 2025', venue: 'BANGALORE, IN' }
  ]

  return (
    <div className="bg-[#050505] min-h-screen pt-24 pb-20 selection:bg-[#2463FF]/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="font-mono text-xs text-[#2463FF] mb-4 tracking-[0.2em] uppercase">
            &gt; MS_EVENTS :: LAN_SCHEDULE
          </div>
          <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
            LIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2463FF] to-[#00F0FF]">EVENTS</span>
          </h1>
          <p className="font-mono text-[#999] max-w-2xl mx-auto leading-relaxed">
            Experience the thrill of offline esports. Book your tickets for upcoming LAN tournaments, meet-and-greets, and exclusive MS community events.
          </p>
        </div>

        {/* Live / Upcoming Events */}
        <div className="mb-8 font-mono text-sm text-[#4A4A4A] border-b border-[#111] pb-4">
          &gt; UPCOMING_LAN_EVENTS ({events?.length || 0})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {events?.map(event => (
            <div key={event.id} className="bg-[#0A0A0A] border border-[#111] hover:border-[#2463FF] transition-all group flex flex-col h-full">
              <div className="aspect-video bg-[#1C1C1C] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20 font-mono text-[10px] px-2 py-1 bg-[#2463FF] text-white">
                  OPEN
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[#4A4A4A]">EVENT_POSTER</div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-orbitron text-xl font-bold text-white mb-4 uppercase">{event.name || 'UNTITLED EVENT'}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#999]">
                    <Calendar className="w-4 h-4 text-[#2463FF]" />
                    <span>{event.event_date ? format(new Date(event.event_date), 'dd MMM yyyy') : 'TBA'}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#999]">
                    <MapPin className="w-4 h-4 text-[#2463FF]" />
                    <span>{event.venue || 'TBA'}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <div className="font-mono text-[10px] text-[#4A4A4A]">SEATS: 85% SOLD</div>
                    <div className="font-mono text-lg text-white">₹{event.price || 0}</div>
                  </div>
                  <div className="w-full bg-[#111] h-1 mb-6">
                    <div className="bg-[#2463FF] h-full" style={{ width: '85%' }} />
                  </div>

                  <Link href={`/events/${event.id}/ticket`} className="w-full bg-[#111] hover:bg-[#2463FF] text-white font-mono text-xs py-4 flex items-center justify-center gap-2 transition-colors border border-[#1C1C1C] hover:border-[#2463FF]">
                    <span>BUY TICKET</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {(!events || events.length === 0) && (
            <div className="col-span-full py-20 text-center border border-dashed border-[#111]">
              <div className="font-mono text-[#4A4A4A]">&gt; NO_UPCOMING_EVENTS_SCHEDULED</div>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="mb-8 font-mono text-sm text-[#4A4A4A] border-b border-[#111] pb-4">
          &gt; PAST_EVENTS
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {pastEvents.map(event => (
            <div key={event.id} className="bg-[#0A0A0A] border border-[#111] p-6 flex items-center justify-between">
              <div>
                <h4 className="font-orbitron text-lg text-white mb-2">{event.name}</h4>
                <div className="font-mono text-[10px] text-[#999]">{event.date} | {event.venue}</div>
              </div>
              <div className="font-mono text-xs text-[#4A4A4A] border border-[#111] px-3 py-1">
                COMPLETED
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
