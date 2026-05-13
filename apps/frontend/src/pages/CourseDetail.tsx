import { Header, Footer, Button, Card, Container } from '../components';
import { Heading, Text } from '../components/ui/Typography';

interface CourseModule {
  id: number;
  title: string;
  videos: number;
  duration: string;
}

function ModuleItem({ module }: { module: CourseModule }) {
  return (
    <div className="group bg-white p-stack-lg border border-outline-variant hover:border-primary transition-colors flex justify-between items-center">
      <div className="flex gap-stack-lg">
        <span className="font-headline-md text-outline-variant group-hover:text-primary transition-colors">{String(module.id).padStart(2, '0')}</span>
        <div>
          <h3 className="font-headline-sm text-on-surface mb-1">{module.title}</h3>
          <div className="flex items-center gap-4 text-label-md text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              {module.videos} Videos
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">timer</span>
              {module.duration} Hours
            </span>
          </div>
        </div>
      </div>
      <button className="bg-surface-container hover:bg-primary-container hover:text-white px-4 py-2 font-label-md transition-all">
        View Details
      </button>
    </div>
  );
}

interface ReviewCard {
  author: string;
  role: string;
  review: string;
  initials: string;
  bgColor: string;
}

function ReviewItem({ review }: { review: ReviewCard }) {
  return (
    <Card className="bg-white p-8 border border-outline-variant relative">
      <div className="absolute -top-4 -left-4 text-primary opacity-10">
        <span className="material-symbols-outlined text-6xl">format_quote</span>
      </div>
      <div className="flex text-secondary mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
        ))}
      </div>
      <p className="text-on-surface italic font-body-md mb-6 leading-relaxed">"{review.review}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${review.bgColor} rounded-full flex items-center justify-center font-bold`}>
          {review.initials}
        </div>
        <div>
          <p className="text-label-md font-bold">{review.author}</p>
          <p className="text-[12px] text-on-surface-variant">{review.role}</p>
        </div>
      </div>
    </Card>
  );
}

export default function CourseDetail() {
  const modules: CourseModule[] = [
    { id: 1, title: 'Introduction to Radical Families', videos: 12, duration: '8.5' },
    { id: 2, title: 'Complex Stroke Order Mastery', videos: 18, duration: '15' },
    { id: 3, title: 'Contextual N1 Compounds', videos: 22, duration: '21.5' },
  ];

  const reviews: ReviewCard[] = [
    {
      author: 'Aiko K.',
      role: 'Graduated N1 2023',
      review: "Incredible depth! I've used many apps before, but the academic rigor here is unmatched. Dr. Tanaka's explanations of radicals transformed my memorization process.",
      initials: 'AK',
      bgColor: 'bg-primary-fixed',
    },
    {
      author: 'Marcus S.',
      role: 'Language Researcher',
      review:
        "The focus on stroke order and calligraphy flow made my writing look professional. It's not just about passing a test; it's about cultural mastery.",
      initials: 'MS',
      bgColor: 'bg-tertiary-fixed',
    },
    {
      author: 'Elena L.',
      role: 'Foreign Correspondent',
      review: 'JPMaster bridges the gap between learning and living the language. The legal compound module was exactly what I needed for my work in Tokyo.',
      initials: 'EL',
      bgColor: 'bg-secondary-fixed',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <header className="relative overflow-hidden pt-20 pb-32 bg-gradient-to-br from-primary-fixed to-primary/10">
          <div className="absolute top-10 left-10 text-primary opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]">filter_vintage</span>
          </div>
          <div className="absolute bottom-10 right-20 text-primary opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">filter_vintage</span>
          </div>

          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10">
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-stack-md">
                  <span className="bg-primary-container text-white px-3 py-1 rounded-full text-[12px] font-bold tracking-widest uppercase">
                    JLPT N1 Level
                  </span>
                  <span className="text-primary font-semibold text-label-md">• Premium Academic Track</span>
                </div>
                <h1 className="font-display-lg text-display-lg text-primary mb-stack-md leading-tight">
                  Mastering Advanced Kanji: The Path to N1 Literacy
                </h1>
                <Text variant="body-lg" color="on-surface-variant" className="mb-stack-lg max-w-xl">
                  A rigorous academic exploration of high-level Japanese calligraphy, complex radicals, and the nuanced contextual usage
                  required for absolute fluency.
                </Text>
                <div className="flex flex-wrap items-center gap-stack-lg mb-stack-lg">
                  <div className="flex items-center gap-2">
                    <img
                      alt="Dr. Hiroshi Tanaka"
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqAeJ-I82MtlSEYzmUpqaLBCTC0mlpHa1nzC_JKZtw3xElGy9-23faHqhhiwhxGPNMHJcxLX-a7WFrKIiJoIOsJqoUq46BNcpbO70HGOaLSX4r1szXBWZMuzF2RLcYbTKbFKbLWUC93cw2Z083RR_4Oo8ZiOa_WeA7eGrinPyeTxA8sM7mAjYKS9Ul79I9w3WbzSY9MTxXVkmkD21POBLdL4COYkOEDlgpgKdCiXatOpcXhJ0GQqTVsKiebpUZ9swp7Wjuwn8W0EV6"
                    />
                    <div>
                      <p className="text-label-md font-bold text-on-surface">Dr. Hiroshi Tanaka</p>
                      <p className="text-[12px] text-on-surface-variant">Lead Instructor, Kyoto Linguistics</p>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-outline-variant"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <span className="text-body-md font-semibold">45 hours study time</span>
                  </div>
                  <div className="h-10 w-px bg-outline-variant"></div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span className="text-body-md font-semibold">Certificate included</span>
                  </div>
                </div>
                <div className="flex items-center gap-stack-md">
                  <Button className="px-8 py-4">Enroll Now</Button>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant line-through">$299.00</span>
                    <span className="text-headline-md font-bold text-primary">$199.00</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 hidden md:block">
                <Card className="p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    alt="Japanese Calligraphy"
                    className="rounded-lg w-full aspect-[4/5] object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJY0AbvRaC0k7nbkawUYxNr8RNWg-kX-VrJlyThC5DYEA46C8d_HwkCYydMVb0ZrL8Q0dv84-TPj9WZw5XGccGMdijSIUzxirMwB8YKXqu7LWePfmbWU0YTzss3JP7vDyh0oR384FhfxGNhn2oCjziCi9QNhU_Fig1XnPFxOSmDdHh545DrJZgcTIzLtm-5rn7A6lhgA5c2_eQg-1-ri4w8fIm7kSSn9f-37dJPiHo9h1vFaxC6p-a4kT8MWWCeKwhoZrs_t5DCVuD"
                  />
                </Card>
              </div>
            </div>
          </Container>
        </header>

        {/* Content Section */}
        <section className="py-section-gap">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-4">
                <div className="sticky top-32">
                  <Heading level="h2" size="headline-lg" className="text-primary mb-stack-md">
                    Course Content
                  </Heading>
                  <Text variant="body-md" color="on-surface-variant" className="mb-stack-lg leading-relaxed">
                    This curriculum is designed for students who have surpassed intermediate levels and are preparing for the JLPT N1 or
                    academic research. We focus on mastering complex radicals and contextual usage.
                  </Text>
                  <Card className="p-6 bg-secondary-fixed/20 border border-secondary-fixed-dim">
                    <h4 className="font-bold text-on-surface mb-2">What you'll master:</h4>
                    <ul className="space-y-2 text-on-surface-variant font-label-md">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span>
                        800+ N1 Level Kanji
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span>
                        Radical classification systems
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span>
                        Legal and Scientific Compounds
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span>
                        Stroke order precision
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
              <div className="md:col-span-8 space-y-stack-md">
                {modules.map((module) => (
                  <ModuleItem key={module.id} module={module} />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Reviews Section */}
        <section className="bg-surface-container-low py-section-gap border-y border-outline-variant">
          <Container>
            <div className="flex justify-between items-end mb-section-gap">
              <div>
                <Heading level="h2" size="headline-lg" className="text-primary">
                  Student Reviews
                </Heading>
                <Text variant="body-md" color="on-surface-variant" className="mt-2">
                  Hear from those who reached N1 literacy with us.
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <span className="font-bold text-headline-sm">4.9/5.0</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {reviews.map((review) => (
                <ReviewItem key={review.author} review={review} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-section-gap text-center bg-primary text-on-primary">
          <Container>
            <Heading level="h2" size="display-lg" className="text-on-primary mb-stack-md">
              Ready to Achieve Kanji Mastery?
            </Heading>
            <Text variant="body-lg" color="white" className="mb-stack-lg opacity-90">
              Join 5,000+ advanced students in the most comprehensive N1 program available online.
            </Text>
            <Button variant="secondary" className="px-12 py-5">
              Enroll in Course Today
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
