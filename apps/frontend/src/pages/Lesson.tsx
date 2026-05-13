import { Header, Footer, Button, Card, Container } from '../components';
import { Heading, Text } from '../components/ui/Typography';

interface LessonItem {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'locked';
}

function LessonSidebar({ lessons }: { lessons: LessonItem[] }) {
  return (
    <aside className="bg-white border-r border-outline-variant h-[calc(100vh-73px)] sticky top-[73px] z-40 overflow-y-auto shrink-0">
      <div className="flex flex-col py-6 px-6 gap-4">
        <h3 className="text-label-md text-on-surface-variant uppercase tracking-widest px-2 mb-2">Course Contents</h3>
        {lessons.map((lesson) => {
          const isCompleted = lesson.status === 'completed';
          const isCurrent = lesson.status === 'current';
          const isLocked = lesson.status === 'locked';

          return (
            <button
              key={lesson.id}
              className={`flex items-center gap-3 font-label-md text-label-md p-2 rounded w-full text-left transition-colors ${
                isCurrent
                  ? 'text-primary font-bold bg-primary/5'
                  : isCompleted
                    ? 'text-on-surface-variant hover:bg-surface-container'
                    : isLocked
                      ? 'text-on-surface-variant opacity-50 cursor-not-allowed'
                      : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              disabled={isLocked}
            >
              {isCompleted && (
                <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              )}
              {isCurrent && <span className="material-symbols-outlined">play_circle</span>}
              {isLocked && <span className="material-symbols-outlined">lock</span>}
              {lesson.title}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function VideoPlayer() {
  return (
    <Card className="bg-white rounded-xl overflow-hidden mb-stack-lg">
      <div className="aspect-video relative group cursor-pointer">
        <img
          alt="Video Placeholder"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuABXxQQiuxSDDTiNQfF-SNAbUrUXWnX2kk1PF4wg_xKcUioCcjgWq19NfhZTK2Zbo37V9WEoPm6gHpkLsLEZWbJ_lYB7qpj1Fmo8gxn_XXrVYoGEEM0Gz_L7HaMqyJ-UKiAeUHkZX4C1oCyJqMm0xoupXemR3UVemOKhmuEy40Tr1o6eUaP_qBE0ahLqblGs1yVy7ky67OS0ZpyEGdL3_rHGc_Pfclzv-CdgfhkKjJclajN7q4RgrStmybRPUZ1Q7TyKS-YBB599T8L"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-stack-md bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-label-md text-label-md">Introduction to 20-Stroke Composition (08:42)</p>
        </div>
      </div>
    </Card>
  );
}

export default function Lesson() {
  const lessons: LessonItem[] = [
    { id: 1, title: 'Radical Fusion', status: 'completed' },
    { id: 2, title: 'Symmetry & Balance', status: 'completed' },
    { id: 3, title: 'Complex Stroke Order', status: 'current' },
    { id: 4, title: 'Balance Principles', status: 'locked' },
    { id: 5, title: 'Module Assessment', status: 'locked' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Lesson Header */}
      <section className="bg-surface py-stack-lg border-b border-outline-variant">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-md">
            <div className="flex flex-col gap-unit">
              <Button variant="secondary" className="w-fit flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Course
              </Button>
              <Heading level="h1" size="headline-lg" className="text-on-surface">
                Module 2: The Architecture of Complex Kanji
              </Heading>
              <div className="flex items-center gap-stack-md text-on-surface-variant">
                <span className="flex items-center gap-1 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  15 mins
                </span>
                <span className="flex items-center gap-1 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  Advanced Theory
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-48 bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-2/3"></div>
              </div>
              <p className="text-right font-label-md text-label-md mt-2 text-on-surface-variant">Lesson 4 of 6</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <div className="flex flex-1">
        <LessonSidebar lessons={lessons} />

        <main className="flex-1 py-section-gap" style={{ backgroundImage: 'radial-gradient(#d1d5db 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
          <Container>
            <div className="max-w-[800px] mx-auto">
              {/* Video Section */}
              <VideoPlayer />

              {/* Instructional Content */}
              <article className="bg-surface-container-lowest p-stack-lg border border-outline-variant rounded-xl shadow-sm space-y-stack-md">
                <header className="border-b border-outline-variant pb-stack-md mb-stack-md">
                  <Heading level="h2" size="headline-md" className="text-primary">
                    The Logic of Order
                  </Heading>
                  <Text variant="body-md" color="on-surface-variant" className="mt-2">
                    Precision in Japanese calligraphy isn't just about the final form; it is about the journey of the brush.
                  </Text>
                </header>

                <section className="space-y-stack-md prose prose-lg max-w-none">
                  <p className="font-body-lg text-body-lg leading-relaxed">
                    When approaching characters with more than 15 strokes, the cognitive load can be overwhelming. To master these complex
                    Kanji, we follow the universal rule of <span className="text-primary font-bold">Top-to-Bottom, Left-to-Right</span>,
                    but with a nuanced emphasis on radial symmetry.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter py-stack-md">
                    <Card className="p-stack-md bg-surface-container-low rounded border border-outline-variant">
                      <h3 className="font-label-md text-label-md text-secondary mb-2 uppercase tracking-wider">Rule 1: Horizontal First</h3>
                      <Text variant="body-md" color="on-surface-variant">
                        When horizontal and vertical lines cross, the horizontal line is almost always drawn first. This provides the
                        "shelf" upon which the vertical structure hangs.
                      </Text>
                    </Card>
                    <Card className="p-stack-md bg-surface-container-low rounded border border-outline-variant">
                      <h3 className="font-label-md text-label-md text-secondary mb-2 uppercase tracking-wider">
                        Rule 2: Center-Outward
                      </h3>
                      <Text variant="body-md" color="on-surface-variant">
                        In characters with a strong central axis (like 氷), draw the central stroke first to establish the anchor point for
                        the flanking elements.
                      </Text>
                    </Card>
                  </div>

                  <p className="font-body-lg text-body-lg leading-relaxed">
                    Consider the Kanji for "To Write" (書). Notice how the nine strokes are divided into two distinct components. Mastering
                    the stroke order ensures that the balance of the character remains centered on the page.
                  </p>

                  <blockquote className="border-l-4 border-secondary bg-secondary-fixed/20 p-stack-md italic font-body-md text-on-surface">
                    "Stroke order is the choreography of the hand. Once memorized, it allows the mind to focus on the expression of the
                    meaning rather than the construction of the form."
                  </blockquote>
                </section>

                {/* Lesson Navigation */}
                <footer className="flex items-center justify-between pt-section-gap border-t border-outline-variant">
                  <Button variant="secondary" className="flex items-center gap-2">
                    <span className="material-symbols-outlined">chevron_left</span>
                    Previous Lesson
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
