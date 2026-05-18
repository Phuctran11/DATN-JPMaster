import type { RefObject } from 'react';
import { Button } from '../Button';
import { Container } from '../ui';
import { Heading } from '../ui/Typography';
import type { Lesson as LessonData } from '../../services/api';
import { formatLessonDuration } from './lessonUtils';

interface LessonHeaderSectionProps {
  lesson: LessonData;
  isSidebarOpen: boolean;
  progressPercent: number;
  currentLessonNumber: number;
  totalLessons: number;
  sectionRef: RefObject<HTMLElement | null>;
  onBackToCourse: () => void;
  onToggleSidebar: () => void;
}

export function LessonHeaderSection({
  lesson,
  isSidebarOpen,
  progressPercent,
  currentLessonNumber,
  totalLessons,
  sectionRef,
  onBackToCourse,
  onToggleSidebar,
}: LessonHeaderSectionProps) {
  return (
    <section ref={sectionRef} className={`bg-surface py-stack-lg border-b border-outline-variant transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : 'md:ml-16'}`}>
      <Container>
        <div className="mb-stack-md md:hidden">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-high text-on-surface shadow-sm transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-xl">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
          </button>
        </div>
        <div className="flex flex-col gap-stack-md md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-unit">
            <Button
              variant="secondary"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container-high px-4 py-2 text-on-surface shadow-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary sm:w-fit"
              onClick={onBackToCourse}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Course
            </Button>
            <Heading level="h1" size="headline-lg" className="text-on-surface">
              {lesson.title}
            </Heading>
            <div className="flex items-center gap-stack-md text-on-surface-variant">
              <span className="flex items-center gap-1 font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                {formatLessonDuration(lesson.duration)}
              </span>
              <span className="flex items-center gap-1 font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                {lesson.content_type}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col">
            <div className="w-48 bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="text-right font-label-md text-label-md mt-2 text-on-surface-variant">
              Lesson {currentLessonNumber} of {totalLessons || 1}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
