import re

with open('styles.css', 'r') as f:
    content = f.read()

# Make all wrappers use block/relative instead of flex
content = re.sub(
    r'\.(projects-slider-wrapper|certs-slider-wrapper|skills-slider-wrapper|experience-slider-wrapper)\s*{\s*position:\s*relative;\s*width:\s*100%;\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*16px;\s*(padding:[^;]+;)?\s*}',
    r'.\1 {\n  position: relative;\n  width: 100%;\n  padding: 20px 0;\n}',
    content
)

# Find .slider-btn and update it
slider_btn_css = """
.slider-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid color-mix(in srgb, var(--accent-cyan) 30%, transparent);
  color: var(--accent-cyan);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  backdrop-filter: blur(8px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.slider-btn:hover {
  background: var(--accent-cyan);
  color: #0f172a;
  box-shadow: 0 0 20px color-mix(in srgb, var(--accent-cyan) 40%, transparent);
}

.slider-btn:first-of-type, [aria-label="Slide Left"] {
  left: -24px;
}

.slider-btn:last-of-type, [aria-label="Slide Right"] {
  right: -24px;
}
"""
content = re.sub(
    r'\.slider-btn\s*{[^}]+}[^.]*\.slider-btn:hover\s*{[^}]+}',
    slider_btn_css.strip(),
    content
)

with open('styles.css', 'w') as f:
    f.write(content)
