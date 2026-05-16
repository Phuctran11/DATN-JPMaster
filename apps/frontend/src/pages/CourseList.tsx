import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer, Card, Container, Section, Breadcrumbs } from '../components';
import { Heading, Text } from '../components/ui/Typography';
import { MyLearningCard } from '../components/cards';
import { enrollmentAPI, type EnrolledCourse } from '../services/api';
import { useToastMessages } from '../hooks/useToastMessages';
import courseImage from '../assets/course.png';

export default function CourseList() {
  const navigate = useNavigate();
  const toastMessages = useToastMessages();
  const [activeStatus, setActiveStatus] = useState<'active' | 'completed'>('active');
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await enrollmentAPI.getMyCoursesByStatus(activeStatus);
        setCourses(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load courses';
        setError(errorMessage);
        toastMessages.error(errorMessage);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [activeStatus]);

  const handleOpenCourseDetail = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  const handleGetStarted = async (courseId: number) => {
    try {
      const lessonResult = await enrollmentAPI.getNextLesson(courseId);
      navigate(`/courses/${courseId}/lessons/${lessonResult.data.lesson_id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to open lesson';
      setError(errorMessage);
      toastMessages.error(errorMessage);
    }
  };

  const getStatusLabel = (status: 'active' | 'completed' | 'dropped'): 'In Progress' | 'Completed' | 'Not Started' => {
    if (status === 'active') return 'In Progress';
    if (status === 'completed') return 'Completed';
    return 'Not Started';
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'My Learning' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Breadcrumbs items={breadcrumbs} />
      <main className="flex-1">
        <Section bgColor="light">
          <Container>
            <div className="mb-section-gap">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-stack-lg">
                <div>
                  <Heading level="h1" size="display-lg" className="flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-secondary-fixed rounded-full"></span>
                    My Learning
                  </Heading>
                  <Text variant="body-lg" color="on-surface-variant" className="mt-3 max-w-2xl">
                    Track the courses you are currently studying or have already completed.
                  </Text>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(['active', 'completed'] as const).map((status) => {
                    const label = status === 'active' ? 'In Progress' : 'Completed';
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setActiveStatus(status)}
                        className={`rounded-full px-4 py-2 text-label-md font-semibold transition-colors border ${
                          activeStatus === status
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mb-stack-lg">
                <Heading level="h2" size="headline-lg" className="flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-secondary-fixed rounded-full"></span>
                  {activeStatus === 'active' ? 'In Progress' : 'Completed'} Courses
                </Heading>
              </div>

              {error && (
                <Card className="p-4 bg-error-container text-error border border-error mb-stack-lg">
                  <Text variant="body-md">{error}</Text>
                </Card>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Text variant="body-lg" color="on-surface-variant">
                    Loading courses...
                  </Text>
                </div>
              ) : courses.length === 0 ? (
                <Card className="p-8 text-center border border-outline-variant">
                  <Text variant="body-lg" color="on-surface-variant">
                    No courses found. Start exploring and enroll in a course!
                  </Text>
                </Card>
              ) : (
                <div className="flex flex-col gap-gutter">
                  {courses.map((enrollment) => (
                    <div key={enrollment.enrollment_id} className="w-full">
                      <MyLearningCard
                        courseId={enrollment.course_id}
                        title={enrollment.course.title}
                        progress={enrollment.progress_percent ?? (activeStatus === 'completed' ? 100 : 0)}
                        status={getStatusLabel(enrollment.status)}
                        image={courseImage}
                        onClick={handleOpenCourseDetail}
                        onGetStarted={handleGetStarted}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-section-gap">
              <Card className="p-8 border border-outline-variant">
                <Heading level="h3" size="headline-md" className="mb-3">
                  What these tags do
                </Heading>
                <Text variant="body-md" color="on-surface-variant">
                  Use the status chips above to switch between courses that are still in progress and courses you have completed.
                </Text>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
