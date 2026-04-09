import re

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Replace the geometric square hack we added last turn, with the graph pattern
remove_pattern = re.compile(
    r'\/\* 1\. Box kind of structure near headings \*\/\s*\.section-header, \.acfm-header \{.*?pointer-events: none;\s*border-radius: 16px;\s*\}',
    re.DOTALL
)

grid_css = """/* 1. Box kind of structure near headings */
.section-header, .acfm-header {
  position: relative;
  z-index: 1;
}

.section-header::before, .acfm-header::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120vw;
  height: 300px;
  background-image: 
    linear-gradient(rgba(45, 200, 150, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45, 200, 150, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center;
  z-index: -1;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 65%);
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 65%);
}

.section-header::after, .acfm-header::after {
  display: none !important;
}"""

if remove_pattern.search(css):
    css = remove_pattern.sub(grid_css, css)
else:
    css += "\n" + grid_css


# 2. Hero gradient fix
hero_fix = re.compile(r'\.hero \{\s*padding: 170px 24px 80px;\s*margin-top: -90px;\s*background: #050000;.*?overflow: hidden;\s*\}', re.DOTALL)

new_hero = """.hero {
  padding: 170px 24px 80px;
  margin-top: -90px;
  background-color: #03010a;
  background-image: 
    radial-gradient(ellipse at 15% 45%, rgba(220, 20, 50, 0.3) 0%, transparent 60%),
    radial-gradient(ellipse at 85% 40%, rgba(20, 50, 220, 0.25) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 100%, rgba(20, 80, 255, 0.3) 0%, transparent 65%);
  min-height: calc(100vh - 116px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}"""

if hero_fix.search(css):
    css = hero_fix.sub(new_hero, css)
else:
    # Just in case our previous replace didn't hit and it looks slightly different
    print("Could not find hero exact match, trying broader replacement...")
    broader = re.compile(r'\.hero \{\s*padding: 170px 24px 80px;[\s\S]*?overflow: hidden;\s*\}')
    if broader.search(css):
        css = broader.sub(new_hero, css)
    

# 3. Footer Logo scaling
footer_logo_css = """
.footer-logo-img {
  height: 60px;
  width: auto;
  display: block;
  margin-bottom: 20px;
}
"""
css += footer_logo_css

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css)

print("CSS Fixed")
