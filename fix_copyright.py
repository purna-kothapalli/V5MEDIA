import os

for file in [f for f in os.listdir('.') if f.endswith('.html')]:
    with open(file, 'r', encoding='utf-8') as f:
        text = f.read()

    text = text.replace('<p>?2026 copy rights', '<p>&copy; 2026 copy rights')
    text = text.replace('<p>2026 copy rights', '<p>&copy; 2026 copy rights')
    text = text.replace('&copy; &copy;', '&copy;') # just in case

    with open(file, 'w', encoding='utf-8') as f:
        f.write(text)

print("Copyrights replaced successfully!")
