# Frontend Structure - JPMaster

## Project Overview
Refactored React + TypeScript + Tailwind CSS frontend with a clean, reusable component architecture.

## Directory Structure

```
src/
├── components/
│   ├── ui/                      # Base UI components
│   │   ├── index.tsx           # Card, GlassCard, Section, Container, Badge, Stat, Avatar, Icon
│   │   └── Typography.tsx      # Heading, Text
│   ├── sections/               # Page sections (used in Homepage)
│   │   ├── HeroSection.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── NewsletterSection.tsx
│   │   └── index.ts           # Section exports
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Footer component
│   ├── Button.tsx             # Button variants (Primary, Secondary, Outline)
│   ├── FormInputs.tsx         # Input & Select components
│   └── index.ts               # Main component exports
├── pages/
│   ├── Homepage.tsx           # Main landing page
│   ├── Login.tsx              # Login page
│   ├── Signup.tsx             # Sign up page
│   └── index.ts               # Page exports
├── App.tsx                    # Root app component
├── main.tsx                   # Entry point
└── index.css                  # Global Tailwind styles
```

## Component Hierarchy

### UI Components (`ui/`)
Base reusable components used throughout the app:

- **Card**: Basic white card with hover effects
- **GlassCard**: Frosted glass effect card
- **Section**: Page section with background color options (light/dark/primary)
- **Container**: Max-width wrapper for content
- **Badge**: Accent badge with variants
- **Stat**: Statistics display (value + label)
- **Avatar**: Image avatar with size options
- **Icon**: Material icon wrapper with fill and size options
- **Heading**: Typography heading (h1-h6) with size variants
- **Text**: Typography text with color and variant options

### Layout Components
- **Header**: Sticky navigation bar
- **Footer**: Page footer with links
- **Section**: Wrapper for page sections with consistent spacing
- **Container**: Responsive max-width container

### Form Components
- **Button**: Base button component with variants
- **Input**: Text input with label and error support
- **Select**: Dropdown select with label

### Page Sections (used in Homepage)
Each section is a self-contained component:
- **HeroSection**: Hero with content and CTA
- **WhyChooseUsSection**: Value proposition section
- **FeaturedCoursesSection**: Course showcase
- **TestimonialsSection**: Customer testimonials
- **NewsletterSection**: Email signup

## Usage Examples

### Using UI Components
```tsx
import { Card, GlassCard, Container, Badge, Icon } from '../components/ui';
import { Heading, Text } from '../components/ui/Typography';

export function MyComponent() {
  return (
    <Container>
      <Badge variant="primary">Featured</Badge>
      <Heading level="h2" size="headline-lg">
        My Title
      </Heading>
      <Text variant="body-md" color="on-surface-variant">
        Description text
      </Text>
      <Card>
        <p>Card content</p>
      </Card>
    </Container>
  );
}
```

### Using Form Components
```tsx
import { Input, Select, Button } from '../components';

export function MyForm() {
  const [name, setName] = useState('');

  return (
    <form>
      <Input
        id="name"
        label="Full Name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select
        id="level"
        label="Level"
        options={[
          { value: 'beginner', label: 'Beginner' },
          { value: 'advanced', label: 'Advanced' },
        ]}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Creating a Page
```tsx
import { Header, Footer } from '../components';
import { HeroSection } from '../components/sections';

export default function MyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
```

## Tailwind CSS Configuration

All custom colors, spacing, and typography are defined in `tailwind.config.js`:

- **Colors**: Primary, secondary, tertiary, surface variants
- **Spacing**: Custom spacing scale (stack-sm, stack-md, stack-lg, margin-desktop, margin-mobile)
- **Typography**: Headline, body, label sizes with custom font families (Manrope, Inter)
- **Animations**: Fade-in, bounce-subtle, pulse-slow

## Best Practices

1. **Component Reusability**: Always extract repeated UI into components
2. **Consistent Spacing**: Use Tailwind spacing tokens (stack-md, gutter, etc.)
3. **Color Consistency**: Use defined color palette from Tailwind config
4. **Typography**: Use Heading and Text components for consistency
5. **Props Pattern**: Use TypeScript interfaces for all props
6. **Avoid Inline Styles**: Use Tailwind classes instead
7. **Mobile First**: Design responsive from mobile up

## Key Files to Know

- `tailwind.config.js`: Design system configuration
- `src/index.css`: Global styles and Tailwind directives
- `src/components/index.ts`: Export all components for easy importing
- `src/pages/index.ts`: Export all pages for routing

## Future Enhancements

- Add React Router for page routing
- Add state management (Redux/Zustand)
- Add API integration layer
- Add form validation library
- Add animations library (Framer Motion)
- Add testing setup (Vitest/React Testing Library)
