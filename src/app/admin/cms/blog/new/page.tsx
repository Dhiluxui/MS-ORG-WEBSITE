'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image'
// import LinkExtension from '@tiptap/extension-link'

export default function NewBlogPostPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '', // In a real implementation this would be from Tiptap
    category: 'MATCH REPORTS',
    author_name: 'Admin',
    author_role: 'Management',
    meta_description: '',
    status: 'draft',
    published_at: ''
  })

  /* 
  // Tiptap implementation
  const editor = useEditor({
    extensions: [StarterKit, Image, LinkExtension],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })
  */

  const handleSave = async (status: string) => {
    setIsSubmitting(true)
    const finalSlug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const { data, error } = await supabase.from('blog_posts').insert({
      title: formData.title,
      slug: finalSlug,
      content: formData.content,
      category: formData.category,
      author_name: formData.author_name,
      author_role: formData.author_role,
      status: status,
      published_at: status === 'published' ? new Date().toISOString() : null
    }).select().single()

    setIsSubmitting(false)
    if (error) {
      alert('Error saving post: ' + error.message)
    } else {
      router.push('/admin/cms/blog')
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/cms/blog" className="text-[#4A4A4A] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="font-orbitron text-2xl font-bold text-white mb-1">COMPOSE POST</h1>
          <div className="font-mono text-xs text-[#999]">&gt; CMS_AUTHORING_TOOL</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Editor */}
        <div className="flex-1 space-y-4">
          <input 
            type="text" 
            placeholder="Post Title..."
            value={formData.title}
            onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
            className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-4 font-orbitron text-2xl outline-none"
          />
          
          <div className="bg-[#0A0A0A] border border-[#1C1C1C] min-h-[500px] flex flex-col">
            <div className="border-b border-[#1C1C1C] p-2 flex gap-2">
              <span className="font-mono text-[10px] text-[#4A4A4A] px-2">&gt; TIPTAP_EDITOR_PLACEHOLDER</span>
            </div>
            <textarea
              placeholder="Write your content here..."
              value={formData.content}
              onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
              className="w-full flex-1 bg-transparent border-none text-white p-4 font-mono text-sm outline-none resize-none custom-scrollbar"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-[#070C1A] border border-[#111] p-6">
            <h3 className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; PUBLISH_SETTINGS</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-1">STATUS</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                  className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-2 font-mono text-xs outline-none"
                >
                  <option value="draft">DRAFT</option>
                  <option value="published">PUBLISHED</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-1">CATEGORY</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-2 font-mono text-xs outline-none"
                >
                  <option>MATCH REPORTS</option>
                  <option>ROSTER UPDATES</option>
                  <option>TOURNAMENTS</option>
                  <option>GAMING TIPS</option>
                  <option>ORG NEWS</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-1">SEO SLUG</label>
                <input 
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
                  placeholder="auto-generated"
                  className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-2 font-mono text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-1">FEATURED IMAGE</label>
                <div className="w-full aspect-video bg-[#0A0A0A] border border-dashed border-[#1C1C1C] hover:border-[#2463FF] transition-colors flex items-center justify-center cursor-pointer">
                  <span className="font-mono text-[10px] text-[#4A4A4A]">+ UPLOAD</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111] flex flex-col gap-3">
                <button 
                  onClick={() => handleSave('published')}
                  disabled={isSubmitting || !formData.title}
                  className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs py-3 transition-colors disabled:opacity-50"
                >
                  [PUBLISH NOW]
                </button>
                <button 
                  onClick={() => handleSave('draft')}
                  disabled={isSubmitting || !formData.title}
                  className="w-full border border-[#1C1C1C] hover:border-[#2463FF] text-[#999] hover:text-white font-mono text-xs py-3 transition-colors disabled:opacity-50"
                >
                  [SAVE DRAFT]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
