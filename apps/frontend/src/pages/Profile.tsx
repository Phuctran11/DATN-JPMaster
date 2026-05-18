import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header, Footer, Button, Card, Container, Section, Breadcrumbs } from '../components';
import { Heading, Text } from '../components/ui/Typography';
import { enrollmentAPI, userAPI, type EnrolledCourse, type UserProfile } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const formatDate = (value?: string) => {
  if (!value) return 'Not available';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getEffectiveStatus = (enrollment: EnrolledCourse): 'active' | 'completed' | 'dropped' => {
  return enrollment.status;
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading, updateUser } = useAuth();
  const { addToast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      addToast('Please log in to view your profile', 'error');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const [profileResult, enrollmentResult] = await Promise.all([
          userAPI.getMe(),
          enrollmentAPI.getMyCourses(100, 0),
        ]);

        setProfile(profileResult.data);
        setUsername(profileResult.data.username);
        setEmail(profileResult.data.email);
        setEnrollments(enrollmentResult.data);
      } catch (error) {
        addToast(error instanceof Error ? error.message : 'Failed to load profile', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [addToast, authLoading, navigate, user]);

  const completedCourses = useMemo(() => {
    return enrollments.filter((enrollment) => getEffectiveStatus(enrollment) === 'completed');
  }, [enrollments]);

  const activeCourses = useMemo(() => {
    return enrollments.filter((enrollment) => getEffectiveStatus(enrollment) === 'active');
  }, [enrollments]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextUsername = username.trim();
    const nextEmail = email.trim().toLowerCase();

    if (!nextUsername || !nextEmail) {
      addToast('Username and email are required', 'error');
      return;
    }

    try {
      setSaving(true);
      const result = await userAPI.updateMe({
        username: nextUsername,
        email: nextEmail,
      });

      setProfile(result.data);
      setUsername(result.data.username);
      setEmail(result.data.email);
      updateUser({
        user_id: result.data.user_id,
        username: result.data.username,
        email: result.data.email,
        role: result.data.role,
      });
      addToast('Profile updated successfully', 'success');
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Profile' },
  ];

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-on-surface-variant">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-on-surface-variant">Profile unavailable</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Breadcrumbs items={breadcrumbs} />
      <main className="flex-1">
        <Section bgColor="light">
          <Container>
            <div className="mb-section-gap grid grid-cols-1 gap-8 lg:grid-cols-12">
              <aside className="lg:col-span-4">
                <Card className="overflow-hidden border border-outline-variant bg-surface">
                  <div className="bg-gradient-to-br from-primary to-secondary p-8 text-on-primary">
                    <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/40 bg-white/15 text-display-md font-bold shadow-xl">
                      {profile.username.charAt(0).toUpperCase()}
                    </div>
                    <Heading level="h1" size="headline-lg" className="text-on-primary">
                      {profile.username}
                    </Heading>
                    <p className="mt-2 text-label-md text-white/85 break-all">{profile.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-6">
                    <div className="rounded-xl border border-outline-variant bg-primary-fixed/20 p-4">
                      <p className="text-label-sm font-bold uppercase tracking-wide text-on-surface-variant">Completed</p>
                      <p className="mt-2 text-headline-md font-bold text-primary">{completedCourses.length}</p>
                    </div>
                    <div className="rounded-xl border border-outline-variant bg-secondary-container/30 p-4">
                      <p className="text-label-sm font-bold uppercase tracking-wide text-on-surface-variant">In progress</p>
                      <p className="mt-2 text-headline-md font-bold text-primary">{activeCourses.length}</p>
                    </div>
                    <div className="col-span-2 rounded-xl border border-outline-variant bg-surface-container-low p-4">
                      <p className="text-label-sm font-bold uppercase tracking-wide text-on-surface-variant">Member since</p>
                      <p className="mt-2 text-title-md font-bold text-on-surface">{formatDate(profile.created_at)}</p>
                    </div>
                  </div>
                </Card>
              </aside>

              <div className="space-y-8 lg:col-span-8">
                <Card className="p-6 md:p-8 border border-outline-variant">
                  <div className="mb-6">
                    <Heading level="h2" size="headline-lg" className="text-primary">
                      Basic Information
                    </Heading>
                    <Text variant="body-md" color="on-surface-variant" className="mt-2">
                      Update your display name and contact email.
                    </Text>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="username" className="mb-2 block text-label-lg font-bold text-on-surface">
                        Username
                      </label>
                      <input
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-label-lg font-bold text-on-surface">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Card>

                <Card className="p-6 md:p-8 border border-outline-variant">
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <Heading level="h2" size="headline-lg" className="text-primary">
                        Certifications
                      </Heading>
                      <Text variant="body-md" color="on-surface-variant" className="mt-2">
                        Certificates earned from completed courses.
                      </Text>
                    </div>
                    <Link to="/courses" className="text-label-md font-bold text-primary hover:underline">
                      View My Learning
                    </Link>
                  </div>

                  {completedCourses.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
                      <span className="material-symbols-outlined text-[56px] text-outline">workspace_premium</span>
                      <Text variant="body-md" color="on-surface-variant" className="mt-3">
                        Complete a course to unlock your first certificate.
                      </Text>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {completedCourses.map((enrollment) => (
                        <div
                          key={enrollment.enrollment_id}
                          className="rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary-container/40 to-surface p-5 shadow-sm"
                        >
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div>
                              <p className="text-label-sm font-black uppercase tracking-wide text-secondary">Certified Course</p>
                              <h3 className="mt-2 text-title-lg font-bold text-on-surface">{enrollment.course.title}</h3>
                            </div>
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary">
                              <span className="material-symbols-outlined">verified</span>
                            </div>
                          </div>
                          <div className="mb-4 grid grid-cols-2 gap-3 text-label-md">
                            <div className="rounded-xl bg-white/70 p-3">
                              <p className="font-bold text-on-surface-variant">Progress</p>
                              <p className="text-primary font-bold">{enrollment.progress_percent ?? 100}%</p>
                            </div>
                            <div className="rounded-xl bg-white/70 p-3">
                              <p className="font-bold text-on-surface-variant">Enrolled</p>
                              <p className="text-primary font-bold">{formatDate(enrollment.enrollment_date)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => navigate(`/courses/${enrollment.course_id}/certificate`)}
                            className="w-full"
                          >
                            View Certificate
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
