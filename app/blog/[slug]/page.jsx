import { getAllPostSlugs, getPostBySlug } from '@/app/lib/posts';
import { remark } from 'remark';
import html from 'remark-html';
import { Metadata } from "next";

// This function tells Next.js which paths to pre-render
export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

// Fetch post data and convert markdown to HTML
async function getPostData(slug) {
  const post = getPostBySlug(slug);
  
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  
  const contentHtml = processedContent.toString();
  
  return { ...post, contentHtml };
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);
  
  return {
    title: post.title,
    description: post.description || `Blog post: ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.description || `Blog post: ${post.title}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || `Blog Author`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || `Blog post: ${post.title}`,
    }
  };
}

// The improved blog post page
export default async function Post({ params }) {
  const post = await getPostData(params.slug);
  
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <time className="block text-gray-500 mt-2">
            {new Date(post.date).toLocaleDateString('en-US', {  
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
          {post.description && (
            <p className="text-lg text-gray-600 mt-3">{post.description}</p>
          )}
           {/* Tags Section */}
         {post.tags && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        )}

        </div>
        
        {/* Blog Content */}
        <article className="prose prose-lg max-w-full text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>

       

        {/* Back Button */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center">
          <a href="/blog" className="inline-block text-lg text-blue-600 font-semibold hover:text-blue-800 transition duration-300">
            ← Back to all posts
          </a>
        </div>
        
      </div>
    </div>
  );
}
