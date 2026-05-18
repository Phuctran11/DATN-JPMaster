import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Footer, Container, Breadcrumbs } from '../components';
import {
  LessonActions,
  LessonContent,
  LessonHeaderSection,
  LessonMedia,
  LessonSidebarPanels,
  LessonStatusPage,
  type LessonItem,
} from '../components/lesson';
import { NoteComposer } from '../components/notes';
import { enrollmentAPI, lessonNoteAPI, quizAPI, type Lesson as LessonData, type LessonNote, type Quiz } from '../services/api';

export default function Lesson() {
  const navigate = useNavigate();
  const { id: courseId, lessonId } = useParams<{ id: string; lessonId: string }>();
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [actionLoading, setActionLoading] = useState<'complete' | 'next' | null>(null);
  const [lessonQuiz, setLessonQuiz] = useState<Quiz | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [highlightText, setHighlightText] = useState<string | null>(null);
  const [videoNoteTimestamp, setVideoNoteTimestamp] = useState<number | null | undefined>(undefined);
  const [lessonNotes, setLessonNotes] = useState<LessonNote[]>([]);

  const sectionRef = useRef<HTMLElement | null>(null);
  const lessonContentRef = useRef<HTMLElement | null>(null);
  const lessonMainRef = useRef<HTMLElement | null>(null);
  const [sidebarTopPx, setSidebarTopPx] = useState<number>(73);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureLessonLayout = () => {
      const headerEl = document.querySelector('[data-app-header]');
      const breadcrumbEl = document.querySelector('nav[aria-label="Breadcrumb"]');
      const headerH = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 0;
      const breadcrumbH = breadcrumbEl instanceof HTMLElement ? breadcrumbEl.offsetHeight : 0;

      setSidebarTopPx(Math.max(0, headerH + breadcrumbH));
    };

    const frameId = requestAnimationFrame(measureLessonLayout);
    const resizeObserver = new ResizeObserver(measureLessonLayout);
    const observedElements = [
      document.querySelector('[data-app-header]'),
      document.querySelector('nav[aria-label="Breadcrumb"]'),
      sectionRef.current,
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);

    observedElements.forEach((element) => resizeObserver.observe(element));
    window.addEventListener('resize', measureLessonLayout);
    window.addEventListener('orientationchange', measureLessonLayout);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureLessonLayout);
      window.removeEventListener('orientationchange', measureLessonLayout);
    };
  }, [loading, lessonId, courseName]);

  useEffect(() => {
    if (!lessonId) return;

    requestAnimationFrame(() => {
      if (isStudyMode) {
        lessonMainRef.current?.scrollTo({ top: 0, left: 0 });
        return;
      }

      window.scrollTo({ top: 0, left: 0 });
    });
  }, [lessonId, isStudyMode]);

  const handleToggleStudyMode = useCallback(() => {
    setIsStudyMode((previous) => {
      const next = !previous;

      if (next) {
        setIsSidebarOpen(false);
        requestAnimationFrame(() => {
          const lessonContentTop = lessonContentRef.current?.getBoundingClientRect().top;
          if (lessonContentTop == null) return;

          window.scrollTo({
            top: Math.max(0, window.scrollY + lessonContentTop - sidebarTopPx - 16),
            behavior: 'smooth',
          });
        });
      }

      return next;
    });
  }, [sidebarTopPx]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(min-width: 768px)');
      setIsSidebarOpen(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsSidebarOpen(e.matches);
      if (mq.addEventListener) {
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
      }
      mq.addListener(handler);
      return () => {
        mq.removeListener(handler);
      };
    }
  }, []);

  useEffect(() => {
    if (!courseId) return;

    let active = true;

    const fetchCourseLessons = async () => {
      try {
        setLoading(true);
        const result = await enrollmentAPI.getEnrolledCourseDetail(parseInt(courseId));
        if (!active) return;
        setLessons(result.data.lessons || []);
        setCourseName(result.data.title || '');
      } catch {
        if (active) {
          setLessons([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCourseLessons();

    return () => {
      active = false;
    };
  }, [courseId]);

  const firstUnfinishedIndex = useMemo(() => lessons.findIndex((l) => !l.is_completed), [lessons]);

  const currentLessonIndex = useMemo(() => {
    const currentId = Number(lessonId);
    const paramIndex = lessons.findIndex((lesson) => lesson.lesson_id === currentId);
    if (paramIndex >= 0) return paramIndex;
    if (firstUnfinishedIndex >= 0) return firstUnfinishedIndex;
    return lessons.length > 0 ? 0 : -1;
  }, [lessonId, lessons, firstUnfinishedIndex]);

  const currentLesson = currentLessonIndex >= 0 ? lessons[currentLessonIndex] : undefined;
  const lessonQuizPassed = !lessonQuiz || Boolean(lessonQuiz.has_passed || lessonQuiz.latest_attempt?.passed);
  const textNote = lessonNotes.find((note) => note.note_type === 'text_note') ?? null;
  const videoNotes = lessonNotes.filter((note) => note.note_type === 'video_note');
  const activeHighlightNote = highlightText
    ? lessonNotes.find((note) => note.note_type === 'highlight' && note.selected_text === highlightText) ?? null
    : null;
  const activeVideoNote = videoNoteTimestamp !== undefined
    ? lessonNotes.find((note) => note.note_type === 'video_note' && note.video_timestamp_seconds === videoNoteTimestamp) ?? null
    : null;

  const handleNoteSaved = useCallback((savedNote: LessonNote) => {
    setLessonNotes((previous) => {
      const exists = previous.some((note) => note.note_id === savedNote.note_id);
      return exists
        ? previous.map((note) => (note.note_id === savedNote.note_id ? { ...note, ...savedNote } : note))
        : [savedNote, ...previous];
    });
  }, []);

  useEffect(() => {
    if (!courseId || !currentLesson) {
      setLessonQuiz(null);
      return;
    }

    let active = true;
    const fetchQuizzes = async () => {
      try {
        setQuizLoading(true);
        const lessonQuizResult = await quizAPI.getLessonQuiz(currentLesson.lesson_id);

        if (!active) return;
        setLessonQuiz(lessonQuizResult.data);
      } catch {
        if (active) {
          setLessonQuiz(null);
        }
      } finally {
        if (active) {
          setQuizLoading(false);
        }
      }
    };

    fetchQuizzes();

    return () => {
      active = false;
    };
  }, [courseId, currentLesson]);

  useEffect(() => {
    if (!currentLesson) {
      setLessonNotes([]);
      return;
    }

    let active = true;
    const loadLessonNotes = async () => {
      try {
        const result = await lessonNoteAPI.getMyNotes({ lesson_id: currentLesson.lesson_id, limit: 100 });
        if (active) setLessonNotes(result.data);
      } catch {
        if (active) setLessonNotes([]);
      }
    };

    loadLessonNotes();

    return () => {
      active = false;
    };
  }, [currentLesson]);

  const handleMarkCompleted = useCallback(async () => {
    if (!courseId || !currentLesson || actionLoading) {
      return;
    }

    try {
      setActionLoading('complete');
      setActionError(null);
      const result = await enrollmentAPI.markLessonCompleted(parseInt(courseId), currentLesson.lesson_id);
      setLessons((previousLessons) =>
        previousLessons.map((lesson) =>
          lesson.lesson_id === currentLesson.lesson_id
            ? {
                ...lesson,
                is_completed: true,
              }
            : lesson
        )
      );
      if (result.data.final_quiz) {
        navigate(`/courses/${courseId}/final-test`);
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to mark lesson as completed');
    } finally {
      setActionLoading(null);
    }
  }, [actionLoading, courseId, currentLesson]);

  const handleNextLesson = useCallback(async () => {
    if (!courseId || !currentLesson?.is_completed || actionLoading) {
      return;
    }

    try {
      setActionLoading('next');
      // Prefer local navigation to the next lesson in the list (even if completed)
      if (currentLessonIndex >= 0 && currentLessonIndex + 1 < lessons.length) {
        const nextLesson = lessons[currentLessonIndex + 1];
        navigate(`/courses/${courseId}/lessons/${nextLesson.lesson_id}`);
        // ensure we are at the top of the new lesson
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
      } else {
        // Fallback to server-provided next lesson (e.g., if no local data)
        const result = await enrollmentAPI.getNextLesson(parseInt(courseId));
        navigate(`/courses/${courseId}/lessons/${result.data.lesson_id}`);
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
      }
    } finally {
      setActionLoading(null);
    }
  }, [actionLoading, courseId, currentLesson?.is_completed, navigate, currentLessonIndex, lessons]);

  const lessonItems: LessonItem[] = lessons.map((lesson, index) => ({
    id: lesson.lesson_id,
    title: lesson.title,
    status:
      index === currentLessonIndex
        ? 'current'
        : lesson.is_completed
          ? 'completed'
          : index === firstUnfinishedIndex
            ? 'unlocked'
            : 'locked',
  }));

  const hasNextLesson = currentLessonIndex >= 0 && currentLessonIndex + 1 < lessons.length;
  const hasLessonMedia = Boolean(currentLesson?.video_url?.trim());
  const progressPercent = lessons.length > 0 && currentLessonIndex >= 0 ? Math.round(((currentLessonIndex + 1) / lessons.length) * 100) : 0;
  const canMarkCurrentLessonComplete = lessonQuizPassed;
  const completeBlockedReason = lessonQuiz ? 'Pass the lesson quiz to unlock completion.' : undefined;

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'My Learning', path: '/courses' },
    { label: courseName || 'Course', path: courseId ? `/courses/${courseId}` : undefined },
    { label: currentLesson?.title || 'Lesson' },
  ];

  if (loading) {
    return <LessonStatusPage message="Loading lesson..." />;
  }

  if (!currentLesson) {
    return <LessonStatusPage message="Lesson not found" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      {!isStudyMode && (
        <LessonHeaderSection
          lesson={currentLesson}
          isSidebarOpen={isSidebarOpen}
          progressPercent={progressPercent}
          currentLessonNumber={currentLessonIndex >= 0 ? currentLessonIndex + 1 : 1}
          totalLessons={lessons.length}
          sectionRef={sectionRef}
          onBackToCourse={() => navigate(`/courses/${courseId}`)}
          onToggleSidebar={() => setIsSidebarOpen((previous) => !previous)}
        />
      )}

      <div className="flex flex-1 relative">
        <LessonSidebarPanels
          lessons={lessonItems}
          isOpen={isSidebarOpen}
          topPx={sidebarTopPx}
          onSelect={(selectedLessonId) => navigate(`/courses/${courseId}/lessons/${selectedLessonId}`)}
          onMobileSelect={(selectedLessonId) => {
            setIsSidebarOpen(false);
            navigate(`/courses/${courseId}/lessons/${selectedLessonId}`);
          }}
          onToggle={() => setIsSidebarOpen((previous) => !previous)}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        <main
          ref={lessonMainRef}
          className={
            isStudyMode
              ? 'fixed inset-0 z-[60] overflow-y-auto bg-surface-container-low py-6 transition-all duration-300 md:py-8'
              : `flex-1 bg-surface-container-low py-10 transition-all duration-300 md:py-12 ${isSidebarOpen ? 'md:ml-80' : 'md:ml-16'}`
          }
        >
          <Container className={isStudyMode ? 'h-full max-w-none px-margin-mobile md:px-margin-desktop' : ''}>
            <div
              className={
                isStudyMode
                  ? hasLessonMedia
                    ? 'mx-auto grid w-full max-w-none gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] xl:items-start'
                    : 'mx-auto flex min-h-full w-full max-w-[900px] flex-col justify-center gap-6'
                  : 'mx-auto flex max-w-[860px] flex-col gap-6'
              }
            >
              {hasLessonMedia && (
                <div className={isStudyMode ? 'xl:sticky xl:top-0' : ''}>
                  <LessonMedia lesson={currentLesson} onAddVideoNote={(timestamp) => setVideoNoteTimestamp(timestamp ?? null)} />
                </div>
              )}
              <LessonContent
                lesson={currentLesson}
                isStudyMode={isStudyMode}
                onToggleStudyMode={handleToggleStudyMode}
                articleRef={lessonContentRef}
                onAddHighlightNote={setHighlightText}
              />

              <NoteComposer
                lessonId={currentLesson.lesson_id}
                noteType="text_note"
                existingNote={textNote}
                title="Lesson note"
                placeholder="Grammar note, vocabulary tip, lesson summary..."
                onSaved={handleNoteSaved}
              />

              {videoNotes.length > 0 && (
                <section className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-title-md font-bold text-on-surface">
                    <span className="material-symbols-outlined text-primary">movie</span>
                    Video notes in this lesson
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {videoNotes.map((note) => (
                      <button
                        key={note.note_id}
                        type="button"
                        onClick={() => setVideoNoteTimestamp(note.video_timestamp_seconds ?? 0)}
                        className="rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-label-md font-bold text-primary"
                      >
                        {Math.floor((note.video_timestamp_seconds ?? 0) / 60)}:{String((note.video_timestamp_seconds ?? 0) % 60).padStart(2, '0')} noted
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {highlightText && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true">
                  <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
                    <NoteComposer
                      lessonId={currentLesson.lesson_id}
                      noteType="highlight"
                      selectedText={highlightText}
                      existingNote={activeHighlightNote}
                      title="Add highlight note"
                      compact
                      onSaved={handleNoteSaved}
                      onCreated={() => setHighlightText(null)}
                      onCancel={() => setHighlightText(null)}
                    />
                  </div>
                </div>
              )}

              {videoNoteTimestamp !== undefined && (
                <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true">
                  <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
                    <NoteComposer
                      lessonId={currentLesson.lesson_id}
                      noteType="video_note"
                      videoTimestampSeconds={videoNoteTimestamp ?? 0}
                      existingNote={activeVideoNote}
                      title="Add video note"
                      compact
                      onSaved={handleNoteSaved}
                      onCreated={() => setVideoNoteTimestamp(undefined)}
                      onCancel={() => setVideoNoteTimestamp(undefined)}
                    />
                  </div>
                </div>
              )}

              {quizLoading && (
                <section className="rounded-xl border border-outline-variant bg-white p-5 text-on-surface-variant shadow-sm">
                  Loading quizzes...
                </section>
              )}

              {lessonQuiz && (
                <section className={`rounded-xl border p-5 shadow-sm ${
                  lessonQuizPassed
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-amber-300 bg-amber-50'
                }`}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className={`text-label-md font-bold uppercase tracking-wide ${
                        lessonQuizPassed ? 'text-emerald-800' : 'text-amber-800'
                      }`}>
                        {lessonQuizPassed ? 'Lesson quiz passed' : 'Lesson quiz required'}
                      </p>
                      <h3 className="mt-1 text-headline-sm font-bold text-on-surface">{lessonQuiz.title}</h3>
                      <p className="mt-1 text-body-md text-on-surface-variant">
                        {lessonQuizPassed
                          ? 'You can retake this quiz anytime. Your completed lesson status will stay completed.'
                          : 'Pass this quiz in focus mode before marking the lesson complete.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/courses/${courseId}/lessons/${currentLesson.lesson_id}/quiz`)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-on-primary"
                    >
                      <span className="material-symbols-outlined">quiz</span>
                      {lessonQuizPassed ? 'Retake quiz' : 'Start quiz'}
                    </button>
                  </div>
                </section>
              )}

              <div className={isStudyMode && hasLessonMedia ? 'xl:col-span-2' : ''}>
                {actionError && (
                  <p className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-red-700">{actionError}</p>
                )}
                <LessonActions
                  isCompleted={Boolean(currentLesson.is_completed)}
                  isCompleting={actionLoading === 'complete'}
                  isLoadingNext={actionLoading === 'next'}
                  hasNextLesson={hasNextLesson}
                  canMarkComplete={canMarkCurrentLessonComplete}
                  completeBlockedReason={completeBlockedReason}
                  onMarkCompleted={handleMarkCompleted}
                  onNextLesson={handleNextLesson}
                />
              </div>
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
