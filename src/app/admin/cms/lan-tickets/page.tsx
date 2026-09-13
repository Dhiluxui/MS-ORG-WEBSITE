import { createClient } from '@/lib/supabase/server'
import { Edit, Trash2, Check, X, Download } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'LAN Events CMS - Admin',
}

export default async function AdminLanTicketsCMSPage() {
  const supabase = await createClient()

  // For LAN events, we have tickets grouped by event. Assuming a simple 'tickets' table for both event templates and orders for this mock.
  // Real schema would separate 'lan_events' and 'lan_tickets_orders'
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Top Section: LAN Events */}
      <div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-orbitron text-3xl font-bold text-white mb-2">LAN EVENTS</h1>
            <p className="font-mono text-xs text-[#999]">Manage offline events and ticketing.</p>
          </div>
          
          <button className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors whitespace-nowrap">
            + CREATE_EVENT
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Event Card */}
          <div className="bg-[#070C1A] border border-[#111] overflow-hidden group hover:border-[#2463FF] transition-colors">
            <div className="h-32 bg-[#1C1C1C] relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="bg-black/80 p-2 text-[#999] hover:text-[#2463FF] transition-colors"><Edit className="w-4 h-4" /></button>
                <button className="bg-black/80 p-2 text-[#999] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#4A4A4A]">COVER_IMAGE</div>
            </div>
            <div className="p-4">
              <h3 className="font-orbitron text-xl text-white mb-1">MS DELHI CHAMPIONSHIP</h3>
              <div className="font-mono text-[10px] text-[#999] mb-4">📍 DELHI, IN | 24 AUG 2026</div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="font-mono text-[9px] text-[#4A4A4A] mb-1">TICKET PRICE</div>
                  <div className="font-mono text-sm text-[#2463FF]">₹499</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-[#4A4A4A] mb-1">SEATS FILLED</div>
                  <div className="font-mono text-sm text-white">45 <span className="text-[#4A4A4A]">/ 100</span></div>
                </div>
              </div>
              
              <div className="w-full bg-[#111] h-1">
                <div className="bg-[#2463FF] h-1" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Ticket Orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-xs text-[#4A4A4A]">&gt; RECENT_TICKET_ORDERS</div>
          <button className="font-mono text-[10px] text-[#999] hover:text-white border border-[#1C1C1C] hover:border-[#4A4A4A] px-3 py-1 flex items-center gap-2 transition-colors">
            <Download className="w-3 h-3" /> DOWNLOAD ATTENDEES CSV
          </button>
        </div>

        <div className="bg-[#070C1A] border border-[#111] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">BUYER</th>
                <th className="px-4 py-3 font-normal">CONTACT</th>
                <th className="px-4 py-3 font-normal">PAYMENT</th>
                <th className="px-4 py-3 font-normal">STATUS</th>
                <th className="px-4 py-3 font-normal">TICKET CODE</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock Row */}
              <tr className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                <td className="px-4 py-3 text-white">John Doe</td>
                <td className="px-4 py-3 text-[#999]">
                  <div>Discord: user#1234</div>
                  <div>Ph: +91 9876543210</div>
                </td>
                <td className="px-4 py-3">
                  <a href="#" className="text-[#2463FF] hover:underline">[VIEW RECEIPT ↗]</a>
                </td>
                <td className="px-4 py-3">
                  <span className="text-yellow-400">PENDING</span>
                </td>
                <td className="px-4 py-3 text-[#4A4A4A]">--</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-[#4A4A4A] hover:text-green-400 transition-colors" title="Confirm Payment">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="text-[#4A4A4A] hover:text-red-400 transition-colors" title="Cancel Order">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
