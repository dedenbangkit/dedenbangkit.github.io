# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Deden Bangkit, built with React and deployed to GitHub Pages. The site showcases a developer profile with sections for hero, about, skills, statistics, documentary content, and contact information.

## Development Commands

### Local Development
```bash
npm install          # Install dependencies
npm start            # Start development server on http://localhost:3000
npm test             # Run tests
npm run build        # Create production build in ./build directory
```

### Docker Development
```bash
docker-compose up    # Start development environment with hot-reload
                     # Runs on http://localhost:3000
```

The Docker setup uses polling for file watching (CHOKIDAR_USEPOLLING and WATCHPACK_POLLING enabled) to ensure hot-reload works across different filesystems.

## Architecture

### Component Structure
The application follows a single-page layout with modular React components:

- **App.js**: Main entry point that composes all sections in order: Hero → About → Skills → Stats → Documentary → Contact
- **index.js**: React root render with StrictMode enabled

### Component Architecture Pattern
Components use a consistent pattern:
- Each component has its own CSS file for styling
- Intersection Observer API is used for scroll-based animations (see About.js:9-26)
- Parallax effects implemented via scroll event listeners (see Hero.js:7-11)
- Components become visible/animate when they enter viewport (threshold: 0.2)

### Styling Approach
- Component-scoped CSS files (e.g., Hero.css, About.css)
- Global styles in index.css and App.css
- No CSS preprocessors or CSS-in-JS libraries currently used

## Deployment

### GitHub Pages Deployment
- Automated via GitHub Actions workflow (.github/workflows/deploy.yml)
- Triggered on push to main/master branches or manual workflow_dispatch
- Build artifacts uploaded from ./build directory
- Production builds run with CI=false to allow warnings
- Deployment URL configured in package.json homepage field

### Build Configuration
- Built with Create React App (react-scripts 5.0.1)
- Production target: GitHub Pages at https://dedenbangkit.github.io
- Browser support configured for modern browsers (>0.2% usage)

## Key Implementation Details

### Parallax Scrolling
The Hero component implements parallax effects using:
- Window scroll event listener with cleanup
- Transform calculations based on scrollY position
- Different parallax speeds for background (0.5x) and content (0.3x)

### Animation Triggers
Components use IntersectionObserver for performance-efficient scroll animations:
- Observer created with 0.2 threshold (triggers at 20% visibility)
- CSS class toggling (.visible) drives animation transitions
- Proper cleanup in useEffect return to prevent memory leaks

## Project Structure
```
src/
├── components/     # All UI components with co-located CSS
├── App.js         # Main layout composition
├── index.js       # React root
├── App.css        # App-level styles
└── index.css      # Global styles

public/            # Static assets and index.html template
.github/workflows/ # CI/CD automation
```
