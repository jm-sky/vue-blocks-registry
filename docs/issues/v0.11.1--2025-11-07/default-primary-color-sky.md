# Default Primary Color: Sky-500 with Dark Theme Support

## Problem
The default primary color in generated Vue projects uses neutral colors (black/white) which may not provide the best visual identity. A more distinctive default color would improve the initial user experience.

## Current State
In `frontend/src/css/style.css`, the primary color is currently set to:
- **Light mode**: `oklch(0.205 0 0)` (essentially black)
- **Dark mode**: `oklch(0.985 0 0)` (essentially white)

This provides minimal visual distinction and doesn't leverage Tailwind's color palette.

## Recommendation

### Use Sky-500 as Default Primary Color
The CLI should default to **Sky-500** (`#0ea5e9`) from Tailwind's color palette, which provides:
- ✅ Modern, professional appearance
- ✅ Good contrast in both light and dark themes
- ✅ Accessible color choice
- ✅ Consistent with modern design trends

### Implementation

#### 1. Update CSS Variables in `src/css/style.css`

The CLI should generate the following primary color values:

```css
:root {
  /* Light mode - Sky-500 */
  --primary: oklch(0.7 0.15 220);  /* Sky-500: #0ea5e9 */
  --primary-foreground: oklch(0.985 0 0);  /* White text on sky background */
  
  /* ... other variables ... */
}

.dark {
  /* Dark mode - Sky-400 (slightly lighter for better contrast) */
  --primary: oklch(0.75 0.15 220);  /* Sky-400: #38bdf8 */
  --primary-foreground: oklch(0.145 0 0);  /* Dark text on sky background */
  
  /* ... other variables ... */
}
```

#### 2. Color Values Reference

**Sky-500 (Light Mode)**:
- Hex: `#0ea5e9`
- RGB: `rgb(14, 165, 233)`
- OKLCH: `oklch(0.7 0.15 220)`
- Tailwind class: `sky-500`

**Sky-400 (Dark Mode - recommended)**:
- Hex: `#38bdf8`
- RGB: `rgb(56, 189, 248)`
- OKLCH: `oklch(0.75 0.15 220)`
- Tailwind class: `sky-400`

**Alternative: Sky-300 (Dark Mode - if Sky-400 is too bright)**:
- Hex: `#7dd3fc`
- RGB: `rgb(125, 211, 252)`
- OKLCH: `oklch(0.8 0.12 220)`
- Tailwind class: `sky-300`

#### 3. Complete Example

```css
:root {
  --radius: 0.625rem;
  
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* Primary: Sky-500 for light mode */
  --primary: oklch(0.7 0.15 220);
  --primary-foreground: oklch(0.985 0 0);
  
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  
  --success: oklch(0.696 0.17 162.48);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.7 0.15 220);  /* Match primary for focus rings */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  
  /* Primary: Sky-400 for dark mode (lighter for better visibility) */
  --primary: oklch(0.75 0.15 220);
  --primary-foreground: oklch(0.145 0 0);
  
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  
  --success: oklch(0.696 0.17 162.48);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.75 0.15 220);  /* Match primary for focus rings */
}
```

#### 4. Conversion Tool Reference

To convert Tailwind colors to OKLCH:
- Use tools like: https://oklch.com/
- Or use CSS color conversion utilities
- Tailwind Sky-500: `rgb(14, 165, 233)` → `oklch(0.7 0.15 220)`

#### 5. Testing Considerations

When implementing, ensure:
- ✅ Sufficient contrast ratio (WCAG AA: 4.5:1 for normal text, 3:1 for large text)
- ✅ Primary buttons are clearly visible in both themes
- ✅ Focus states (ring) are visible
- ✅ Links using primary color are readable
- ✅ Interactive elements maintain good contrast

## Impact
- ✅ More distinctive and modern default appearance
- ✅ Better visual identity out of the box
- ✅ Professional color choice
- ✅ Still customizable by users if needed

## Alternative Colors (Optional)

If Sky-500 doesn't fit the design system, consider:
- **Blue-500**: `oklch(0.65 0.2 250)` - More traditional
- **Indigo-500**: `oklch(0.6 0.2 270)` - More vibrant
- **Cyan-500**: `oklch(0.7 0.15 200)` - More tech-focused

But Sky-500 is recommended as it's:
- Modern and fresh
- Works well in both themes
- Not too aggressive or too muted
- Good for both B2B and B2C applications

## References
- Tailwind Sky Color Palette: https://tailwindcss.com/docs/customizing-colors#sky
- OKLCH Color Space: https://oklch.com/
- WCAG Contrast Guidelines: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

## ✅ Naprawione

**Data**: 2025-11-07  
**Zmiana**: Aktualizacja w CLI (`cli/src/commands/setup.ts`) – podczas tworzenia projektu helper `applyDefaultPrimaryColorToCSS` ustawia w wygenerowanym `src/css/style.css` wartości `--primary`/`--ring` na Sky (oklch 0.7/0.75). Sam plik w repo pozostaje bez zmian.

