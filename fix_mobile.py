import re

with open('styles.css', 'r') as f:
    content = f.read()

# Replace mobile wrappers
content = re.sub(
    r'\.projects-slider-wrapper { display: block; }',
    r'.projects-slider-wrapper, .certs-slider-wrapper, .skills-slider-wrapper, .experience-slider-wrapper { display: block; }',
    content
)

# Replace mobile grids
content = re.sub(
    r'\.projects-slider-grid {',
    r'.projects-slider-grid, .certs-grid, .skills-slider-grid, .experience-slider-grid {',
    content
)

# Replace cards flex none
content = re.sub(
    r'\.projects-slider-grid \.project-card { width: 100%; flex: none; }',
    r'.projects-slider-grid .project-card, .cert-card, .skills-category-card, .experience-card { width: 100%; flex: none; }',
    content
)

with open('styles.css', 'w') as f:
    f.write(content)
