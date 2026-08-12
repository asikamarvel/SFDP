# Society for Disease Prevention (SFDP)

**Website:** [s-fdp.org](https://s-fdp.org)

The Society for Disease Prevention is a nonprofit organization dedicated to preventing public health crises through technology and education. We support communities in Pennsylvania and Africa with healthcare, education, and sustainable solutions.

## Repository Overview

This repository contains the source code for the SFDP public website — a static site built with HTML, CSS, and JavaScript.

### Site Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About Us | `about.html` |
| Blog | `blog-post.html` |
| Editorials | `editorials.html` |
| Projects | `projects.html` |
| Donate | `donate.html` |
| Join Us | `join-us.html` |
| Contact | `contact.html` |
| Newsletter | `newsletter.html` |
| Innovation Challenge | `innovation-challenge.html` |
| Mission | `mission.html` |
| Privacy Policy | `privacy-policy.html` |
| Conflict of Interest | `conflict-of-interest.html` |
| Whistleblower Policy | `whistleblower-policy.html` |

### Directory Structure

```
SFDP/
├── css/            # Stylesheets
├── js/             # JavaScript files
├── img/            # Images and icons
├── blog/           # Blog posts in Markdown format
├── posts/          # Additional post content
└── *.html          # Site pages
```

### Blog Content

Blog articles are stored as Markdown files in the `blog/` directory and cover topics including infectious diseases, public health, vaccination, mental health, and healthcare in Africa.

### Utility Scripts

- `convert_docx_to_post.py` — converts `.docx` files to blog post format
- `download_images.py` — downloads images referenced in posts
- `update_markdown_paths.py` — updates image paths in Markdown files
- `convert_post.bat` — Windows batch script for blog conversion workflow

## Contributing

To contribute blog content, follow the guidelines in [`BLOG-FORMATTING-GUIDE.md`](BLOG-FORMATTING-GUIDE.md) and [`BLOG_CONVERTER_INSTRUCTIONS.md`](BLOG_CONVERTER_INSTRUCTIONS.md).
