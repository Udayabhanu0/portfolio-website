# Design System - Neon Dark Portfolio

## Color Palette

### Primary Colors
- **Deep Space Black**: `#050510` - Main background
- **Neon Cyan**: `#00f0ff` - Primary accent, glow effects
- **Neon Blue**: `#0099ff` - Secondary accent, highlights

### Supporting Colors
- **Card Background**: `#0a0a15` - Slightly lighter than main background
- **Text Primary**: `#e0e0ff` - Foreground text
- **Text Secondary**: `#8888aa` - Muted text
- **Border**: `#16213e` - Card and element borders
- **Glow Purple**: `#7c3aed` - Tertiary accent (future use)

### States
- **Destructive**: `#ff0055` - Errors and delete actions
- **Success**: Green accents (for future)
- **Warning**: Orange accents (for future)

## Typography

### Font Family
- **Sans Serif**: Geist (default system font)
- **Monospace**: Geist Mono (for code)

### Font Sizes & Weights
```css
/* Headings */
h1: 3rem (48px) - Bold (700)
h2: 2.25rem (36px) - Bold (700)
h3: 1.875rem (30px) - Bold (700)
h4: 1.5rem (24px) - Bold (700)
h5: 1.25rem (20px) - Bold (700)
h6: 1rem (16px) - Bold (700)

/* Body */
Large: 1.125rem (18px) - Regular (400)
Base: 1rem (16px) - Regular (400)
Small: 0.875rem (14px) - Regular (400)
Tiny: 0.75rem (12px) - Regular (400)
```

### Line Heights
- Headings: 1.2
- Body text: 1.5
- Compact: 1.4

## Components

### Cards (Glass Effect)
```css
.glass {
  background: rgba(10, 10, 21, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 0.625rem;
}

/* Hover State */
.glass-hover:hover {
  background: rgba(10, 10, 21, 0.8);
  border-color: rgba(0, 240, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  transition: all 300ms;
}
```

### Glow Effects

#### Box Glow (Cyan)
```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3),
              inset 0 0 20px rgba(0, 240, 255, 0.1);
}
```

#### Text Glow (Cyan)
```css
.glow-text-cyan {
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5),
               0 0 20px rgba(0, 240, 255, 0.3);
}
```

#### Large Glow (for CTAs)
```css
.glow-cyan-lg {
  box-shadow: 0 0 40px rgba(0, 240, 255, 0.4),
              inset 0 0 40px rgba(0, 240, 255, 0.1);
}
```

### Buttons

#### Primary Button
```html
<button class="glass-hover px-8 py-3 rounded-lg font-medium 
         text-cyan-400 border border-cyan-400/30 
         hover:border-cyan-400/60 transition-all">
  Action
</button>
```

#### Secondary Button
```html
<button class="px-8 py-3 rounded-lg font-medium 
         bg-cyan-500/20 text-cyan-300 
         border border-cyan-400/30 
         hover:bg-cyan-500/30 transition-all">
  Secondary
</button>
```

### Ambient Effects

#### Floating Animation
```css
.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

#### Glowing Pulse
```css
.border-glow-animated {
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.5); }
}
```

#### Ambient Orbs (Background)
```css
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.ambient-orb-cyan {
  background: rgba(0, 240, 255, 0.15);
  width: 400px;
  height: 400px;
}
```

## Layout

### Spacing Scale
```
2px   - xs (minimal spacing)
4px   - sm (small padding)
8px   - base (default padding)
12px  - md (medium spacing)
16px  - lg (large spacing)
20px  - xl (extra large)
24px  - 2xl (double large)
32px  - 3xl
40px  - 4xl
48px  - 5xl
```

### Container Widths
- Mobile: Full width - 8px padding
- Tablet: 96% width (600px - 900px)
- Desktop: Max 6xl (1280px) with side padding

### Grid & Flex
```css
/* Projects Grid */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

/* Flex Row */
flex items-center justify-between gap-4

/* Flex Column */
flex flex-col items-center gap-6
```

## Animations

### Framer Motion Setup
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}
```

### Hover Transitions
```css
transition-all duration-300
```

### Scroll Animations
```jsx
whileInView="visible"
viewport={{ once: true, margin: '-100px' }}
```

## Responsive Design

### Breakpoints
- **sm**: 640px (small devices)
- **md**: 768px (tablets)
- **lg**: 1024px (large tablets)
- **xl**: 1280px (desktops)
- **2xl**: 1536px (large desktops)

### Mobile First Approach
```css
/* Mobile first */
.grid-cols-1

/* Then enhance */
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
```

## Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1 contrast ratio
- #e0e0ff on #050510: ~11:1 (excellent)
- Neon cyan (#00f0ff) for highlights (supports all users)

### Focus States
```css
focus:outline-none
focus:border-cyan-400/50
focus:ring-2
focus:ring-cyan-400/30
```

### Interactive Elements
- Minimum 44px touch target on mobile
- Clear hover states on all interactive elements
- Proper semantic HTML (button, a, form elements)

## Dark Theme Guidelines

### When Using Ambient Glows
- Use opacity < 0.2 for large background orbs (won't overwhelm)
- Keep centered content clean without glow interference
- Position glows outside main content areas

### Text on Dark Background
- Use #e0e0ff for primary text (softer than white)
- Use #8888aa for secondary/muted text
- Avoid pure white (#ffffff) - too harsh on dark backgrounds

### Card Hierarchy
- Main cards: `glass` class
- Hover cards: Add glow effect
- Nested elements: Slightly darker background

## Design References

Your portfolio is inspired by:
- **Vertex3D**: Immersive WebGL experience with ambient effects
- **Renaud ROHLINGER**: Minimalist design with strong typography
- **Mango Media**: Creative use of motion and space

## Customization Examples

### Change Primary Color to Purple
```css
:root {
  --primary: #a855f7;      /* Purple */
  --glow-cyan: #a855f7;
}
```

### Add Warm Tones
```css
:root {
  --secondary: #fb923c;    /* Orange */
  --accent: #f97316;       /* Warm orange */
}
```

### Increase Glow Intensity
```css
.glow-cyan {
  box-shadow: 0 0 40px rgba(0, 240, 255, 0.5),  /* Increased from 0.3 */
              inset 0 0 40px rgba(0, 240, 255, 0.2); /* Increased from 0.1 */
}
```

## Performance Notes

- Glow effects use CSS box-shadow (GPU accelerated)
- Blur filters are applied to pseudo-elements (optimized)
- Animations use `transform` and `opacity` for best performance
- Ambient orbs positioned absolutely (no layout shifts)

---

This design system maintains visual cohesion while allowing for customization. All values are defined as CSS variables for easy theme switching.
