import re
from pathlib import Path

blog_dir = Path('blog')
img_dir = Path('img/blog')

# Maps of WordPress URLs to local files
url_to_local = {
    'https://sfdporg.wordpress.com/wp-content/uploads/2021/10/meningitis2.jpg': 'img/blog/meningitis2.jpg',
    'https://sfdporg.wordpress.com/wp-content/uploads/2021/10/measels2.jpg': 'img/blog/measels2.jpg',
    'https://startertemplatecloud.com/g16/wp-content/uploads/sites/42/2021/07/anna-earl-5DHsuDZBK7w-unsplash-1024x682.jpg': 'img/blog/anna-earl-5DHsuDZBK7w-unsplash-1024x682.jpg',
    'https://startertemplatecloud.com/g16/wp-content/uploads/sites/42/2021/07/charlein-gracia-Ux5mdMJNEA-unsplash-1024x685.jpg': 'img/blog/charlein-gracia-Ux5mdMJNEA-unsplash-1024x685.jpg',
    'https://startertemplatecloud.com/g16/wp-content/uploads/sites/42/2021/07/joel-muniz-A4A1x1ApccfA-unsplash-1024x683.jpg': 'img/blog/joel-muniz-A4A1x1ApccfA-unsplash-1024x683.jpg',
    'https://startertemplatecloud.com/g16/wp-content/uploads/sites/42/2021/07/larm-rmah-AEaTUnvneik-unsplash-1024x683.jpg': 'img/blog/larm-rmah-AEaTUnvneik-unsplash-1024x683.jpg',
    'https://startertemplatecloud.com/g16/wp-content/uploads/sites/42/2021/07/thiago-cerqueira-Wr3HGvx_RSM-unsplash-1024x683.jpg': 'img/blog/thiago-cerqueira-Wr3HGvx_RSM-unsplash-1024x683.jpg',
    'https://startertemplatecloud.com/g16/wp-content/uploads/sites/42/2021/07/victor-nnakwe-AE2uBSYnCVM-unsplash-1024x682.jpg': 'img/blog/victor-nnakwe-AE2uBSYnCVM-unsplash-1024x682.jpg',
}

print(f"Updating markdown files with local image paths...\n")

updated_count = 0

for md_file in blog_dir.glob('*.md'):
    with open(md_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    
    # For each URL, replace it (with or without query params) with local path
    for url, local_path in url_to_local.items():
        # Match the URL with optional query parameters
        base_url = url.split('?')[0]
        # Escape special regex characters and match URL with any query params
        pattern = re.escape(base_url) + r'(\?[^)]*)?'
        content = re.sub(f'!\\[\\]\\({pattern}\\)', f'![](/{local_path})', content)
    
    # Write back if changed
    if content != original_content:
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1
        print(f"✓ Updated {md_file.name}")

print(f"\n=== Summary ===")
print(f"Updated {updated_count} markdown files")
print(f"Images replaced: {len(url_to_local)}")
