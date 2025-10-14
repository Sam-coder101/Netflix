# Netflix Clone (static landing page)

This is a small static landing page inspired by Netflix. It's intended as a front-end demo built with plain HTML, CSS, and a small JavaScript file. No build step is required — just open the HTML file in a browser.

## Files

- `netflix.html` — Main HTML file for the Netflix-style landing page.
- `Astyle.css` — Styles for the page.
- `script.js` — Client-side JavaScript used for UI interactions (e.g., scrolling movies, dropdown behavior).

## How to view locally

1. Open `netflix.html` directly in your browser (double-click the file or use "Open File...").
2. Or serve the folder with a simple static server (recommended if you want to inspect network requests):

```powershell
# from inside the Netflix folder or repository root
python -m http.server 8000
# Then open http://localhost:8000/Netflix/netflix.html

# Or using http-server (Node.js)
npm install -g http-server
http-server -p 8000
# Then open http://localhost:8000/Netflix/netflix.html
```

## Features

- Responsive header and hero/banner with CTA and email input.
- "Trending Now" movie strip with left/right scroll control button.
- Informational feature boxes and FAQ section.

## Notes and assets

- The page uses externally-hosted images for movie posters and the Netflix logo. If you plan to use this offline, replace those URLs with local images inside an `img/` folder and update `netflix.html` accordingly.
- There are no external dependencies or build tools required.

## Development suggestions

- Improve accessibility: add ARIA roles and proper labels for the input elements and the movie carousel.
- Replace placeholder movie images with local assets for offline demos.
- Add unit tests for JavaScript behavior if the project grows (use Jest/Playwright for UI tests).

## License

No license is specified. Add a `LICENSE` file if you want to grant reuse permissions.


