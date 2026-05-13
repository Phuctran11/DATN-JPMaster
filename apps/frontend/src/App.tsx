import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Lesson from './pages/Lesson';
import Flashcard from './pages/Flashcard';
import FlashcardDetail from './pages/FlashcardDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import TestList from './pages/TestList';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CourseList />} />
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
    </BrowserRouter>
  );
}

export default App;
