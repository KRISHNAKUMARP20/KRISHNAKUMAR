import re

with open('index.html', 'r') as f:
    html = f.read()

broken_html = """          <p>Participated in the "Mr. Coder" coding event at the EKNA '25 National Level Techno Cultural Fest held at
        </div>
      </div>"""

fixed_html = """          <p>Participated in the "Mr. Coder" coding event at the EKNA '25 National Level Techno Cultural Fest held at K.S.R College of Engineering.</p>
        </div>
      </div>"""

html = html.replace(broken_html, fixed_html)

with open('index.html', 'w') as f:
    f.write(html)
