import { Header, Footer } from '../components';
import { HeroSection, WhyChooseUsSection } from '../components/sections';
import { Suspense, lazy } from 'react';
import { LazySection } from '../components/ui/LazySection';
import { NewsletterSkeleton, SectionSkeleton } from '../components/ui/Skeleton';

const FeaturedCoursesSection = lazy(() => import('../components/sections').then(m => ({ default: m.FeaturedCoursesSection })));
const TestimonialsSection = lazy(() => import('../components/sections').then(m => ({ default: m.TestimonialsSection })));
const NewsletterSection = lazy(() => import('../components/sections').then(m => ({ default: m.NewsletterSection })));

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />

        <LazySection fallback={<SectionSkeleton className="mb-12" />} className="mb-12">
          <Suspense fallback={<SectionSkeleton className="mb-12" />}>
            <FeaturedCoursesSection />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionSkeleton className="mb-12" />} className="mb-12">
          <Suspense fallback={<SectionSkeleton className="mb-12" />}>
            <TestimonialsSection />
          </Suspense>
        </LazySection>

        <LazySection fallback={<NewsletterSkeleton className="mb-12" />} className="mb-12">
          <Suspense fallback={<NewsletterSkeleton className="mb-12" />}>
            <NewsletterSection />
          </Suspense>
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
