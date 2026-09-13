"use client";
import React, { useState } from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';

const categories = ['ALL', 'MATCH REPORTS', 'ROSTER UPDATES', 'TOURNAMENTS', 'TIPS', 'ORG NEWS'];

// Removed mock data

export function BlogGrid({ initialPosts = [] }: { initialPosts?: any[] }) {
  const [activeCat, setActiveCat] = useState('ALL');

  const filteredPosts = initialPosts.filter(p => activeCat === 'ALL' || p.category === activeCat);
  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <section className="py-12 bg-ms-deep-black min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-ms-border-dark pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`font-ascii text-xs px-4 py-2 border border-dashed transition-all ${
                activeCat === cat 
                  ? 'border-ms-blue text-ms-white bg-ms-blue-dim border-solid shadow-[inset_4px_0_0_#2463FF]' 
                  : 'border-ms-border-dark text-ms-white-60 hover:text-ms-white hover:border-ms-white-30'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <TerminalCard className="p-0 overflow-hidden group hover:border-ms-blue transition-colors">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 aspect-[16/9] lg:aspect-auto bg-ms-true-black relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 bg-ms-white-10 flex items-center justify-center font-ascii text-ms-white-30">IMG_FEATURED</div>
                </div>
                <div className="lg:w-1/3 p-8 flex flex-col justify-center">
                  <div className="font-ascii text-xs text-ms-blue mb-4">
                    &gt; {featuredPost.category}
                  </div>
                  <h2 className="font-orbitron font-bold text-3xl text-ms-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <div className="font-ascii text-[10px] text-ms-white-60 mb-6 space-y-1">
                    <div>&gt; WRITTEN_BY :: {featuredPost.author}</div>
                    <div>&gt; ROLE       :: {featuredPost.role}</div>
                    <div>&gt; DATE       :: {featuredPost.date}</div>
                  </div>
                  <p className="font-inter text-ms-white-90 mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <button className="mt-auto self-start font-ascii text-xs text-ms-white hover:text-ms-blue transition-colors">
                    [READ MORE →]
                  </button>
                </div>
              </div>
            </TerminalCard>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-ms-border-dark bg-ms-true-black">
            <div className="font-ascii text-ms-white-30 mb-4 text-xs">
              <pre>
{`[ NO DATA DETECTED ]`}
              </pre>
            </div>
            <p className="font-orbitron text-ms-white-60 uppercase">Incoming transmissions pending.</p>
          </div>
        )}

        {/* Regular Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {regularPosts.map(post => (
              <TerminalCard key={post.id} className="p-0 overflow-hidden group hover:border-ms-blue transition-colors flex flex-col h-full">
                <div className="aspect-[16/9] bg-ms-true-black relative grayscale group-hover:grayscale-0 transition-all duration-700 border-b border-ms-border-dark">
                   <div className="absolute inset-0 bg-ms-white-10 flex items-center justify-center font-ascii text-[10px] text-ms-white-30">
                     {post.imageUrl ? (
                       <img src={post.imageUrl} alt={post.title} className="object-cover w-full h-full opacity-50 group-hover:opacity-100 transition-opacity" />
                     ) : (
                       `IMG_${post.id}`
                     )}
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="font-ascii text-[10px] text-ms-white-60 mb-3">
                    &gt; {post.category || 'GENERAL'}
                  </div>
                  <h3 className="font-rajdhani font-bold text-xl text-ms-white mb-4 uppercase leading-snug">
                    {post.title}
                  </h3>
                  <div className="font-ascii text-[10px] text-ms-white-30 mb-4">
                    {new Date(post.createdAt || post.date).toLocaleDateString()} // {post.authorId || post.author}
                  </div>
                  <p className="font-inter text-sm text-ms-white-90 mb-6 flex-grow">
                    {post.excerpt || post.content?.substring(0, 100) + '...'}
                  </p>
                  <button className="mt-auto self-start font-ascii text-xs text-ms-white hover:text-ms-blue transition-colors">
                    [READ →]
                  </button>
                </div>
              </TerminalCard>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center items-center gap-4 font-jetbrains text-sm">
            <button className="text-ms-white-60 hover:text-ms-white">← PREV</button>
            <button className="text-ms-blue font-bold">[1]</button>
            <button className="text-ms-white-60 hover:text-ms-white">[2]</button>
            <button className="text-ms-white-60 hover:text-ms-white">[3]</button>
            <button className="text-ms-white-60 hover:text-ms-white">NEXT →</button>
          </div>
        )}

      </div>
    </section>
  );
}
