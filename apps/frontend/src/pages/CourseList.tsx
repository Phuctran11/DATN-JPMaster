import { useState } from 'react';
import { Header, Footer, Button, Select, Card, Container, Section } from '../components';
import { Heading, Text } from '../components/ui/Typography';
import { MyLearningCard, FeaturedCourseCard, CourseGridCard } from '../components/cards';


function CourseFilterBar() {
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [sort, setSort] = useState('popular');

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-gutter bg-surface-container-low px-8 py-6 rounded-xl mb-stack-lg border border-outline-variant">
      <div className="flex flex-wrap gap-4 items-center">
        <span className="text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Filter By:</span>
        <Select
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'language', label: 'Language' },
            { value: 'culture', label: 'Culture' },
            { value: 'business', label: 'Business' },
            { value: 'jlpt', label: 'Preparation (JLPT)' },
          ]}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Select
          options={[
            { value: 'all', label: 'All Levels' },
            { value: 'beginner', label: 'Beginner (N5-N4)' },
            { value: 'intermediate', label: 'Intermediate (N3-N2)' },
            { value: 'advanced', label: 'Advanced (N1)' },
          ]}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-label-md text-on-surface-variant font-bold uppercase tracking-wider">Sort:</span>
        <Select
          options={[
            { value: 'popular', label: 'Most Popular' },
            { value: 'newest', label: 'Newest First' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
          ]}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function CourseList() {
  const myLearning = [
    {
      title: 'JLPT N4: Kanji Mastery',
      progress: 65,
      status: 'In Progress' as const,
      description: 'Master the 300 kanji required for the N4 proficiency test through spaced repetition.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiO1vqqGFWw0dyo_jr3AboX0c6iWB7_57sMfFUe2nQ9WNjwvsqvcDd9gYHlI9S-Hb8r98f33pR1IQV8a4zznQgO3YGm-eRfitqiFSZAtVuAxeqfoOy2wgBKc57Dd-6TuDaIH0ZGsD1B_VkFHKCvwdzfVRiFf5Fwb0msIIFqQid_O8ES7pxe2qF9xj8uqWDBJ4HAy_Sj-QuD8BOyCPSnCvBf4V69HsFkTBhY6yoHGgHCltxyPFFuhl_oXvg-VsG9393xXsz8cVRvPpj',
    },
    {
      title: 'Keigo for Business',
      progress: 28,
      status: 'In Progress' as const,
      description: 'Navigate professional environments with confidence using advanced honorific speech.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5j9g5KJNIUIJpu_Mpm54N3GwZAhkw4SRjrSJ3jOSzq4u4jr4PLLERdWGCryFLyDRmOWKpYloiyKcXqbn9wVWfq_Cbz7aPhkG3y2XT20xUSu7_TBRUPEsbcPnpGa-_8snOpkiERDUYQQlgGZQoREWT3FEdFm_L0MDU0H-ba2PpH1w4LscJZNHdsskqe-hLkxOEAnrB_2w-FXjrguffW7v_UkzzaHWbnb7LBBQ8cPwjV_snrR9Bkkyq36ZlDVSPQ3wG_JUuJLX9UQSL',
    },
    {
      title: 'Elementary Hiragana',
      progress: 100,
      status: 'Completed' as const,
      description: 'The essential foundation for your Japanese journey. Master all 46 characters.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3TzOvbQwFFGXz9V9Xv8A19qLD6PEZl6DhW3qbdaYVQr_uYRpjLkWw4vfO1c8R_dC7PrNafvIRmIaTOvH_8oEO878By1kcVgZeMABy6evdzemzbZaScKEaFPEf41_s2yBNpqaUUZmRPBO08dkxSvjx8lDeJUube9j9kYh4Q9I4MNRs50yPEAsy-IjsU2KEeD6ys9i0iqGfydIsTlJZio6OlUvRrM-eX65yzkRGnRWG-5CjfQzvToufm0VHOoVdYX7s7mI37KWTllVA',
    },
  ];

  const otherCourses = [
    { title: 'Street Japanese & Slang', price: '45', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKwCykUcv-5s44rymZl9e-af0MoeXvG3HnQ1dhhm7ep7J1E5UVyNe1MYnqlL0pVptVLcJ-_UCYZ7WRxbhBCS1Ux9cVDIY7xOKwj807XEG1DRyourLUK6sYCAXPzrx1NNqcucmRrzfWhItZBLYbH5iUTw8JMtWAlrBLyS776bdnI9UX2WEfd9pOtqueckrsoaCFTOpKS6mtLDpvV86i3H2DcT3uV5fZQtg3y9DlrA7n1Kwlfmpp751ldAIzqw1OlZVhxEgdullEbm8y', level: 'N3' },
    { title: 'Intro to Onomatopoeia', price: '39', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALROO3Z8H3451zP-DeKWIcN38pcN52aU9l6LoexVa_x6fF031JfLE6FQjS2Y6slVs-pKoQCrLLf_q1gyqvV8Uf6Jt8WmkNYYnGkkwhsIpfN2P97sRYYMDlB-RYzD6H73TFfE0NNqaog4BVsZtqv7fnsADiWngFCruAsOTeb_AtFoCpnsK8nzfPwdwaoSudy1t2MV4CTKXO72_2v7_SwqwcphEM43_uX525DvrxOQ-nvJixYA7n7wx1-uXRca9sLorI1GdokTPhONbo', level: 'N5' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Section bgColor="light">
          <Container>
            {/* My Learning Section */}
            <div className="mb-section-gap">
              <div className="flex items-center justify-between mb-stack-lg">
                <Heading level="h2" size="headline-lg" className="flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-secondary-fixed rounded-full"></span>
                  My Learning
                </Heading>
                <a href="#" className="text-label-md text-primary font-semibold hover:underline">
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {myLearning.map((course) => (
                  <MyLearningCard key={course.title} {...course} />
                ))}
              </div>
            </div>

            {/* Filter & Sort Bar */}
            <CourseFilterBar />

            {/* Other Courses Section */}
            <div className="mb-section-gap">
              <Heading level="h2" size="headline-lg" className="mb-stack-lg flex items-center gap-3">
                <span className="w-1.5 h-8 bg-secondary-fixed rounded-full"></span>
                Other Courses
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <FeaturedCourseCard
                  title="Master Japanese Fluency Bundle"
                  description="Our most comprehensive path. Covers N5 to N1 with personal coaching and certification."
                  price="299.00"
                />
                {otherCourses.map((course) => (
                  <CourseGridCard key={course.title} {...course} />
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mb-section-gap">
              <Heading level="h2" size="headline-lg" className="mb-stack-lg text-center">
                Student Feedback
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {[
                  { name: 'Sarah Chen', role: 'Passed N2 in 12 months', quote: 'The structured approach at JPMaster is unlike any other app. It feels like a real university course but fits perfectly into my digital lifestyle.' },
                  { name: 'Marcus Knight', role: 'Business Professional', quote: 'The Keigo course changed how I communicate with our Tokyo office. The prestige and attention to detail in the teaching is world-class.' },
                  { name: 'Aki Liu', role: 'University Student', quote: 'Visual learners will love the 3D frames and Enso-inspired designs. It makes the discipline of kanji study feel much more engaging.' },
                ].map((testimonial) => (
                  <Card key={testimonial.name} className="p-8 border-l-4 border-secondary">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{testimonial.name}</p>
                        <p className="text-[12px] text-outline">{testimonial.role}</p>
                      </div>
                    </div>
                    <Text variant="body-md" color="on-surface-variant" className="italic">
                      "{testimonial.quote}"
                    </Text>
                  </Card>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <Card className="bg-surface-container p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed-dim/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10 max-w-2xl mx-auto text-center">
                <Heading level="h2" size="display-lg" className="mb-4">
                  Sign Up for Updates
                </Heading>
                <Text variant="body-lg" color="on-surface-variant" className="mb-8">
                  Receive exclusive cultural insights, study tips, and early access to new courses delivered to your inbox.
                </Text>
                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    className="flex-grow bg-surface border border-outline-variant rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter your email address"
                    type="email"
                  />
                  <Button>Subscribe</Button>
                </form>
                <p className="text-[12px] text-outline mt-6">
                  By subscribing, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
            </Card>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
