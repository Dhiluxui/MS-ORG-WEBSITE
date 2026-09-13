import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export async function BlogGrid() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, category, featured_image, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    return (
      <div className="py-20 text-center font-mono text-[#4A4A4A]">
        ERROR_LOADING_DATA
      </div>
    )
  }

  return (
    <section className="bg-black py-20 min-h-[50vh]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id}
              className="group block bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#2463FF] transition-colors"
            >
              <div className="aspect-video relative bg-[#111] overflow-hidden">
                {post.featured_image ? (
                  <Image 
                    src={post.featured_image} 
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#4A4A4A]">
                    NO_MEDIA
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-[#1C1C1C] px-3 py-1 font-mono text-[10px] text-white">
                  {post.category?.toUpperCase() || 'GENERAL'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="font-mono text-xs text-[#999] mb-3">
                  {post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : ''}
                </div>
                <h3 className="font-rajdhani font-bold text-xl text-white mb-4 group-hover:text-[#2463FF] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="font-mono text-xs text-[#4A4A4A] group-hover:text-white transition-colors">
                  READ_MORE &gt;
                </div>
              </div>
            </Link>
          ))}
          
          {(!posts || posts.length === 0) && (
            <div className="col-span-full py-20 text-center font-mono text-[#4A4A4A] border border-dashed border-[#1C1C1C]">
              &gt; NO_RECORDS_FOUND
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
