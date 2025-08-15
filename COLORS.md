# dTech Vision Color Palette

## Core Brand Colors

- **Corporate Navy (#002195)**: Primary brand color, headers, main actions, navigation elements
- **Brand Purple (#CF58FA)**: Primary accent color, CTAs, brand highlights, interactive elements
- **Aqua (#00FDFE)**: Secondary actions, highlights, special accents
- **Orange (#FF5B19)**: CTAs, warnings, important actions, urgent notifications

## Neutral Colors

- **Premium White (#ffffff)**: Clean backgrounds, primary text on dark themes, card surfaces
- **Off White (#f6f6f7)**: Light mode backgrounds, content areas, subtle surfaces
- **Light Gray (#eeedee)**: Secondary text, muted content, disabled text
- **Medium Gray (#c2c1c3)**: Tertiary text, placeholder content, inactive elements
- **Sophisticated Gray (#39383a)**: Professional borders, secondary text, subtle dividers
- **Dark Surface (#1a1a1a)**: Card backgrounds, secondary surfaces, premium dark areas
- **Deep Black (#000000)**: Main page backgrounds, hero sections, maximum contrast

## Supporting Purple Family

- **Refined Purple (#7b61ff)**: Secondary accent, gradients, hover states, button variations
- **Accent Lavender (#D1AAD7)**: Soft highlights, indicators, subtle accents, border elements

## Theme Variations

### Dark Mode (Default)

- **Accent Low (#142242)**: Subtle accent backgrounds, low-contrast highlights
- **Accent High (#b4c9f2)**: High-contrast accent text, emphasized elements

### Light Mode

- **Accent Low Light (#c7d7f7)**: Subtle accent backgrounds, soft highlights
- **Accent High Light (#182f61)**: High-contrast accent text, strong emphasis

## Gradient Combinations

- **Hero Text Gradient**: `from-white via-brand-purple to-white` - Main headings, hero titles
- **Button Gradient**: `from-brand-purple to-refined-purple` - Primary action buttons, CTAs
- **Feature Text Gradient**: `from-brand-purple to-white` - Feature titles, secondary headings
- **Aqua Gradient**: `from-aqua to-brand-purple` - Special highlights, unique accents
- **Background Halo**: `from-brand-purple/30 to-transparent` - Atmospheric effects

## Usage Guidelines

### Primary Actions

- Use **Corporate Navy** for main navigation and primary headers
- Use **Brand Purple** for primary CTAs and key interactive elements
- Use **Orange** for urgent actions and warnings

### Secondary Actions

- Use **Aqua** for secondary highlights and special features
- Use **Refined Purple** for hover states and secondary buttons
- Use **Accent Lavender** for subtle indicators and soft accents

### Backgrounds & Surfaces

- Use **Deep Black** for main backgrounds and hero sections
- Use **Dark Surface** for cards and secondary surfaces
- Use **Premium White/Off White** for light theme backgrounds
- Use **Sophisticated Gray** for professional borders and dividers

### Text Hierarchy

- **Premium White** for primary text on dark backgrounds
- **Light Gray** for secondary text and descriptions
- **Medium Gray** for tertiary text and placeholders
- **Corporate Navy** for primary text on light backgrounds

## Accessibility Notes

- Ensure minimum 4.5:1 contrast ratio for normal text
- Ensure minimum 3:1 contrast ratio for large text and UI elements
- Test color combinations in both light and dark modes
- Provide alternative indicators beyond color for important information

## Implementation Summary

This color system has been fully implemented across the dtech.vision codebase:

### CSS Custom Properties

- **`/src/styles/custom.css`**: Core color variables defined with CSS custom properties
- **`/src/styles/index.css`**: Base styles updated with color system integration
- **Tailwind config**: Extended with custom color classes and utilities

### Component Updates

- **Farcaster landing page** (`/src/pages/farcaster/index.astro`): Updated to use new color variables
- **Farcaster GTM page** (`/src/pages/farcaster-gtm/index.astro`): Converted to new color system
- **Results components** (`/src/components/Results/`): Updated for consistent branding
- **Button component** (`/src/components/Button/`): Integrated with color system
- **SectionHeader component**: Updated for gradient consistency
- **CoolText component**: Aligned with color palette

### Key Features

- **Tailwind Integration**: All colors available as Tailwind utilities (`bg-brand-purple`, `text-corporate-navy`, etc.)
- **CSS Variables**: Easy theme switching and consistent color application
- **Gradient System**: Pre-defined gradients for hero text, buttons, and features
- **Starlight Compatibility**: Seamless integration with existing Starlight theme system
- **Accessibility**: Maintains contrast ratios and supports light/dark modes

### Usage Examples

```css
/* CSS Variables */
background-color: var(--brand-purple);
color: var(--corporate-navy);

/* Tailwind Classes */
class="bg-brand-purple text-corporate-navy"
class="bg-gradient-button-primary hover:shadow-brand-primary"
```

This comprehensive color system ensures consistent branding across all landing pages and components while maintaining the premium, professional appearance that reflects dtech.vision's position as the premier Farcaster development boutique.
