# Contributing to the Netflix Clone

Thanks for your interest in improving this small front-end demo! This document explains the contribution process and gives a short checklist for changes.

## What you can contribute

- Bug fixes and accessibility improvements.
- Visual polish, responsive layout improvements, and CSS refactors.
- Small JavaScript enhancements (carousel controls, input validation) or tests.
- Replacing external image URLs with local assets for offline demos.

Note: This project is a static HTML/CSS/JS demo. Avoid adding heavy build systems unless there's a clear benefit.

## Getting started (local)

1. Fork the repository and create a branch for your change:

```powershell
# from your forked repo clone
git checkout -b fix/your-change
```

2. Make your changes. You can open `netflix.html` directly in a browser, or run a local static server as described in `README.md`.

3. Keep changes small and focused. Add comments where logic may not be obvious.

## Pull request checklist

Before opening a PR, please ensure:

- [ ] The change is limited in scope and addresses one concern.
- [ ] HTML remains valid and well-structured.
- [ ] CSS is organized and avoids unnecessary global rules.
- [ ] JavaScript changes are commented and defensive against null/undefined DOM elements.
- [ ] If you added images/assets, place them under `Netflix/img/` and update paths in `netflix.html`.

When you open the PR, include:

- A short description of the change and the motivation.
- Screenshots if the change affects layout or visuals.
- Any manual testing steps you used.

## Coding conventions

- Use semantic HTML where appropriate (headings, main, nav, section, footer).
- Prefer small, reusable CSS classes rather than deeply nested selectors.
- Keep JavaScript vanilla and dependency-free. If you add any dependency, include a brief justification in the PR.

## Accessibility notes

- Add labels for form inputs and ensure keyboard accessibility for interactive components.
- Use descriptive alt attributes for images.
- Ensure sufficient color contrast for text and interactive elements.

## Asking for help

Open an issue if you're unsure whether a change is appropriate or if you want to propose a larger refactor.

Thanks — contributions make the project better for everyone!
