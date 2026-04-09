import re

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make the grid pattern apply globally to main page headers and section titles
target = ".section-header::before, .acfm-header::before {"
replacement = ".section-header::before, .acfm-header::before, .acfm-title::before, .page-header::before, .ch-title::before {"

if target in css:
    css = css.replace(target, replacement)
else:
    print("Could not find the target string to append new selectors.")

# We must ensure .acfm-title, .page-header, .ch-title is position relative for ::before to work
# Let's insert it carefully.
grid_setup = """
.acfm-title, .page-header, .ch-title {
  position: relative;
  z-index: 1;
}
"""
css += grid_setup

with open("style.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Headers updated successfully!")
