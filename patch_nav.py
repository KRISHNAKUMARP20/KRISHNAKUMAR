import re
with open('index.html', 'r') as f:
    content = f.read()

# I accidentally removed <nav class="navbar" id="navbar">
# Let's add it back right before <div class="nav-brand"
content = content.replace('  <!-- ========== NAVBAR ========== -->\n    <div class="nav-brand"', '  <!-- ========== NAVBAR ========== -->\n  <nav class="navbar" id="navbar">\n    <div class="nav-brand"')

with open('index.html', 'w') as f:
    f.write(content)
