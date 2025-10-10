# Contributing to Netflix Clone Project

Thank you for your interest in contributing to the Netflix Clone project! This document provides guidelines and steps for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-odesseyPA.git
   cd open-odesseyPA/Netflix
   ```
3. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

The project is a static website using:
- HTML5
- CSS3
- Vanilla JavaScript

No build tools or dependencies required. Simply:
1. Open `netflix.html` in your browser
2. Edit files and refresh to see changes

For local development with live reload:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js http-server
npx http-server -p 8000
```

## Project Structure

```
Netflix/
├── netflix.html      # Main HTML file
├── Astyle.css       # Styles
└── script.js        # JavaScript functionality
```

## Contribution Guidelines

### What We're Looking For

1. Bug fixes
   - Browser compatibility issues
   - Mobile responsiveness
   - JavaScript functionality

2. Improvements
   - Accessibility enhancements
   - Performance optimizations
   - UI/UX refinements

3. Documentation
   - Code comments
   - README updates
   - Usage examples

### Code Style Guidelines

#### HTML
- Use semantic HTML5 elements
- Include proper ARIA attributes
- Maintain proper indentation
- Use meaningful alt text for images

Example:
```html
<section class="feature" aria-label="feature description">
    <h2>Feature Title</h2>
    <img src="feature.jpg" alt="Detailed description of feature">
</section>
```

#### CSS
- Use clear, descriptive class names
- Follow BEM naming when applicable
- Group related properties
- Include media queries for responsiveness

Example:
```css
.feature {
    /* Layout */
    display: flex;
    padding: 1rem;
    
    /* Typography */
    font-family: Arial, sans-serif;
    
    /* Colors */
    background: #141414;
    color: #ffffff;
}
```

#### JavaScript
- Use ES6+ features
- Add error handling
- Comment complex logic
- Use meaningful variable names

Example:
```javascript
// Handle movie carousel navigation
const handleScrollClick = (direction) => {
    const movieContainer = document.querySelector('.movies');
    if (!movieContainer) return;
    
    const scrollAmount = direction === 'right' ? 300 : -300;
    movieContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};
```

## Pull Request Process

1. **Before Submitting**
   - Test your changes in multiple browsers
   - Ensure mobile responsiveness
   - Check for console errors
   - Update documentation if needed

2. **PR Title Format**
   ```
   type(scope): Brief description
   
   Examples:
   fix(mobile): Fix navigation menu overflow on small screens
   feat(ui): Add hover effects to movie cards
   docs(readme): Update setup instructions
   ```

3. **PR Description Template**
   ```markdown
   ## Changes
   - Detailed list of changes
   - Why these changes are necessary
   
   ## Screenshots
   - Before/After screenshots if UI changes
   
   ## Testing
   - How you tested the changes
   - Browser versions tested
   
   ## Checklist
   - [ ] Tested on mobile
   - [ ] No console errors
   - [ ] Documentation updated
   ```

## Testing Guidelines

Test your changes in:
- Latest Chrome, Firefox, Safari
- Mobile devices (or responsive mode)
- Different screen sizes

Check for:
- Visual consistency
- Smooth animations
- No console errors
- Proper responsive behavior

## Need Help?

- For bugs: Open an issue with detailed reproduction steps
- For features: Discuss in issues before implementing
- For questions: Comment on relevant issues or create new ones

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the same terms as the project.

---

Thank you for contributing to making this Netflix Clone better! 🎉
