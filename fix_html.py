import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

broken_ticker_pattern = re.compile(r'<div class="ticker-content">[\s\S]*?</div>')

fixed_ticker = """<div class="ticker-content">
        🔥 V5 Media School Launching on 10 April 2026 &nbsp;&bull;&nbsp;
        🌟 100% Placement Guaranteed &nbsp;&bull;&nbsp;
        🎓 90-Day Intensive Training &nbsp;&bull;&nbsp;
        🎥 News Reading | Reporting | Editing | Camera | Digital Media &nbsp;&bull;&nbsp;
        🍱 Free Food & Accommodation &nbsp;&bull;&nbsp;
        💰 High Salary Jobs &nbsp;&bull;&nbsp;
        📞 +91 93910 55552 &nbsp;&bull;&nbsp;
        🌐 www.v5mediaschool.in &nbsp;&bull;&nbsp;
      </div>"""

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Replace broken ticker
        content = broken_ticker_pattern.sub(fixed_ticker, content)
        
        # Replace Explore Program button
        content = content.replace('Explore Program ?', 'Explore Program &rarr;')
        content = content.replace('Explore Program ??', 'Explore Program &rarr;')
        
        # Replace broken question marks in title/text if any (specifically the button is the main issue)
        content = content.replace('Explore Program ?&lt;', 'Explore Program &rarr;&lt;')
        content = content.replace('Explore Program ?<', 'Explore Program &rarr;<')

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file}")
    except Exception as e:
        print(f"Error on {file}: {e}")
