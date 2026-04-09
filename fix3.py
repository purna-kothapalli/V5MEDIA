import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 2. Header "Apply for free" link
        content = content.replace('href="contact-us.html" class="dropdown-item">Apply for Free', 'href="index.html#contact" class="dropdown-item">Apply for Free')
        
        # 4. Remove '?' artifacts
        content = content.replace('Enroll Today ?', 'Enroll Today &rarr;')
        content = content.replace('? 2026 copy rights', '&copy; 2026 copy rights')
        content = content.replace('? 2026', '&copy; 2026')
        content = content.replace('copy rights ?', 'copy rights &copy;')
        
        # Replace other floating button ? marks
        content = re.sub(r'([A-Za-z]+)\s+\?', r'\1 &rarr;', content) # catch "Enroll ?" or "Explore ?"
        
        # We need to make sure we don't accidentally replace actual question marks in paragraphs.
        # But looking at typical static pages, "Learn More ?" is common. Let's specifically target button classes if possible.
        # A safer replace is:
        content = content.replace('class="btn-primary">Learn More ?</', 'class="btn-primary">Learn More &rarr;</')
        content = content.replace('class="btn-outline">View All Courses ?</', 'class="btn-outline">View All Courses &rarr;</')

        # 6. Remove Download Syllabus buttons
        content = re.sub(r'<a href="[^"]+".*?class="btn-primary".*?>\s*<svg.*?Download Syllabus\s*</svg>\s*</a>', '', content, flags=re.IGNORECASE|re.DOTALL)
        content = re.sub(r'<a href="[^"]+".*?>\s*Download Syllabus\s*</a>', '', content, flags=re.IGNORECASE|re.DOTALL)
        # Sometime buttons don't have SVG
        content = re.sub(r'<a[^>]*btn-primary[^>]*>[\s\S]*?Download Syllabus[\s\S]*?</a>', '', content, flags=re.IGNORECASE)

        # 7. Make footer logo a hyperlink
        content = content.replace('<img src="v5_logo.png" alt="V5 Media School Logo" class="footer-logo-img">', '<a href="index.html"><img src="v5_logo.png" alt="V5 Media School Logo" class="footer-logo-img"></a>')
        content = content.replace('<a href="index.html"><a href="index.html">', '<a href="index.html">')
        content = content.replace('</a></a>', '</a>')

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")
    except Exception as e:
        print(f"Error on {file}: {e}")

# CSS Fixes
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Square box patterns large boxes
css = css.replace('background-size: 40px 40px;', 'background-size: 80px 80px;')

# 3. Prevent logo inversion
css = re.sub(r'\.navbar\.transparent-start:not\(\.scrolled\) \.nav-logo img \{\s*filter:.*?\s*\}', '.navbar.transparent-start:not(.scrolled) .nav-logo img { filter: none; }', css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Fixed CSS")
