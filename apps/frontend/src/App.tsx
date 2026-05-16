import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/Toast';
import { Suspense, lazy } from 'react';

const Homepage = lazy(() => import('./pages/Homepage'));
const CourseList = lazy(() => import('./pages/CourseList'));
const CourseExplore = lazy(() => import('./pages/CourseExplore'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Lesson = lazy(() => import('./pages/Lesson'));
const Flashcard = lazy(() => import('./pages/Flashcard'));
const FlashcardDetail = lazy(() => import('./pages/FlashcardDetail'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const TestList = lazy(() => import('./pages/TestList'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <ToastContainer />
          <Suspense fallback={
            <div className="min-h-screen flex flex-col bg-background">
              <div className="mx-auto my-20 text-center">
                <p className="text-on-surface-variant">Loading...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/explore" element={<CourseExplore />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:id/lessons/:lessonId" element={<Lesson />} />
              <Route path="/flashcards" element={<Flashcard />} />
              <Route path="/flashcards/:id" element={<FlashcardDetail />} />
              <Route path="/tests" element={<TestList />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
