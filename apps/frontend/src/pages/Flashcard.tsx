import { useState } from 'react';
import { Header, Footer, Button, Card, Container, Section, Icon } from '../components';
import { Heading, Text } from '../components/ui/Typography';

interface CollectionCardProps {
  title: string;
  cardCount: number;
  onEdit?: () => void;
}

function CollectionCard({ title, cardCount, onEdit }: CollectionCardProps) {
  return (
    <Card className="p-stack-lg rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-stack-md">
        <Icon name="folder" size="md" />
        <span className="font-label-md text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full">
          {cardCount} Cards
        </span>
      </div>
      <Heading level="h3" size="headline-sm" className="mb-stack-sm">
        {title}
      </Heading>
      <div className="flex gap-stack-md mt-stack-lg">
        <button className="font-label-md text-label-md text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View <Icon name="arrow_forward" size="md" />
        </button>
        <button
          onClick={onEdit}
          className="font-label-md text-label-md text-on-surface-variant hover:text-secondary"
        >
          Edit
        </button>
      </div>
    </Card>
  );
}

interface FlashcardItemProps {
  kanji: string;
  romaji: string;
  meaning: string;
  example: string;
}

function FlashcardItem({ kanji, romaji, meaning, example }: FlashcardItemProps) {
  return (
    <Card className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex flex-col md:flex-row gap-stack-lg items-center shadow-sm hover:shadow-lg transition-all">
      <div className="w-full md:w-40 h-40 bg-primary-container rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2780%27 height=%2740%27 viewBox=%270 0 80 40%27%3E%3Cpath d=%27M0 40c4.5 0 9-2 12-5s7.5-3 12-3 9 2 12 5 7.5 3 12 3 9-2 12-5 7.5-3 12-3 9 2 12 5M0 20c4.5 0 9-2 12-5s7.5-3 12-3 9 2 12 5 7.5 3 12 3 9-2 12-5 7.5-3 12-3 9 2 12 5%27 fill=%27none%27 stroke=%27%23e5e7eb%27 stroke-width=%271%27/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }}></div>
        <span className="text-[48px] font-bold text-on-primary-container z-10">{kanji}</span>
        <div className="absolute bottom-1 right-1 opacity-20">
          <Icon name="filter_vintage" size="md" />
        </div>
      </div>
      <div className="flex-1 space-y-stack-sm text-center md:text-left">
        <div className="text-secondary font-label-md tracking-widest uppercase">{romaji}</div>
        <Heading level="h4" size="headline-md">
          {meaning}
        </Heading>
        <Text variant="body-md" color="on-surface-variant" className="italic">
          "{example}"
        </Text>
      </div>
      <div className="flex md:flex-col gap-stack-sm absolute top-4 right-4 md:static">
        <button className="p-2 rounded-lg hover:bg-surface-variant text-on-surface-variant transition-colors">
          <Icon name="edit" />
        </button>
        <button className="p-2 rounded-lg hover:bg-error-container text-error transition-colors">
          <Icon name="delete" />
        </button>
      </div>
    </Card>
  );
}

export default function Flashcard() {
  const [collectionTitle, setCollectionTitle] = useState('');

  const collections = [
    { title: 'JLPT N2 Vocabulary', cardCount: 420 },
    { title: 'Common Kanji Idioms', cardCount: 156 },
  ];

  const flashcards = [
    { kanji: '絶景', romaji: 'Zekkei', meaning: 'Superb view; picturesque scenery', example: 'This place has a zekkei like no other.' },
    { kanji: '雰囲気', romaji: "Fun'iki", meaning: 'Atmosphere; mood; aura', example: 'I like the fun\'iki of this café.' },
    { kanji: '謙虚', romaji: 'Kenkyo', meaning: 'Modesty; humility', example: 'He is very kenkyo about his skills.' },
    { kanji: '矛盾', romaji: 'Mujun', meaning: 'Contradiction; inconsistency', example: 'There is a mujun in your story.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Section bgColor="light">
          <Container>
            {/* Overview Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-section-gap gap-stack-lg">
              <div>
                <Heading level="h1" size="display-lg" className="mb-2">
                  My Flashcards
                </Heading>
                <Text variant="body-lg" color="on-surface-variant" className="max-w-xl">
                  Master your vocabulary through structured repetition and aesthetic focus.
                </Text>
              </div>
              <Card className="p-stack-lg rounded-xl flex flex-col items-center">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-1">
                  Total Mastery
                </span>
                <div className="font-display-lg text-display-lg text-primary leading-none">1,248</div>
                <span className="font-body-md text-body-md text-on-surface-variant">Cards Reviewed</span>
              </Card>
            </div>

            {/* Collections Grid */}
            <div className="mb-section-gap">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {collections.map((collection) => (
                  <CollectionCard key={collection.title} {...collection} />
                ))}
                {/* Create New Collection Trigger */}
                <div className="border-2 border-dashed border-outline-variant bg-transparent p-stack-lg rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors group">
                  <Icon name="add_circle" size="lg" />
                  <Heading level="h3" size="headline-sm" className="text-on-surface-variant">
                    New Collection
                  </Heading>
                </div>
              </div>
            </div>

            {/* Create New Collection Input */}
            <div className="mb-section-gap bg-surface-container-low p-stack-lg rounded-xl border border-secondary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rotate-12 -mr-8 -mt-8">
                <img
                  alt="Sakura pattern"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvKQU2FNbwJlXViWJBHHwDXzbBVLKEKjtWNfA2eF_2lsDNGKkbVuctr_hJStFChos7o6ULi7ysqOOwb5YrhvBOLdeiRdi-q9m5dAzt5sV0DcGHeG6pU9CxiQ-qM6ocgEdOVgI5ldMD3_jeyYu2r5iS26njDftkdafRwt6wFyokGXKkWiwxulsmdvq2NwRR3gy5ZOS83U5cMP9QM84OOUtWTpR2qkSWEARq-75S2cPLfg2xIB7GELxj65dqilPJszLQ96P328gYhZIK"
                />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-stack-lg items-end">
                <div className="flex-1 w-full">
                  <label className="font-label-md text-label-md text-on-surface-variant block mb-2">
                    Collection Title
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="e.g. Daily Phrases"
                    type="text"
                    value={collectionTitle}
                    onChange={(e) => setCollectionTitle(e.target.value)}
                  />
                </div>
                <Button className="flex items-center gap-2">
                  <Icon name="ink_pen" /> Create Collection
                </Button>
              </div>
            </div>

            {/* Flashcard Management */}
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-stack-lg gap-stack-md">
                <Heading level="h2" size="headline-lg">
                  JLPT N2 Vocabulary
                </Heading>
                <div className="flex items-center bg-surface-variant rounded-full px-4 py-2 w-full md:w-auto">
                  <Icon name="search" />
                  <input
                    className="bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/60 w-full ml-2"
                    placeholder="Search cards..."
                    type="text"
                  />
                  <button className="ml-2">
                    <Icon name="tune" />
                  </button>
                </div>
              </div>

              {/* Flashcards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg mb-stack-lg">
                {flashcards.map((card) => (
                  <FlashcardItem key={card.kanji} {...card} />
                ))}
              </div>

              {/* Primary Study Action */}
              <div className="flex justify-center">
                <Button className="flex items-center gap-stack-md shadow-lg group">
                  <Icon name="play_circle" size="lg" />
                  Review Now
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Newsletter Section */}
        <Section bgColor="primary">
          <Container className="flex flex-col md:flex-row justify-between items-center gap-stack-lg">
            <div className="max-w-xl text-center md:text-left">
              <Heading level="h2" size="headline-lg" className="text-on-primary mb-stack-sm">
                Sign Up for Updates
              </Heading>
              <Text variant="body-lg" color="white">
                Join our scholarly community and receive weekly curated Japanese linguistic insights.
              </Text>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <input
                className="px-6 py-3 rounded-lg border-none focus:ring-2 focus:ring-secondary outline-none w-full sm:w-80 font-body-md"
                placeholder="Your email address"
                type="email"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
