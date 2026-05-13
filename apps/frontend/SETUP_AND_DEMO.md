# JPMaster Frontend - Setup & Demo Guide

## ✅ Conversion Status

| Page | Status | Improvements |
|------|--------|--------------|
| Homepage | ✓ TSX | Already done |
| CourseList | ✓ TSX + Refactored | Component extraction |
| CourseDetail | ✓ Converted HTML → TSX | ModuleItem, ReviewItem components |
| Lesson | ✓ Converted HTML → TSX | LessonSidebar, VideoPlayer components |
| Flashcard | ✓ TSX | Already done |
| FlashcardDetail | ✓ TSX | Already done |
| BlogList | ✓ Converted HTML → TSX | BlogCard, FeaturedBlogCard |
| BlogDetail | ✓ Converted HTML → TSX | Comment component, BlogCard reuse |
| TestList | ✓ Converted HTML → TSX | TestCard, TestimonialCard |
| Login | ✓ TSX + Fixed | Import path corrected |
| Signup | ✓ TSX + Fixed | Import path corrected |

## 📦 Setup Instructions

### 1. Install Dependencies

```bash
cd apps/frontend
npm install
```

This will install:
- React 19.2.5
- React DOM 19.2.5
- **React Router DOM 6.20.0** (newly added for navigation)
- Vite
- Tailwind CSS
- TypeScript

### 2. Start Development Server

```bash
npm run dev
```

Server will start at: **http://localhost:5173**

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 🗺️ Navigation Structure

```
/
├── / (Homepage)
├── /courses (CourseList)
├── /courses/:id (CourseDetail)
├── /courses/:id/lessons/:lessonId (Lesson)
├── /flashcards (Flashcard)
├── /flashcards/:id (FlashcardDetail)
├── /tests (TestList)
├── /blog (BlogList)
├── /blog/:id (BlogDetail)
├── /login (Login)
└── /signup (Signup)
```

## 🎯 Demo Walkthrough

### 1. **Home Page**
- URL: `http://localhost:5173/`
- Features:
  - Hero section with Japanese learning proposition
  - "Why Choose Us" section
  - Featured courses carousel
  - Testimonials from students
  - Newsletter signup

**Navigation Links to Test:**
- Click "Courses" → `/courses`
- Click "Flashcards" → `/flashcards`
- Click "Tests" → `/tests`
- Click "Blog" → `/blog`
- Click "Login" / "Sign Up" buttons

### 2. **Courses List**
- URL: `http://localhost:5173/courses`
- Features:
  - Filter by category and level
  - Sort options
  - My Learning progress cards
  - Featured course promotion
  - Other courses grid
  - Student testimonials

**Try:**
- Change filters to see dynamic styling
- Hover over course cards for interactive effects
- Scroll through different course levels

### 3. **Course Detail**
- URL: `http://localhost:5173/courses/1` (any course ID)
- Features:
  - Hero section with course info
  - Instructor details
  - Module breakdown with video counts
  - Student reviews with ratings
  - CTA section to enroll

**Components Reused:**
- `ReviewItem` component (same as TestList)
- Shared styling patterns with CourseList

### 4. **Lesson Page**
- URL: `http://localhost:5173/courses/1/lessons/3`
- Features:
  - Sidebar with lesson navigation
  - Lesson completion status indicators
  - Video player
  - Instructional content
  - Previous/Next navigation
  - Progress tracking

**Test:**
- Click different lessons in sidebar (some locked)
- Notice completed lessons have checkmarks
- Current lesson highlighted

### 5. **Flashcards**
- URL: `http://localhost:5173/flashcards`
- Features:
  - Card collection overview
  - Create new collection form
  - Flashcard item list
  - Study review mode
  - Newsletter signup

### 6. **Tests**
- URL: `http://localhost:5173/tests`
- Features:
  - Filter by JLPT level
  - Filter by section type
  - Practice test cards
  - Test taking protocol guidelines
  - Scoring table
  - Student testimonials

### 7. **Blog**
- URL: `http://localhost:5173/blog`
- Features:
  - Blog filter bar
  - Featured blog post
  - Category filtering
  - Search functionality
  - Blog cards grid

### 8. **Blog Detail**
- URL: `http://localhost:5173/blog/1`
- Features:
  - Full article content
  - Author & metadata
  - Comments section
  - Related posts (reuses `BlogCard`)

### 9. **Authentication**
- **Login Page:** `http://localhost:5173/login`
- **Signup Page:** `http://localhost:5173/signup`
- Features:
  - Form inputs
  - Social login buttons
  - Password recovery link
  - Sign up benefits

## 🎨 Component Reusability Map

```
BlogCard
├── Used in: BlogList, BlogDetail (related posts)
└── Benefit: Consistent blog card styling

TestCard
├── Used in: TestList
└── Benefit: Standardized test presentation

TestimonialCard
├── Used in: TestList, CourseDetail
└── Benefit: Reusable testimonial display

CourseCard (3 variants)
├── MyLearningCard: CourseList
├── CourseGridCard: CourseList
├── FeaturedCourseCard: CourseList
└── Benefit: Flexible course presentation

ModuleItem (new)
├── Used in: CourseDetail
└── Benefit: Module list rendering

ReviewItem (new)
├── Used in: CourseDetail
└── Benefit: Review card display

LessonSidebar (new)
├── Used in: Lesson
└── Benefit: Lesson navigation
```

## 🔗 Navigation Features

### Active Link Highlighting
- Current page link shows active state (bold + border)
- Uses `useLocation()` hook to detect current page
- Automatically active when on that page or subpages

### Programmatic Navigation
- Login/Signup buttons use `useNavigate()` for routing
- Smooth transitions between pages

## 📋 Checklist Before Demo

- [ ] Dependencies installed: `npm install`
- [ ] Dev server running: `npm run dev`
- [ ] Browser opened to `http://localhost:5173`
- [ ] Navigation links work (test 3-4 links)
- [ ] Page transitions smooth
- [ ] Mobile responsive (resize browser window)
- [ ] Images load correctly
- [ ] No console errors

## 🚀 Demo Script

1. **Start:** "This is JPMaster, a Japanese learning platform"
2. **Show Homepage:** "Clean, academic design with learning sections"
3. **Navigate:** "Click through navigation to show different pages"
4. **Demo Courses:** "View course list, filter by level, then see course detail"
5. **Show Lesson:** "Inside a course, see lesson with video player and content"
6. **Show Tests:** "JLPT practice tests with different levels"
7. **Show Blog:** "Educational content about Japanese learning"
8. **Component Reuse:** "Notice same card components across different pages"

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
npm run dev -- --port 5174
```

### Dependencies Not Installing
```bash
rm node_modules package-lock.json
npm install
```

### Hot Module Replacement (HMR) Issues
```bash
# Clear Vite cache
rm -rf .vite
npm run dev
```

### Build Errors
```bash
npm run build 2>&1  # See full error output
npm run lint        # Check for linting issues
```

## 📁 Project Structure

```
apps/frontend/
├── src/
│   ├── components/
│   │   ├── cards/           (reusable card components)
│   │   ├── sections/        (page sections)
│   │   ├── ui/              (basic UI components)
│   │   ├── Header.tsx       (navigation)
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/               (all pages as TSX)
│   │   ├── Homepage.tsx
│   │   ├── CourseList.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── Lesson.tsx
│   │   ├── BlogList.tsx
│   │   ├── BlogDetail.tsx
│   │   ├── TestList.tsx
│   │   ├── Flashcard.tsx
│   │   ├── FlashcardDetail.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── App.tsx              (routing setup)
│   ├── main.tsx             (entry point)
│   ├── index.css            (global styles)
│   └── ...
├── public/
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 💡 Key Technologies

- **React 19**: Latest UI library
- **React Router DOM 6**: Client-side routing
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Lightning-fast build tool

## ✨ Next Steps (Optional Enhancements)

1. **API Integration**: Connect to backend endpoints
2. **State Management**: Add Redux/Zustand for complex state
3. **Authentication**: Implement real auth flow
4. **Image Optimization**: Use Next.js Image or similar
5. **SEO**: Add meta tags and structured data
6. **Performance**: Code splitting, lazy loading
7. **Testing**: Jest + React Testing Library
8. **E2E Testing**: Cypress or Playwright

---

**Status:** ✅ Frontend ready for demo and development

All pages converted to TSX, routing configured, navigation linked, and reusable components extracted!
