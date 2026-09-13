import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export const metadata = {
  title: 'Blog CMS - Admin',
}

export default async function AdminBlogCMSPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">BLOG POSTS CMS</h1>
          <p className="font-mono text-xs text-[#999]">Manage news, updates, and announcements.</p>
        </div>
        
        <Link href="/admin/cms/blog/new" className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 transition-colors inline-block text-center whitespace-nowrap">
          + NEW_POST
        </Link>
      </div>

      <div className="bg-[#070C1A] border border-[#111]">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white">
            <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
              <tr>
                <th className="px-4 py-3 font-normal">TITLE</th>
                <th className="px-4 py-3 font-normal">AUTHOR</th>
                <th className="px-4 py-3 font-normal">CATEGORY</th>
                <th className="px-4 py-3 font-normal">STATUS</th>
                <th className="px-4 py-3 font-normal">DATE</th>
                <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map(post => (
                <tr key={post.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                  <td className="px-4 py-3 font-bold text-white truncate max-w-xs">{post.title}</td>
                  <td className="px-4 py-3 text-[#999]">{post.author_name}</td>
                  <td className="px-4 py-3 text-[#999]">{post.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 border rounded-full text-[10px] ${
                      post.status === 'published' ? 'border-[#2463FF] text-[#2463FF]' :
                      'border-[#4A4A4A] text-[#999]'
                    }`}>
                      {post.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#999]">
                    {post.published_at ? format(new Date(post.published_at), 'dd MMM yyyy') : 'DRAFT'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/cms/blog/${post.id}`} className="text-[#999] hover:text-[#2463FF] transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="text-[#999] hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!posts || posts.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#4A4A4A]">
                    &gt; NO_POSTS_FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
