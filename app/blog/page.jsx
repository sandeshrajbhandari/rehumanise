import Link from 'next/link';
import { getAllPosts } from '@/app/lib/posts';

export default function BlogIndex() {
  const posts = getAllPosts();
  
  // Generate a unique color for each post based on slug
  const getPostColor = (slug) => {
    const colors = [
      'bg-blue-100 border-blue-300 text-blue-800',
      'bg-purple-100 border-purple-300 text-purple-800',
      'bg-green-100 border-green-300 text-green-800',
      'bg-amber-100 border-amber-300 text-amber-800',
      'bg-rose-100 border-rose-300 text-rose-800',
      'bg-teal-100 border-teal-300 text-teal-800',
    ];
    const index = Math.abs(slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
    return colors[index];
  };
  
  // Get tag color - assign consistent colors to specific tags
  const getTagColor = (tag) => {
    const tagColors = {
      'react': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'nextjs': 'bg-black text-white hover:bg-gray-800',
      'javascript': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      'typescript': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'css': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
      'html': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      'tutorial': 'bg-green-100 text-green-800 hover:bg-green-200',
      'design': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'development': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    };
    
    const normalizedTag = tag.toLowerCase();
    return tagColors[normalizedTag] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };
  
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            My Blog
          </h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"></div>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
            Thoughts, stories and ideas worth sharing
          </p>
        </header>
        
        <div className="space-y-8">
          {posts.map((post) => {
            const colorClass = getPostColor(post.slug);
            // Use tags from post metadata - fallback to empty array if undefined
            const tags = post.tags || [];
            
            return (
              <article 
                key={post.slug} 
                className="border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`px-6 py-4 border-l-4 ${colorClass} flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2`}>
                  <time 
                    className="text-sm font-medium"
                    dateTime={post.date}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </time>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Link 
                          key={`${post.slug}-${tag}`}
                          href={`/tag/${tag.toLowerCase()}`}
                          className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${getTagColor(tag)}`}
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-6">{post.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      Read article
                    </Link>
                    
                    <div className="text-sm text-gray-500">
                      {post.readTime || '5 min read'}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl p-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M8 19h8M9 3v4M12 3v4M15 3v4" />
            </svg>
            <p className="text-xl font-medium">No posts found</p>
            <p>Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
}