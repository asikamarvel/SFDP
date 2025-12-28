import os
import re
import urllib.request
from pathlib import Path
from urllib.parse import urlparse
import time

blog_dir = Path('blog')
img_dir = Path('img/blog')
img_dir.mkdir(parents=True, exist_ok=True)

# Find all unique image URLs
image_urls = {}
image_pattern = r'!\[\]\((https?://[^)]+)\)'

for md_file in blog_dir.glob('*.md'):
    with open(md_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        matches = re.findall(image_pattern, content)
        for url in matches:
            clean_url = url.split('?')[0]
            if clean_url not in image_urls:
                image_urls[clean_url] = None

print(f"Found {len(image_urls)} unique images")
print("Starting downloads...\n")

# Download each image
downloaded = 0
failed = 0

for i, url in enumerate(image_urls.keys(), 1):
    try:
        # Get filename from URL
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename:
            filename = f"image-{i}.jpg"
        
        filepath = img_dir / filename
        
        # Skip if already exists
        if filepath.exists():
            print(f"[{i}/{len(image_urls)}] ✓ {filename} (already exists)")
            image_urls[url] = f"img/blog/{filename}"
            downloaded += 1
            continue
        
        # Download with timeout
        print(f"[{i}/{len(image_urls)}] Downloading {filename}...", end=" ", flush=True)
        request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=10) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print("✓")
        image_urls[url] = f"img/blog/{filename}"
        downloaded += 1
        time.sleep(0.2)  # Small delay between downloads
        
    except Exception as e:
        print(f"✗ Error: {str(e)[:50]}")
        failed += 1

print(f"\n--- Download Complete ---")
print(f"Downloaded: {downloaded}")
print(f"Failed: {failed}")
print(f"\nNow updating markdown files...")

# Update all markdown files with local image paths
updated_count = 0

for md_file in blog_dir.glob('*.md'):
    with open(md_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    
    # Replace all image URLs with local paths
    for original_url, local_path in image_urls.items():
        if local_path and original_url in content:
            # Replace both with and without query params
            pattern = original_url.replace('?', r'\?') + r'(\?[^)]*)?'
            content = re.sub(f'!\\[\\]\\({pattern}\\)', f'![]({local_path})', content)
    
    # Write back if changed
    if content != original_content:
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_count += 1
        print(f"✓ Updated {md_file.name}")

print(f"\nUpdated {updated_count} markdown files")
