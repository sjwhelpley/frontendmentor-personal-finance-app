# Using SVGs with Dynamic Fill Colors in Next.js

## Setup Complete ✅

I've configured SVGR webpack loader so you can import SVGs as React components and change their fill colors dynamically.

## How to Use

### Option 1: Import as React Component (Recommended)

```tsx
import IconRecurringBills from "../../../public/images/icon-recurring-bills.svg";

// Use with Tailwind classes
<IconRecurringBills className="w-6 h-6 [&_path]:fill-white" />

// Or with inline styles
<IconRecurringBills 
  className="w-6 h-6" 
  style={{ fill: "white" }}
/>
```

### Option 2: Override Hardcoded Fill Colors

If your SVG has hardcoded `fill="#fff"` in path elements, use CSS to override:

```tsx
// Using Tailwind arbitrary variants
<IconRecurringBills className="w-6 h-6 [&_path]:fill-blue-500" />

// Or using CSS
<IconRecurringBills className="w-6 h-6 custom-icon" />
// In CSS: .custom-icon path { fill: currentColor; }
```

### Option 3: Modify SVG Files (Best for Long-term)

For the best experience, modify your SVG files to use `fill="currentColor"`:

```svg
<!-- Before -->
<path fill="#fff" d="..." />

<!-- After -->
<path fill="currentColor" d="..." />
```

Then you can use:
```tsx
<IconRecurringBills className="w-6 h-6 text-white" />
```

## Still Using next/image?

If you need to keep using `next/image` for some SVGs, you can:
- Use `?url` suffix: `import icon from "/images/icon.svg?url"`
- Or use CSS filters (limited control)

## Configuration

The SVGR configuration is in `next.config.ts`. SVGs are automatically converted to React components unless you use the `?url` suffix.

