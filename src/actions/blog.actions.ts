"use server";

import { createClient } from '@/utils/supabase/server';

export async function getBlogPosts() {
  const supabase = await createClient();
  try {
    const { data: posts, error } = await supabase
      .from('BlogPosts')
      .select('*')
      .eq('published', true)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return posts || [];
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function getBlogPostById(id: string) {
  const supabase = await createClient();
  try {
    const { data: post, error } = await supabase
      .from('BlogPosts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return post;
  } catch (error) {
    console.error(`Failed to fetch blog post ${id}:`, error);
    return null;
  }
}
