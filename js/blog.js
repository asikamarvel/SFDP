/* ================================================
   Blog System - Load and Display Blog Posts
   ================================================ */

console.log('Blog.js file loaded');

// Load blog index from JSON
async function loadBlogIndex() {
  try {
    console.log('Fetching blog-index.json...');
    const response = await fetch('blog/blog-index.json');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blogIndex = await response.json();
    console.log('Blog index fetched successfully, count:', blogIndex.length);
    return blogIndex.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
  } catch (error) {
    console.error('Error loading blog index:', error);
    return [];
  }
}

// Format date to readable format
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString + 'T00:00:00Z').toLocaleDateString('en-US', options);
}

// Render blog cards on editorials page
async function renderBlogCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Blog container not found');
    return;
  }

  console.log('Loading blog index...');
  const blogs = await loadBlogIndex();
  console.log('Blogs loaded:', blogs);
  
  if (blogs.length === 0) {
    console.warn('No blog posts found in index');
    container.innerHTML = '<p>No blog posts found.</p>';
    return;
  }

  let html = '<div class="blog-grid">';
  
  blogs.forEach(blog => {
    const readMoreLink = `blog-post.html?slug=${blog.slug}`;
    html += `
      <article class="blog-card scroll-animate">
        <div class="blog-card-content">
          <div class="blog-meta">
            <time datetime="${blog.date}">${formatDate(blog.date)}</time>
          </div>
          <h3 class="blog-title">${blog.title}</h3>
          <a href="${readMoreLink}" class="blog-link">
            Read More
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
  
  // Re-trigger scroll animations if available
  if (typeof initScrollAnimations === 'function') {
    initScrollAnimations();
  }
}

// Load and display individual blog post
async function loadBlogPost(slug) {
  try {
    // First, get the blog metadata from index
    const blogIndex = await loadBlogIndex();
    const blogMeta = blogIndex.find(b => b.slug === slug);
    
    const response = await fetch(`blog/${slug}.md`);
    const content = await response.text();
    
    // Remove frontmatter and extract it
    let frontmatter = {};
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      const titleMatch = frontmatterText.match(/title:\s*"(.+?)"/);
      const dateMatch = frontmatterText.match(/date:\s*(\d{4}-\d{2}-\d{2})/);
      frontmatter.title = titleMatch ? titleMatch[1] : slug;
      frontmatter.date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    }
    
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
    
    // Convert markdown to HTML (basic conversion)
    const html = markdownToHtml(contentWithoutFrontmatter);
    
    return {
      content: html,
      slug: slug,
      title: frontmatter.title || (blogMeta ? blogMeta.title : slug),
      date: frontmatter.date || (blogMeta ? blogMeta.date : new Date().toISOString().split('T')[0])
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__( .*?)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Line breaks to paragraphs
  html = html.split('\n\n').map(para => {
    if (para.trim()) {
      if (para.startsWith('<h') || para.startsWith('<ul') || para.startsWith('<ol') || para.startsWith('<figure') || para.startsWith('<img')) {
        return para;
      }
      return `<p>${para.trim()}</p>`;
    }
    return '';
  }).join('\n');
  
  // Single line breaks
  html = html.replace(/\n(?!<)/g, '<br>\n');
  
  return html;
}

// Initialize blog system on page load
console.log('Setting up blog system initialization...');

// Try to initialize immediately
if (document.readyState === 'loading') {
  console.log('Document still loading, adding DOMContentLoaded listener');
  document.addEventListener('DOMContentLoaded', initBlogSystem);
} else {
  console.log('Document already loaded, initializing now');
  // If DOMContentLoaded has already fired
  initBlogSystem();
}

// Also add a timeout as fallback
setTimeout(function() {
  console.log('Timeout fallback: checking blog grid...');
  const container = document.getElementById('blog-grid');
  if (container && container.innerHTML === '') {
    console.log('Blog grid is empty, running init');
    initBlogSystem();
  }
}, 500);

function initBlogSystem() {
  console.log('Initializing blog system...');
  
  // Check if we're on editorials page
  const blogContainer = document.getElementById('blog-grid');
  console.log('Blog container found:', blogContainer);
  
  if (blogContainer) {
    console.log('Rendering blog cards...');
    renderBlogCards('blog-grid');
  }
  
  // Check if we're on a blog post page
  const postContainer = document.getElementById('blog-post-content');
  if (postContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    if (slug) {
      loadBlogPost(slug).then(post => {
        if (post) {
          postContainer.innerHTML = post.content;
          // Update page title
          const titleMatch = post.content.match(/<h1>(.*?)<\/h1>/);
          if (titleMatch) {
            document.title = titleMatch[1] + ' - SFDP';
          }
        }
      });
    }
  }
});
