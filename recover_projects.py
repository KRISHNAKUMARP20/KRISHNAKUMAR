import re

with open('index.html', 'r') as f:
    content = f.read()

# I need to replace the projects-slider-grid contents with the new ones.
# Actually wait, the user's HEAD commit already has the old projects.
# Let's see what's in index.html right now under projects
