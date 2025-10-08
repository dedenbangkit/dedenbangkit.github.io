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
- Intersection Observer API is used for scroll-based animations (see About.js:9-28)
- Parallax effects implemented via scroll event listeners (see Hero.js:7-11)
- Components become visible/animate when they enter viewport (threshold: 0.2)
- Canvas-based animated backgrounds for enhanced visual effects (About, Skills, Stats, Documentary)

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

### Canvas Background Animations
Interactive canvas-based backgrounds add visual depth to sections:

**About Section (About.js:30-120)**
- Connecting dots particle system with dynamic line drawing
- Particles bounce off edges and connect when within 120px distance
- Lines fade based on distance for smooth visual effect
- Particle count scales with screen size (calculated per 15000px²)

**Skills Section (Skills.js:31-147)**
- Floating dust particles with mouse interaction
- Particles repel from mouse cursor within 150px radius
- Purple/violet gradient colors with glow effects
- Particles slowly drift downward and reset at bottom
- Mouse events attached to section element for proper interaction

**Stats Section (Stats.js:30-87)**
- 8-bit Tron Legacy style horizontal scanlines
- Alternating cyan (rgba(0, 255, 255, 0.15)) and magenta (rgba(255, 0, 255, 0.1)) lines
- 4px line spacing with smooth downward animation (0.5px per frame)
- Dark cyberpunk gradient background (#000000 to #1a0033)
- Neon-themed UI cards with cyan/magenta borders and glow effects

**Documentary Section (Documentary.js:30-167)**
- Film projector light rays emanating from top center (8 beams)
- Dust particles floating downward, visible only within light beams
- Warm golden color (rgba(255, 220, 180)) for cinematic atmosphere
- Animated film grain texture with random white pixels (2% density)
- Dark theater gradient background (#0a0a15 to #1a1020)
- Film cards with pink/purple borders and warm golden accents
- Creates authentic "documentary screening in a theater" ambiance

**Performance Considerations:**
- All canvas animations use requestAnimationFrame for smooth 60fps performance
- Particle counts dynamically adjust based on viewport size
- Proper cleanup in useEffect prevents memory leaks
- Canvas animations optimized to avoid unnecessary rendering operations

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
