import Link from 'next/link';
import { getAllPosts } from '@/app/lib/posts';

// Generate static params for all tags used in posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set();
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(tag.toLowerCase()));
    }
  });
  
  return Array.from(tags).map(tag => ({ tag }));
}

export default function TagPage({ params }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getAllPosts();
  
  // Filter posts by tag (case-insensitive)
  const filteredPosts = posts.filter(post => 
    post.tags && post.tags.some(postTag => 
      postTag.toLowerCase() === decodedTag.toLowerCase()
    )
  );
  
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
  
  // Get tag color
  const getTagColor = (tagName) => {
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
    
    const normalizedTag = tagName.toLowerCase();
    return tagColors[normalizedTag] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };
  
  // Function to capitalize the first letter of each word
  const capitalizeTag = (tagName) => {
    return tagName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get all unique tags for the tag cloud
  const getAllTags = () => {
    const tagSet = new Set();
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag.toLowerCase()));
      }
    });
    return Array.from(tagSet);
  };
  
  const allTags = getAllTags();
  
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to all posts
          </Link>
          
          <h1 className="text-4xl font-bold mb-6 flex items-center">
            <span className={`inline-block px-3 py-1 rounded-lg mr-4 ${getTagColor(decodedTag)}`}>
              #{capitalizeTag(decodedTag)}
            </span>
            <span>Posts</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} tagged with "{capitalizeTag(decodedTag)}"
          </p>
          
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-lg font-medium mb-3">Browse all tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tagName => (
                <Link
                  key={tagName}
                  href={`/tag/${tagName.toLowerCase()}`}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    tagName.toLowerCase() === decodedTag.toLowerCase()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : getTagColor(tagName)
                  }`}
                >
                  #{capitalizeTag(tagName)}
                </Link>
              ))}
            </div>
          </div>
        </header>
        
        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const colorClass = getPostColor(post.slug);
              return (
                <article 
                  key={post.slug} 
                  className="border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group"
                >
                  <div className={`px-6 py-4 border-l-4 ${colorClass}`}>
                    <time 
                      className="text-sm font-medium"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </time>
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
                      
                      <div className="flex flex-wrap gap-2">
                        {post.tags && post.tags
                          //.filter(postTag => postTag.toLowerCase() !== decodedTag.toLowerCase())
                          .map(tag => (
                            <Link 
                              key={`${post.slug}-${tag}`}
                              href={`/tag/${tag.toLowerCase()}`}
                              className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${getTagColor(tag)}`}
                            >
                              #{tag}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl p-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-medium">No posts found</p>
              <p>There are no posts with the tag "{capitalizeTag(decodedTag)}" yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}