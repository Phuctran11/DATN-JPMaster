import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Footer, Button, Card, Container, Breadcrumbs } from '../components';
import { Heading, Text } from '../components/ui/Typography';
import { enrollmentAPI, type Lesson as LessonData } from '../services/api';

interface LessonItem {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'unlocked' | 'locked';
}

function LessonSidebar({ lessons, onSelect }: { lessons: LessonItem[]; onSelect: (lessonId: number) => void }) {
  return (
    <aside className="bg-white border-r border-outline-variant h-[calc(100vh-73px)] sticky top-[73px] z-40 overflow-y-auto shrink-0">
      <div className="flex flex-col py-6 px-6 gap-4">
        <h3 className="text-label-md text-on-surface-variant uppercase tracking-widest px-2 mb-2">Course Contents</h3>
        {lessons.map((lesson) => {
          const isCompleted = lesson.status === 'completed';
          const isCurrent = lesson.status === 'current';
          const isUnlocked = lesson.status === 'unlocked';
          const isLocked = lesson.status === 'locked';

          return (
            <button
              key={lesson.id}
              type="button"
              className={`flex items-center gap-3 font-label-md text-label-md p-2 rounded w-full text-left transition-colors ${
                isCurrent
                  ? 'text-primary font-bold bg-primary/5'
                  : isCompleted
                    ? 'text-on-surface-variant hover:bg-surface-container'
                    : isUnlocked
                      ? 'text-primary hover:bg-primary/5'
                      : isLocked
                        ? 'text-on-surface-variant opacity-50 cursor-not-allowed'
                        : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              disabled={isLocked}
              onClick={() => !isLocked && onSelect(lesson.id)}
            >
              {isCompleted && (
                <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              )}
              {isCurrent && <span className="material-symbols-outlined">play_circle</span>}
              {isUnlocked && <span className="material-symbols-outlined text-primary">play_arrow</span>}
              {isLocked && <span className="material-symbols-outlined">lock</span>}
              {lesson.title}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function VideoPlayer({ lesson }: { lesson: LessonData }) {
  return (
    <Card className="bg-white rounded-xl overflow-hidden mb-stack-lg">
      <div className="aspect-video relative group cursor-pointer">
        <img
          alt={lesson.title}
          className="w-full h-full object-cover"
          src={lesson.video_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuABXxQQiuxSDDTiNQfF-SNAbUrUXWnX2kk1PF4wg_xKcUioCcjgWq19NfhZTK2Zbo37V9WEoPm6gHpkLsLEZWbJ_lYB7qpj1Fmo8gxn_XXrVYoGEEM0Gz_L7HaMqyJ-UKiAeUHkZX4C1oCyJqMm0xoupXemR3UVemOKhmuEy40Tr1o6eUaP_qBE0ahLqblGs1yVy7ky67OS0ZpyEGdL3_rHGc_Pfclzv-CdgfhkKjJclajN7q4RgrStmybRPUZ1Q7TyKS-YBB599T8L'}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-stack-md bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-label-md text-label-md">{lesson.title}</p>
        </div>
      </div>
    </Card>
  );
}

export default function Lesson() {
  const navigate = useNavigate();
  const { id: courseId, lessonId } = useParams<{ id: string; lessonId: string }>();
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [courseName, setCourseName] = useState<string>('');
  const [loading, setLoading] = useState(true);

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

  const lessonItems: LessonItem[] = lessons.map((lesson, index) => ({
    id: lesson.lesson_id,
    title: lesson.title,
    status: index === currentLessonIndex
      ? 'current'
      : lesson.is_completed
        ? 'completed'
        : index === firstUnfinishedIndex
          ? 'unlocked'
          : 'locked',
  }));

  const progressPercent = lessons.length > 0 && currentLessonIndex >= 0 ? Math.round((currentLessonIndex / lessons.length) * 100) : 0;

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'My Learning', path: '/courses' },
    { label: courseName || 'Course', path: courseId ? `/courses/${courseId}` : undefined },
    { label: currentLesson?.title || 'Lesson' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Text variant="body-lg" color="on-surface-variant">
            Loading lesson...
          </Text>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Text variant="body-lg" color="on-surface-variant">
            Lesson not found
          </Text>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-surface py-stack-lg border-b border-outline-variant">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-md">
            <div className="flex flex-col gap-unit">
              <Button variant="secondary" className="w-fit flex items-center gap-2" onClick={() => navigate(`/courses/${courseId}`)}>
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Course
              </Button>
              <Heading level="h1" size="headline-lg" className="text-on-surface">
                {currentLesson.title}
              </Heading>
              <div className="flex items-center gap-stack-md text-on-surface-variant">
                <span className="flex items-center gap-1 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  15 mins
                </span>
                <span className="flex items-center gap-1 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  {currentLesson.content_type}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-48 bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="text-right font-label-md text-label-md mt-2 text-on-surface-variant">
                Lesson {currentLessonIndex >= 0 ? currentLessonIndex + 1 : 1} of {lessons.length || 1}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="flex flex-1">
        <LessonSidebar lessons={lessonItems} onSelect={(selectedLessonId) => navigate(`/courses/${courseId}/lessons/${selectedLessonId}`)} />

        <main className="flex-1 py-section-gap" style={{ backgroundImage: 'radial-gradient(#d1d5db 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
          <Container>
            <div className="max-w-[800px] mx-auto">
              <VideoPlayer lesson={currentLesson} />

              <article className="bg-surface-container-lowest p-stack-lg border border-outline-variant rounded-xl shadow-sm space-y-stack-md">
                <header className="border-b border-outline-variant pb-stack-md mb-stack-md">
                  <Heading level="h2" size="headline-md" className="text-primary">
                    {currentLesson.title}
                  </Heading>
                  <Text variant="body-md" color="on-surface-variant" className="mt-2">
                    {currentLesson.content_type === 'video'
                      ? 'Watch the lesson video and follow along with the walkthrough.'
                      : 'Read the lesson content and complete the activity at your own pace.'}
                  </Text>
                </header>

                <section className="space-y-stack-md prose prose-lg max-w-none">
                  <p className="font-body-lg text-body-lg leading-relaxed">
                    {currentLesson.content_text || 'This lesson content will appear here.'}
                  </p>

                  <Card className="p-stack-md bg-surface-container-low rounded border border-outline-variant">
                    <h3 className="font-label-md text-label-md text-secondary mb-2 uppercase tracking-wider">Lesson Type</h3>
                    <Text variant="body-md" color="on-surface-variant">
                      {currentLesson.content_type}
                    </Text>
                  </Card>
                </section>

                <footer className="flex items-center justify-between pt-section-gap border-t border-outline-variant">
                  <Button variant="secondary" className="flex items-center gap-2" onClick={() => navigate(`/courses/${courseId}`)}>
                    <span className="material-symbols-outlined">chevron_left</span>
                    Back to Course
                  </Button>
                  <Button className="flex items-center gap-2">
                    Check Understanding
                    <span className="material-symbols-outlined">chevron_right</span>
                  </Button>
                </footer>
              </article>
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
