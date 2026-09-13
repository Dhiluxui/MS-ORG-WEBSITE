import React from "react";
import Link from "next/link";
import { Ticket as TicketType } from "@/types/database";
import { Calendar, MapPin, Users, IndianRupee } from "lucide-react";

interface EventGridProps {
  events: TicketType[];
  pastEvents: TicketType[];
}

export function EventGrid({ events, pastEvents }: EventGridProps) {
  const EventCard = ({ event, isPast }: { event: TicketType; isPast?: boolean }) => {
    const isSoldOut = event.sold_seats >= (event.total_seats || 0);
    const isAlmostFull = !isSoldOut && event.sold_seats >= (event.total_seats || 0) * 0.8;
    const dateStr = event.event_date ? new Date(event.event_date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    }) : 'TBA';
    const fillPercent = event.total_seats ? Math.round((event.sold_seats / event.total_seats) * 100) : 0;
    const filledBlocks = Math.floor(fillPercent / 10);
    const emptyBlocks = 10 - filledBlocks;
    const asciiProgress = `[${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}]`;

    return (
      <div className={`flex flex-col bg-[#0A0A0A] border ${isPast ? 'border-[#1C1C1C] opacity-50 grayscale' : 'border-[#1C1C1C] hover:border-[#2463FF] hover:shadow-[0_0_16px_rgba(36,99,255,0.2)]'} transition-all duration-300 relative overflow-hidden group`}>
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          {isPast ? (
            <span className="font-mono text-xs px-2 py-1 bg-[#1C1C1C] text-[#999] border border-[#333]">
              [ COMPLETED ]
            </span>
          ) : isSoldOut ? (
            <span className="font-mono text-xs px-2 py-1 bg-red-900/50 text-red-400 border border-red-500/50">
              [ SOLD OUT ]
            </span>
          ) : isAlmostFull ? (
            <span className="font-mono text-xs px-2 py-1 bg-amber-900/50 text-amber-400 border border-amber-500/50">
              [ ALMOST FULL ]
            </span>
          ) : (
            <span className="font-mono text-xs px-2 py-1 bg-[#2463FF]/20 text-[#2463FF] border border-[#2463FF]/30">
              [ OPEN ]
            </span>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-orbitron text-xl font-bold text-white mb-4 group-hover:text-[#2463FF] transition-colors">
            {event.event_name}
          </h3>

          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center gap-3 text-sm text-[#999]">
              <Calendar className="w-4 h-4 text-[#4A4A4A]" />
              <span className="font-mono">{dateStr}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#999]">
              <MapPin className="w-4 h-4 text-[#4A4A4A]" />
              <span className="font-mono">{event.venue || 'TBA'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#999]">
              <Users className="w-4 h-4 text-[#4A4A4A]" />
              <span className="font-mono">
                {asciiProgress} {fillPercent}% SOLD
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white pt-2 border-t border-[#1C1C1C]">
              <IndianRupee className="w-4 h-4 text-[#2463FF]" />
              <span className="font-mono font-bold">{event.price}</span>
            </div>
          </div>

          {!isPast && !isSoldOut ? (
            <Link 
              href={`/events/${event.id}/ticket`}
              className="w-full text-center font-mono text-sm py-3 bg-white text-black hover:bg-[#2463FF] hover:text-white transition-colors"
            >
              [ BUY TICKET → ]
            </Link>
          ) : !isPast && isSoldOut ? (
            <button 
              disabled
              className="w-full text-center font-mono text-sm py-3 bg-[#1C1C1C] text-[#4A4A4A] cursor-not-allowed"
            >
              [ UNAVAILABLE ]
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-[#000000] min-h-screen relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* UPCOMING EVENTS */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-orbitron text-2xl font-bold text-white tracking-wider">
              ╔═══ UPCOMING_EVENTS ═══╗
            </h2>
            <div className="h-px bg-[#1C1C1C] flex-1"></div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[#1C1C1C] bg-[#0A0A0A]">
              <p className="font-mono text-[#4A4A4A]">&gt; NO_UPCOMING_EVENTS_FOUND</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>

        {/* PAST EVENTS */}
        {pastEvents.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-orbitron text-xl font-bold text-[#4A4A4A] tracking-wider">
                ╔═══ PAST_EVENTS ═══╗
              </h2>
              <div className="h-px bg-[#1C1C1C] flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
