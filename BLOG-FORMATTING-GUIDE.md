# 📝 Word Document Formatting Guide for SFDP Blog

## How to Use
1. Format your Word document following this guide
2. Drag the `.docx` file onto `convert_post.bat`
3. Press ENTER to confirm title and category
4. Done! Push to Git to publish

---

## Title (Required)
- **First line** of your document should be the article title
- Use **Heading 1** style or just make it the first paragraph
- Example: `Understanding Blood Pressure: What the Numbers Really Mean`

---

## Headings

| Word Style | Converts To |
|------------|-------------|
| Heading 1 or Title | Title (extracted, not shown in body) |
| Heading 2 | `## Section Header` |
| Heading 3 | `### Subsection` |
| Heading 4 | `#### Sub-subsection` |

---

## Text Formatting

| Format | How to Apply | Result |
|--------|--------------|--------|
| **Bold** | Ctrl+B | `**bold text**` |
| *Italic* | Ctrl+I | `*italic text*` |
| ***Bold Italic*** | Ctrl+B + Ctrl+I | `***bold italic***` |

---

## Hyperlinks
1. Select text you want to link
2. Press **Ctrl+K** or right-click → Link
3. Paste the URL
4. Links are preserved automatically!

---

## Images
- Insert images normally (Insert → Pictures)
- **First image** becomes the cover/featured image
- Images are extracted and saved automatically
- **Tip:** Use high-quality images (at least 800px wide)

---

## Lists
- Use Word's bullet or numbered list buttons
- They convert to markdown lists automatically

### Bullet List Example:
- Item one
- Item two
- Item three

### Numbered List Example:
1. First step
2. Second step
3. Third step

---

## What to Avoid
❌ Tables (not fully supported)  
❌ Text boxes  
❌ SmartArt  
❌ Complex formatting (columns, etc.)  
❌ Headers/Footers  

---

## Example Document Structure

```
Understanding Blood Pressure              ← Title (Heading 1)

[Image of blood pressure monitor]         ← Cover image

Every time you visit the doctor...        ← Regular paragraph

## What Is Blood Pressure?                ← Heading 2

Blood pressure is the force...            ← Regular paragraph

According to the American Heart           ← Paragraph with link
Association, normal is below 120/80.

## The Categories                         ← Heading 2

- Normal: Less than 120/80                ← Bullet list
- Elevated: 120-129 / less than 80
- High Stage 1: 130-139 / 80-89
```

---

## Auto-Detected Categories
The converter automatically detects categories based on keywords:

| Category | Keywords |
|----------|----------|
| Disease | malaria, cholera, diabetes, cancer, measles, etc. |
| Vaccine | vaccine, vaccination, immunization, pfizer, etc. |
| Mental Health | depression, anxiety, therapy, alzheimer, etc. |
| Virus | covid, coronavirus, flu, pandemic, etc. |
| Prevention | hygiene, safety, awareness, screening, etc. |
| Innovation | research, treatment, breakthrough, etc. |
| Charity | donation, volunteer, nonprofit, etc. |
| News | update, announcement, report, etc. |
| Health | Default if no keywords match |

---

## Troubleshooting

### "Could not auto-detect title"
- Make sure your document starts with text (the title)
- Don't start with an image

### "Document has corrupted images"
- Re-save the Word document
- Or copy content to a new document

### Post not showing on editorials page
- Refresh the page (Ctrl+F5)
- Check if the post was added to editorials.html

---

## Files Created by Converter

```
posts/
  └── your-article-slug/
      ├── index.md          ← Your article content
      └── images/
          ├── image_001.jpg ← Extracted images
          └── image_002.jpg
```

---

*Last updated: January 2026*
