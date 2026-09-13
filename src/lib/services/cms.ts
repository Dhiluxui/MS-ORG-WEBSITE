import { createClient } from '../supabase/client';

const supabase = createClient();

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author_name: string;
  status: string;
  created_at: string;
  published_at: string | null;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, author_name, status, created_at, published_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data || [];
}
