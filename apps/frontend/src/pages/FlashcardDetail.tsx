import { Header, Footer, Button, Card, Container, Icon, Breadcrumbs } from '../components';
import { Heading, Text } from '../components/ui/Typography';

function FlashcardControlPanel() {
  return (
    <div className="mt-stack-lg flex items-center gap-stack-md justify-center">
      <button className="p-4 rounded-full border-2 border-outline hover:bg-surface-container-high transition-colors text-on-surface-variant group">
        <Icon name="arrow_back_ios_new" />
      </button>
      <Button className="flex items-center gap-stack-sm">
        <Icon name="flip_camera_android" filled />
        Flip Card
      </Button>
      <button className="p-4 rounded-full border-2 border-outline hover:bg-surface-container-high transition-colors text-on-surface-variant group">
        <Icon name="arrow_forward_ios" />
      </button>
    </div>
  );
}

function InfoBentoCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <Card className="p-stack-md border border-outline-variant rounded-xl flex flex-col gap-2">
      <div className="flex items-center gap-2 text-primary">
        <Icon name={icon} size="md" />
        <Heading level="h3" size="headline-sm">
          {title}
        </Heading>
      </div>
      {children}
    </Card>
  );
}

export default function FlashcardDetail() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Flashcards', path: '/flashcards' },
    { label: 'Sample Collection' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2740%27 viewBox=%270 0 80 40%27%3E%3Cpath d=%27M0 40c4.5 0 9-2 12-5s7.5-3 12-3 9 2 12 5 7.5 3 12 3 9-2 12-5 7.5-3 12-3 9 2 12 5M0 20c4.5 0 9-2 12-5s7.5-3 12-3 9 2 12 5 7.5 3 12 3 9-2 12-5 7.5-3 12-3 9 2 12 5%27 fill=%27%23b6c4ff%27 fill-opacity=%270.08%27 fill-rule=%27evenodd%27/%3E%3C/svg%3E")' }}>
      <Header />
      <Breadcrumbs items={breadcrumbs} />
      <main className="flex-grow pt-24 pb-section-gap px-margin-mobile md:px-margin-desktop relative">
        {/* Floating Petals Decorative Elements */}
        <div className="fixed top-[15%] left-[10%] w-3 h-3 bg-pink-200 rounded-full opacity-60 rotate-45 pointer-events-none"></div>
        <div className="fixed top-[40%] right-[5%] w-3 h-3 bg-pink-200 rounded-full opacity-30 -rotate-12 pointer-events-none"></div>
        <div className="fixed bottom-[20%] left-[8%] w-3 h-3 bg-pink-200 rounded-full opacity-60 rotate-[160deg] pointer-events-none"></div>
        <div className="fixed top-[70%] right-[12%] w-3 h-3 bg-pink-200 rounded-full opacity-40 rotate-90 pointer-events-none"></div>

        <Container>
          <div className="flex flex-col items-center">
            {/* Progress Section */}
            <div className="w-full max-w-[600px] mb-stack-lg">
              <div className="flex justify-between items-end mb-2">
                <span className="font-headline-sm text-on-surface-variant">Card 5 of 20</span>
                <span className="font-label-md text-primary-container bg-primary-fixed px-3 py-1 rounded-full uppercase">
                  JLPT N2
                </span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/4 relative">
                  <div className="absolute right-0 top-0 h-full w-4 bg-secondary-container blur-sm opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Flashcard Review Interface */}
            <div className="relative w-full max-w-[800px] h-[500px] group mb-stack-lg">
              {/* Decorative Shadow Elements */}
              <div className="absolute -inset-2 bg-surface-container-high rounded-xl opacity-20 -rotate-1 blur-lg"></div>

              {/* The Flashcard Container */}
              <Card className="absolute inset-0 rounded-xl flex flex-col items-center justify-center p-stack-lg border border-outline-variant overflow-hidden z-10 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="relative">
                  <span className="text-[120px] font-headline-lg text-primary tracking-widest leading-none">絶景</span>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-on-surface-variant font-headline-sm opacity-60">
                    ぜっけい
                  </div>
                </div>

                <div className="mt-12 text-center max-w-[400px]">
                  <Text
                    variant="body-lg"
                    color="on-surface-variant"
                    className="italic opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Click to reveal details
                  </Text>
                </div>

                {/* Top Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-secondary transform rotate-45 translate-x-6 -translate-y-6"></div>
                </div>
              </Card>
            </div>

            {/* Review Controls */}
            <FlashcardControlPanel />

            {/* Auxiliary Information (Bento Grid Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full mt-section-gap">
              <InfoBentoCard icon="school" title="Context">
                <Text variant="body-md" color="on-surface-variant">
                  Commonly used in travel blogs and literature to describe scenery that takes one's breath away.
                </Text>
              </InfoBentoCard>

              <InfoBentoCard icon="history" title="Recent Performance">
                <div className="flex gap-1">
                  <div className="w-full h-2 bg-error rounded-full opacity-30"></div>
                  <div className="w-full h-2 bg-secondary-fixed rounded-full"></div>
                  <div className="w-full h-2 bg-secondary-fixed rounded-full"></div>
                </div>
                <Text variant="label-md" color="on-surface-variant">
                  You've mastered this card by 65%.
                </Text>
              </InfoBentoCard>

              <InfoBentoCard icon="lightbulb" title="Mnemonic">
                <Text variant="body-md" color="on-surface-variant" className="italic">
                  "A <strong>Super</strong> (Zetsu) <strong>View</strong> (Kei) from the mountain peak."
                </Text>
              </InfoBentoCard>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
