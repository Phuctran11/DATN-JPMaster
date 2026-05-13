import { useState } from 'react';
import { Header, Footer, Container, Card } from '../components';
import { Text } from '../components/ui/Typography';
import { TestCard, TestimonialCard } from '../components/cards';

export default function TestList() {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All Sections');

  const levels = ['All', 'N1', 'N2', 'N3', 'N4', 'N5'];
  const sections = ['All Sections', 'Vocabulary (文字・語彙)', 'Reading (読解)', 'Listening (聴解)'];

  const tests = [
    {
      title: 'Advanced Kanji Mastery: Business Context',
      level: 'JLPT N2',
      levelColor: 'bg-primary',
      type: 'Vocabulary',
      duration: '45 Min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdqarhq_SWopESG-jCNkzTUPkNb24J-4yxPf4ifNDmwMeMRj1ES3GnPTgRcyRdtl19quTj-viYsdumOCqALtcziy1AsuE-WR6_hAoeYz8iFX_gXEkpk-2vYoQ1jmrEs_shJy7iHvjQdSTowhzky1QEY76AXP8H1KQFd12e-op8F2rafCsQAMLPaOWl6_uVc3pFem1EwsxQ_ICXGma9mqPLsSplvyf4nKpGCisJ2VvhkW4Z5EECIVS4NAvLrtVMIg_WO3yJcSMCv_XL',
    },
    {
      title: 'Everyday Conversation & Greetings',
      level: 'JLPT N5',
      levelColor: 'bg-secondary',
      type: 'Listening',
      duration: '25 Min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi1FIqNajdgtknBfyHudR09doEeVDWiqXmfpWzLFzQm2oiZyqt4DR5i5l-lMDNGo5xvSa0j_PTM7T_9_80gfc8Jqj-LvLfDRSBXXrbOM2EXrw_y6AVW0xFiQ_1LnIHC99WmSdqbRx-z9LNF_xn0nxgSiCTAam59GjQvZHBrr4n0zQ9spTCv1DMSgua9fLY4VCCaOe3PKDRbmHm-IAwjrVBZylPI62ByfqxaTMab-UlMYLbE-g_f8CUHtTVtH1MCVPRDFChSwYd2nCs',
    },
    {
      title: 'Short Form Essay Analysis',
      level: 'JLPT N3',
      levelColor: 'bg-primary',
      type: 'Reading',
      duration: '60 Min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZfBxwqTC-Xwj5wTLIt4ztZKDCW36AWRdJCqSto9lWsLFTAGLFaj9gxLl_8P7QSA19Oi6_wmHtg7ARCe7JJklJha13Z7Hy1gU15d4bm_hQIAdwzMfjKyyXi7GSrykUFjr21So_94Zh2r_F-jHMpbFMEzmJ7Yp2iZFnJgUq9owc7Tft1lSodwsLyZGaslEx9ILqzk7fx8dpbqg7gXfj6VI5IBxHCkaOCt8Xx0bpYm8GWchzxnzB1q4HeBOaB3l3u7MyDRMSQE3BU9zr',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Passed N2 in 12 months',
      quote: 'The structured approach at JPMaster is unlike any other app. It feels like a real university course but fits perfectly into my digital lifestyle.',
      initials: 'SC',
    },
    {
      name: 'Marcus Knight',
      role: 'Business Professional',
      quote: 'The Keigo course changed how I communicate with our Tokyo office. The prestige and attention to detail in the teaching is world-class.',
      initials: 'MK',
    },
    {
      name: 'Aki Liu',
      role: 'University Student',
      quote: 'Visual learners will love the 3D frames and Enso-inspired designs. It makes the discipline of kanji study feel much more engaging.',
      initials: 'AL',
    },
  ];

  const guidelines = [
    {
      number: '1',
      title: 'Time Management',
      description: 'Each test has a strictly enforced timer. Once started, the timer cannot be paused. Practice managing your time per question.',
    },
    {
      number: '2',
      title: 'Standard Scoring',
      description:
        'We use the official JLPT weighted scoring system. You need to pass both the overall score and individual section minimums.',
    },
    {
      number: '3',
      title: 'Academic Integrity',
      description:
        'To get the best results, do not use external dictionaries or translation tools during the duration of the test.',
    },
  ];

  const scoringTable = [
    { level: 'N1 (Expert)', passmark: '100 / 180', maxpoints: '180' },
    { level: 'N2 (Business)', passmark: '90 / 180', maxpoints: '180' },
    { level: 'N3 (Daily)', passmark: '95 / 180', maxpoints: '180' },
    { level: 'N4/N5 (Basic)', passmark: '90 / 180', maxpoints: '180' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="seigaiha-pattern py-section-gap border-b border-outline-variant">
          <div className="max-w-[1280px] mx-auto px-margin-desktop">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-label-md rounded mb-stack-sm">
                ACADEMIC EXCELLENCE
              </span>
              <h1 className="font-display-lg text-display-lg text-primary mb-stack-md">JLPT Tests</h1>
              <Text variant="body-lg" color="on-surface-variant" className="leading-relaxed">
                Select a level and section to practice your Japanese skills. Our tests are modeled after official examination standards
                to ensure your success in the Japanese Language Proficiency Test.
              </Text>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-surface-container-low border-b border-outline-variant sticky top-16 z-40">
          <div className="max-w-[1280px] mx-auto px-margin-desktop py-stack-md flex flex-col md:flex-row justify-between items-center gap-stack-md">
            <div className="flex flex-wrap gap-stack-sm items-center">
              <span className="text-label-md text-on-surface-variant mr-stack-sm">JLPT Levels:</span>
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-1.5 rounded-full text-label-md transition-colors ${
                    selectedLevel === level
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface text-on-surface border border-outline-variant hover:border-primary'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="h-8 w-px bg-outline-variant hidden md:block"></div>
            <div className="flex flex-wrap gap-stack-sm items-center">
              <span className="text-label-md text-on-surface-variant mr-stack-sm">Section:</span>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="bg-surface border border-outline-variant text-label-md rounded-lg px-4 py-1.5 focus:border-primary focus:ring-0"
              >
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Test List Grid */}
        <section className="py-section-gap max-w-[1280px] mx-auto px-margin-desktop">
          <div className="flex items-center justify-between mb-section-gap">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Available Tests</h2>
              <div className="w-16 h-1 bg-secondary mt-2"></div>
            </div>
            <span className="text-label-md text-on-surface-variant">Showing 24 Practice Exams</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {tests.map((test) => (
              <TestCard key={test.title} {...test} />
            ))}
          </div>

          <div className="mt-section-gap flex justify-center">
            <button className="px-8 py-3 border-2 border-primary text-primary font-bold text-label-md rounded hover:bg-primary hover:text-white transition-all">
              Load More Tests
            </button>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="bg-surface-container py-section-gap overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
            <div className="relative">
              <h2 className="font-display-lg text-headline-lg text-primary mb-stack-lg">Test Taking Protocol</h2>
              <Text variant="body-lg" color="on-surface-variant" className="mb-stack-lg">
                Follow these guidelines to ensure your practice results accurately reflect your proficiency level.
              </Text>
              <div className="space-y-stack-md">
                {guidelines.map((guideline) => (
                  <div key={guideline.number} className="flex items-start gap-stack-md">
                    <span className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
                      {guideline.number}
                    </span>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{guideline.title}</h4>
                      <Text variant="body-md" color="on-surface-variant">
                        {guideline.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring Table */}
            <Card className="bg-white p-stack-lg border border-outline-variant shadow-sm relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <span className="text-[120px] font-bold text-primary">試験</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-stack-md text-primary">Scoring Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant">
                      <th className="py-3 font-bold text-label-md">Level</th>
                      <th className="py-3 font-bold text-label-md">Pass Mark</th>
                      <th className="py-3 font-bold text-label-md">Max Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoringTable.map((row) => (
                      <tr key={row.level} className="border-b border-outline-variant/30">
                        <td className="py-3 text-body-md">{row.level}</td>
                        <td className="py-3 text-body-md">{row.passmark}</td>
                        <td className="py-3 text-body-md">{row.maxpoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-stack-lg p-stack-md bg-secondary-container/10 border-l-4 border-secondary rounded">
                <p className="text-label-md text-on-secondary-container">
                  Note: Section passing marks (19/60) also apply for all levels.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-section-gap">
          <Container>
            <h2 className="font-headline-lg text-headline-lg text-center mb-stack-lg">Student Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.name} {...testimonial} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
