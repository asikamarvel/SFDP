import json
from datetime import datetime

# Load blog-index.json
with open('blog/blog-index.json', 'r', encoding='utf-8') as f:
    posts = json.load(f)

# Get latest 3 posts
latest = posts[:3]

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Build cards HTML
start_marker = '<div class="posts-grid">'
end_marker = '</div>\n    </div>\n  </section>\n\n  <!-- ==================== CTA Section ==================== -->'

start_pos = content.find(start_marker)
end_pos = content.find(end_marker)

category_images = {
    'Health': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Disease': 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Vaccine': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Prevention': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Mental Health': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Nutrition': 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Cancer Awareness': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}

cards_html = f'      {start_marker}\n'

for i, post in enumerate(latest):
    slug = post['slug']
    title = post['title']
    date = post['date']
    category = post.get('category', 'Health')
    
    try:
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        formatted_date = date_obj.strftime('%B %d, %Y')
    except:
        formatted_date = date
    
    image_url = category_images.get(category, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
    excerpt = title[:120] + '...' if len(title) > 120 else title
    delay = f' delay-{i}' if i > 0 else ''
    
    cards_html += f'''        <article class="card blog-card scroll-animate{delay}">
          <img src="{image_url}" alt="{title[:50]}" class="card-img">
          <div class="card-body">
            <span class="blog-category">{category}</span>
            <h3 class="card-title">
              <a href="blog-post.html?post={slug}">{title}</a>
            </h3>
            <p class="card-text">{excerpt}</p>
            <div class="card-meta">
              <i class="far fa-calendar-alt"></i> {formatted_date}
            </div>
          </div>
        </article>
        
'''

cards_html += '      </div>'

# Replace
content = content[:start_pos] + cards_html + content[end_pos:]

# Save
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Homepage updated with latest 3 posts!')
print('\nLatest posts on homepage:')
for i, post in enumerate(latest, 1):
    print(f"{i}. {post['title']} ({post.get('category', 'N/A')})")
