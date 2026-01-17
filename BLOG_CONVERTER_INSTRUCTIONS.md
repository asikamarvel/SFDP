# SFDP Blog Post Converter - Instructions

## Quick Start

### Option 1: Drag and Drop (Easiest)
1. **Drag your .docx file** onto `convert_post.bat`
2. Enter the article **title** when prompted
3. Enter the **category** (or press Enter for "Health")
4. Done! Your post is ready.

### Option 2: Command Line
```bash
python convert_docx_to_post.py "your-article.docx" --title "Your Article Title" --category "Health"
```

---

## First-Time Setup

### Install Required Python Packages
Open Command Prompt or PowerShell and run:
```bash
pip install python-docx Pillow
```

---

## How It Works

The converter will:
1. ✅ Read your .docx file
2. ✅ Extract all text with formatting (bold, italic, headings)
3. ✅ Extract and save all images
4. ✅ Preserve all hyperlinks
5. ✅ Create the proper folder structure in `posts/`
6. ✅ Generate the markdown file with frontmatter
7. ✅ Update the blog index

### Output Structure
```
posts/
└── your-article-title/
    ├── index.md          (your article in markdown)
    └── images/
        ├── image_001.jpg
        ├── image_002.jpg
        └── ...
```

---

## Writing Your .docx Article

### Formatting Tips
| What You Want | How to Do It in Word |
|---------------|---------------------|
| Main Title | Use **Heading 1** style |
| Section Headers | Use **Heading 2** style |
| Sub-sections | Use **Heading 3** or **4** style |
| Bold text | Select text and press **Ctrl+B** |
| Italic text | Select text and press **Ctrl+I** |
| Hyperlinks | Select text → Right-click → Link |
| Images | Insert → Pictures |

### Best Practices
1. **First image** becomes the cover/featured image
2. **Keep images under 2MB** for faster loading
3. **Use descriptive headings** - they become the Table of Contents
4. **Add hyperlinks** to references - they'll be preserved
5. **Don't use tables** - they won't convert well to markdown

---

## Categories

Use one of these categories:
- `Health` (default)
- `Disease`
- `Vaccine`
- `Prevention`
- `Mental Health`
- `Virus`
- `Innovation`
- `News`
- `Charity`

---

## Command Line Options

```
python convert_docx_to_post.py [docx_file] [options]

Required:
  docx_file           Path to your .docx file
  -t, --title         Article title

Optional:
  -c, --category      Category (default: Health)
  -d, --date          Publication date as YYYY-MM-DD (default: today)
```

### Examples

```bash
# Basic usage
python convert_docx_to_post.py "malaria-article.docx" -t "Understanding Malaria" -c "Disease"

# With custom date
python convert_docx_to_post.py "article.docx" -t "My Article" -c "Health" -d "2026-02-01"

# Full command
python convert_docx_to_post.py "C:\Documents\my-article.docx" --title "Health Tips" --category "Prevention" --date "2026-01-20"
```

---

## After Converting

1. **Review** the generated `index.md` file in the `posts/your-article/` folder
2. **Check images** are in the `images/` subfolder
3. **Test your post** by opening:
   ```
   blog-post.html?post=your-article-slug
   ```
4. **Edit if needed** - the markdown file is plain text, easy to modify

---

## Troubleshooting

### "python-docx is not installed"
Run: `pip install python-docx`

### "Pillow is not installed" (warning)
Run: `pip install Pillow`
(This is optional - used to optimize images)

### Images not showing
- Check that images are in `posts/your-article/images/`
- Make sure image filenames in markdown match actual files
- Image paths should be `images/filename.jpg` (relative)

### Hyperlinks not working
- Make sure you created proper hyperlinks in Word (not just pasted URLs)
- Select text → Right-click → Link → Paste URL

### Strange formatting
- The converter works best with simple formatting
- Avoid complex tables, text boxes, or SmartArt
- Use standard Word styles (Heading 1, Heading 2, etc.)

---

## Need Help?

If the converter doesn't handle your document correctly:
1. Simplify the Word document formatting
2. Check that Python and packages are installed correctly
3. Try converting a simpler test document first

---

*Created for Society for Disease Prevention (SFDP) website*
