import { Header, Footer } from '../components';
import {
  HeroSection,
  WhyChooseUsSection,
  FeaturedCoursesSection,
  TestimonialsSection,
  NewsletterSection,
} from '../components/sections';

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        <FeaturedCoursesSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
