'use client'

import { useState } from 'react'
import { UploadCloud, Copy, Trash2, Search, Filter } from 'lucide-react'

export default function AdminMediaLibraryPage() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  // Mock files for UI demonstration
  const [files, setFiles] = useState([
    { id: '1', name: 'hero-bg.jpg', size: '1.2 MB', url: '/hero-bg.jpg' },
    { id: '2', name: 'sponsor-logo-1.png', size: '245 KB', url: '/sponsor-logo-1.png' },
    { id: '3', name: 'tournament-cover.png', size: '3.4 MB', url: '/tournament-cover.png' }
  ])

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">MEDIA LIBRARY</h1>
          <p className="font-mono text-xs text-[#999]">Manage all uploaded assets across the site.</p>
        </div>
        
        <div className="font-mono text-[10px] text-[#4A4A4A] flex flex-col items-end gap-1">
          <div>STORAGE: [████████░░] 82% of 500MB</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Sidebar / Uploader */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0 overflow-y-auto custom-scrollbar">
          <div className="bg-[#070C1A] border border-dashed border-[#1C1C1C] hover:border-[#2463FF] transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
            <UploadCloud className="w-8 h-8 text-[#4A4A4A] group-hover:text-[#2463FF] mb-4 transition-colors" />
            <div className="font-mono text-xs text-white mb-1">DRAG & DROP FILES HERE</div>
            <div className="font-mono text-[10px] text-[#999]">OR CLICK TO BROWSE</div>
          </div>

          <div className="bg-[#070C1A] border border-[#111] p-4 flex flex-col gap-4">
            <div className="font-mono text-[10px] text-[#4A4A4A]">&gt; FILTERS</div>
            <div className="relative">
              <Search className="w-3 h-3 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search files..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white pl-8 pr-3 py-2 font-mono text-xs outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              {['ALL', 'IMAGES', 'DOCUMENTS', 'VIDEOS'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-xs text-left px-3 py-2 border-l-2 transition-colors ${
                    filter === f ? 'border-[#2463FF] text-white bg-[#111]' : 'border-transparent text-[#999] hover:text-white hover:bg-[#0A0A0A]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 bg-[#070C1A] border border-[#111] p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map(file => (
              <div key={file.id} className="group border border-[#111] hover:border-[#2463FF] bg-[#0A0A0A] flex flex-col transition-colors relative">
                <div className="aspect-square bg-[#1C1C1C] flex items-center justify-center p-2">
                  <div className="font-mono text-[10px] text-[#4A4A4A]">IMAGE_PREVIEW</div>
                </div>
                <div className="p-3">
                  <div className="font-mono text-[10px] text-white truncate mb-1" title={file.name}>{file.name}</div>
                  <div className="font-mono text-[9px] text-[#4A4A4A] mb-2">{file.size}</div>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[#999] hover:text-[#2463FF] transition-colors"><Copy className="w-3 h-3" /></button>
                    <button className="text-[#999] hover:text-red-400 transition-colors"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
