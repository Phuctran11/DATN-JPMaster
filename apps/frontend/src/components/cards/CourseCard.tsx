import { Card, ImageCard, ProgressBar } from '../ui';
import { Heading, Text } from '../ui/Typography';
import { Icon } from '../ui';
import type { KeyboardEvent, MouseEvent } from 'react';

function CourseTypeBadge({ isFree = false }: { isFree?: boolean }) {
  const badgeTheme = isFree
    ? 'border-emerald-200 bg-emerald-600 text-white'
    : 'border-sky-200 bg-slate-950 text-white';
  const dotTheme = isFree ? 'bg-lime-200' : 'bg-sky-200';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] shadow-xl backdrop-blur-sm transition-transform duration-200 hover:scale-105 ${badgeTheme}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${dotTheme}`}></span>
      <span className="font-black">{isFree ? 'Free' : 'Paid'}</span>
    </span>
  );
}

function triggerEnroll(
  event: MouseEvent<HTMLButtonElement>,
  courseId: number | undefined,
  onEnroll?: (courseId: number) => void,
) {
  event.stopPropagation();
  if (typeof courseId === 'number') onEnroll?.(courseId);
}

interface MyLearningCardProps {
  courseId: number;
  title: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
  image: string;
  onClick?: (courseId: number) => void;
  onGetStarted?: (courseId: number) => void;
}

export function MyLearningCard({ courseId, title, progress, status, image, onClick, onGetStarted }: MyLearningCardProps) {
  const handleClick = () => {
    onClick?.(courseId);
  };

  const handleGetStarted = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onGetStarted?.(courseId);
  };

  return (
    <Card
      className="w-full p-4 md:p-5 flex flex-row items-center gap-4 md:gap-5 h-full cursor-pointer transition-transform hover:-translate-y-1"
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if (!onClick) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 group overflow-hidden rounded-lg">
        <ImageCard src={image} alt={title} hoverScale={105} rounded="md" />
      </div>
      <div className="min-w-0 flex-1">
        <Heading level="h3" size="headline-sm" className="truncate mb-3">
          {title}
        </Heading>
        <div className="w-full max-w-2xl">
          <ProgressBar value={progress} showLabel variant="default" />
        </div>
      </div>
      <div className="shrink-0 flex items-center">
        {status === 'In Progress' ? (
          <button
            type="button"
            onClick={handleGetStarted}
            className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary"
          >
            Get Started
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="whitespace-nowrap rounded-full bg-surface-container px-4 py-2 text-label-md font-semibold text-on-surface-variant"
          >
            {status === 'Completed' ? 'Completed' : 'Not Started'}
          </button>
        )}
      </div>
    </Card>
  );
}

interface CourseGridCardProps {
  title: string;
  price: string;
  image: string;
  description: string;
  isFree?: boolean;
  courseId?: number;
  onEnroll?: (courseId: number) => void;
}

export function CourseGridCard({ title, description, price, image, isFree, courseId, onEnroll }: CourseGridCardProps) {
  return (
    <Card className="flex flex-col group relative overflow-hidden border-2 border-outline-variant hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 bg-surface-container-high">
      <div className="relative overflow-hidden">
        <ImageCard
          src={image}
          alt={title}
          overlay={{ gradient: true }}
          aspectRatio="square"
          hoverScale={110}
          rounded="xl"
          className="w-full"
        />
        <div className="absolute top-4 left-4">
          <CourseTypeBadge isFree={isFree} />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <Heading level="h4" size="headline-sm" className="mb-3 line-clamp-2 text-on-surface">
          {title}
        </Heading>
        <Text variant="body-md" color="on-surface-variant" className="mb-5 line-clamp-2 flex-grow">
          {description}
        </Text>
        <div className="flex items-end justify-between pt-4 border-t border-outline-variant/30 gap-3">
          <span className="font-headline-sm text-primary text-title-lg font-bold">{price}₫</span>
          <button
            type="button"
            onClick={(event) => triggerEnroll(event, courseId, onEnroll)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-label-md font-black uppercase tracking-wider text-on-primary shadow-md transition-all duration-200 hover:bg-primary-container hover:text-on-primary hover:shadow-lg"
          >
            Enroll
          </button>
        </div>
      </div>
    </Card>
  );
}

interface FeaturedCourseCardProps {
  title: string;
  description: string;
  price: string;
  isFree?: boolean;
  image: string;
  courseId: number;
  onEnroll?: (courseId: number) => void;
  lessonCount?: number;
}

export function FeaturedCourseCard({
  title,
  description,
  price,
  isFree = false,
  image,
  courseId,
  onEnroll,
  lessonCount,
}: FeaturedCourseCardProps) {
  return (
    <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-container text-on-primary shadow-2xl border-3 border-secondary hover:border-secondary-fixed transition-all duration-300 hover:shadow-3xl">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Icon name="verified_user" size="lg" />
      </div>
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary/15 rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>
      <div className="absolute -left-12 -bottom-12 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>
      <div className="relative flex flex-col lg:flex-row h-full z-10">
        <div className="lg:w-1/2 relative group/img min-h-[320px] lg:min-h-full overflow-hidden">
          <ImageCard
            src={image}
            alt={title}
            overlay={{ color: 'absolute inset-0 bg-gradient-to-r from-[#00164e]/40 to-transparent' }}
            hoverScale={105}
            aspectRatio="auto"
            rounded="2xl"
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="px-4 py-2 rounded-full text-label-sm font-black inline-flex items-center gap-2 uppercase tracking-widest shadow-lg hover:shadow-xl transition-all transform group-hover:scale-105 border-2 border-amber-300/50 bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                  <span className="font-black">Top Recommendation</span>
                </span>
                <CourseTypeBadge isFree={isFree} />
              </div>
              <Heading level="h3" size="display-lg" className="text-white mb-4 sm:mb-5 font-bold leading-tight text-2xl sm:text-3xl lg:text-4xl">
                {title}
              </Heading>
              <Text variant="body-lg" color="white" className="max-w-md opacity-95 leading-relaxed text-base sm:text-lg">
                {description}
              </Text>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-4">
            <div>
              <span className="text-label-md opacity-85 block font-medium">Starting at</span>
              <span className="text-display-md font-bold text-secondary-fixed">{price}₫</span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={(event) => triggerEnroll(event, courseId, onEnroll)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-5 py-3 text-label-md font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white hover:text-primary"
              >
                Enroll
              </button>
            </div>
          </div>
          {typeof lessonCount !== 'undefined' && (
            <div className="mt-4 text-secondary-fixed">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="font-bold">{lessonCount} Lessons</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
