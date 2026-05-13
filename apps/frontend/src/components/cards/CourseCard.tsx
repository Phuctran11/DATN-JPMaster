import { Card, ImageCard, ProgressBar, StatusBadge } from '../ui';
import { Heading, Text } from '../ui/Typography';
import { Button } from '../Button';
import { Icon } from '../ui';

interface MyLearningCardProps {
  title: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
  description: string;
  image: string;
}

export function MyLearningCard({ title, progress, status, description, image }: MyLearningCardProps) {
  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="relative mb-stack-md group">
        <ImageCard src={image} alt={title} hoverScale={105} rounded="md" />
        <div className="absolute top-2 right-2 z-10">
          <StatusBadge status={status} />
        </div>
      </div>
      <Heading level="h3" size="headline-sm" className="mb-2">
        {title}
      </Heading>
      <Text variant="body-md" color="on-surface-variant" className="mb-stack-lg line-clamp-2">
        {description}
      </Text>
      <div className="mt-auto">
        <ProgressBar value={progress} showLabel variant="default" />
        <Button className="w-full mt-6">Continue</Button>
      </div>
    </Card>
  );
}

interface CourseGridCardProps {
  title: string;
  price: string;
  image: string;
  level: string;
}

export function CourseGridCard({ title, price, image, level }: CourseGridCardProps) {
  return (
    <Card className="flex flex-col group">
      <div className="mb-6">
        <ImageCard
          src={image}
          alt={title}
          badge={{ label: level, variant: 'glass' }}
          overlay={{ gradient: true }}
          aspectRatio="square"
          hoverScale={110}
          rounded="lg"
        />
      </div>
      <Heading level="h4" size="headline-sm" className="mb-2">
        {title}
      </Heading>
      <Text variant="body-md" color="on-surface-variant" className="mb-6 line-clamp-2">
        Learn the natural way people actually speak in Japan and beyond.
      </Text>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-headline-sm text-primary">${price}</span>
        <button className="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary-container transition-colors">
          <Icon name="arrow_forward" />
        </button>
      </div>
    </Card>
  );
}

interface FeaturedCourseCardProps {
  title?: string;
  description?: string;
  price?: string;
}

export function FeaturedCourseCard({
  title = 'Master Japanese Fluency Bundle',
  description = 'Our most comprehensive path. Covers N5 to N1 with personal coaching and certification.',
  price = '299.00',
}: FeaturedCourseCardProps) {
  return (
    <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl bg-primary text-on-primary">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Icon name="verified_user" size="lg" />
      </div>
      <div className="relative p-10 flex flex-col h-full z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <span className="bg-secondary text-on-secondary-container px-4 py-1.5 rounded-full text-label-md font-bold mb-4 inline-block">
              TOP RECOMMENDATION
            </span>
            <Heading level="h3" size="display-lg" className="text-white mb-4">
              {title}
            </Heading>
            <Text variant="body-lg" color="white" className="max-w-md opacity-80">
              {description}
            </Text>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-label-md opacity-70 block">Starting at</span>
            <span className="text-headline-lg font-bold text-secondary-fixed">${price}</span>
          </div>
          <Button variant="secondary">View Bundle Details</Button>
        </div>
      </div>
    </div>
  );
}
