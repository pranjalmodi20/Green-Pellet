---
name: Next-Gen Industrial Luxury
colors:
  surface: '#f9faf6'
  surface-dim: '#dadad7'
  surface-bright: '#f9faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#717974'
  outline-variant: '#c1c8c2'
  surface-tint: '#3e6655'
  primary: '#002d1e'
  on-primary: '#ffffff'
  primary-container: '#1a4333'
  on-primary-container: '#85af9b'
  inverse-primary: '#a4d0ba'
  secondary: '#5e5f5b'
  on-secondary: '#ffffff'
  secondary-container: '#e3e3de'
  on-secondary-container: '#646561'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c0ecd6'
  primary-fixed-dim: '#a4d0ba'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#264e3e'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c7c7c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#464744'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f9faf6'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 80px
    fontWeight: '900'
    lineHeight: 96px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '900'
    lineHeight: 56px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.1em
  technical-data:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap-desktop: 160px
  section-gap-mobile: 80px
  grid-margin-desktop: 64px
  grid-gutter: 32px
  container-max-width: 1440px
---

## Brand & Style
The design system embodies "Next-Gen Industrial Luxury," positioning the brand as a leader in sustainable energy through a cinematic, high-end visual narrative. It targets high-level investors and industrial partners by blending the technical precision of aerospace engineering with the refined elegance of luxury editorial design.

The aesthetic follows a "Tesla Energy meets Apple Vision Pro" direction. This is achieved through:
- **Minimalist Sophistication:** Expansive whitespace and a restrained, premium color palette.
- **Glassmorphism:** Strategic use of semi-transparent layers with high-specular blurs to suggest depth and modern technology.
- **Industrial Precision:** A rigorous underlying grid contrasted by fluid, asymmetrical storytelling elements.
- **Cinematic Atmosphere:** High-contrast lighting in photography and bold typography that commands attention.

## Colors
The palette is rooted in Earth’s natural stability and industrial progress.
- **Imperial Green (#1A4333):** The primary brand anchor. Used for high-impact surfaces, primary buttons, and deep background sections to evoke authority and environmental stewardship.
- **Premium Canvas (#F9F8F3):** An off-white base that provides a warmer, more sophisticated feel than pure white, functioning as the primary background for content.
- **Sustainability Gold/Orange:** A secondary accent duo derived from the logo. Gold (#D4AF37) is used for "Premium/Luxury" highlights, while Orange (#E67E22) is used for critical calls to action or technical alerts.
- **Glassmorphism:** Backgrounds for floating cards and navigation are white or green with 60-80% opacity and a 20px-40px backdrop blur.

## Typography
The system uses a high-contrast pairing to distinguish between brand storytelling and technical information.
- **Headlines (Playfair Display):** Dramatic, editorial, and authoritative. Use "Display" weights for hero sections to create a sense of heritage and luxury.
- **Body & Data (Manrope):** Clean, modern, and technical. The geometric sans-serif ensures readability in data-heavy sections and provides a functional counterpoint to the decorative serifs.
- **Scaling:** Headlines scale aggressively. Hero titles should dominate the viewport on desktop, while on mobile, they transition to a more compact but still impactful size.

## Layout & Spacing
The layout follows an asymmetrical storytelling model designed to lead the eye through information like a curated exhibition.
- **The Grid:** A 12-column grid is used for alignment, but content often breaks the grid or spans unevenly (e.g., 5 columns for text, 7 columns for imagery) to create visual tension and interest.
- **Generous Whitespace:** Section gaps are intentionally large (up to 160px) to give the brand a premium, unhurried feel.
- **Reflow:** On mobile, the asymmetry collapses into a single-column stack, but maintains high padding (24px - 32px) to preserve the airy aesthetic.

## Elevation & Depth
Depth is not conveyed through heavy shadows but through optical layering and transparency.
- **Base Level:** Premium Canvas background.
- **Mid Level (Glass):** Floating containers use 80% opacity backgrounds with a `24px` backdrop-blur and a subtle `0.5px` white inner border to simulate the edge of a glass pane.
- **High Level (Active):** Interactive elements use an extra-diffused "Ambient Glow" rather than a shadow, often tinted with the primary Green (#1A4333) at 5% opacity.

## Shapes
In line with the "Apple Vision Pro" influence, the design uses high-radius curves to soften the industrial nature of the product.
- **Primary Cards:** Use a `32px` to `64px` border-radius.
- **Buttons & Chips:** Use fully pill-shaped (`rounded-full`) geometry to provide a "friendly-tech" touch.
- **Interactive States:** When hovered, card radii may slightly contract or expand to signal responsiveness.

## Components
- **Buttons:** Primary buttons are Imperial Green with white text, pill-shaped, and feature a subtle "Sustainability Gold" hover state. Secondary buttons are "Ghost" style with a glassmorphic blur and a thin border.
- **Cards:** Content cards feature high-quality industrial photography as the background with glassmorphic overlays for text. Corner radii should be set at a consistent `48px` for large hero cards.
- **Input Fields:** Minimalist with only a bottom border or a very soft tinted background. Labels use the `label-caps` typography style.
- **Chips/Badges:** Small, pill-shaped tags with `technical-data` typography, used to categorize products or blog topics.
- **Interactive Timelines:** Used for the "History" section, featuring thin lines and high-contrast gold markers to track the brand's evolution.