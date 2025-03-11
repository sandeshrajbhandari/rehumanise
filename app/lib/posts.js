import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // You'll need to install this: npm install gray-matter

const postsDirectory = path.join(process.cwd(), 'data/posts');

// Get all post data for listing
export function getAllPosts() {
  // Get filenames under /posts
  const filenames = fs.readdirSync(postsDirectory);
  
  const allPostsData = filenames.map((filename) => {
    // Remove ".md" from filename to get slug
    const slug = filename.replace(/\.md$/, '');
    
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
    };
  });
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get all post slugs
export function getAllPostSlugs() {
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames.map((filename) => {
    return {
      slug: filename.replace(/\.md$/, ''),
    };
  });
}

// Get post data by slug
export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  
  // Combine the data with the id and contentHtml
  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
  };
}