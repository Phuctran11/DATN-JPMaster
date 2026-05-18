import type { LessonItem } from './types';

interface LessonSidebarProps {
  lessons: LessonItem[];
  onSelect: (lessonId: number) => void;
  onToggle: () => void;
  isOpen: boolean;
}

const lessonIconByStatus: Record<LessonItem['status'], string> = {
  completed: 'check_circle',
  current: 'play_circle',
  unlocked: 'play_arrow',
  locked: 'lock',
};

export function LessonSidebar({ lessons, onSelect, onToggle, isOpen }: LessonSidebarProps) {
  return (
    <aside className="h-full overflow-y-auto flex flex-col bg-surface-container-low border-r border-outline-variant">
      <div className={`flex min-h-14 items-center ${isOpen ? 'justify-between px-4' : 'justify-center px-2'} border-b border-outline-variant bg-surface-container flex-shrink-0`}>
        {isOpen && (
          <div className="min-w-0 flex-1">
            <h3 className="text-label-sm text-on-surface uppercase tracking-wider font-semibold truncate">
              Lesson contents
            </h3>
            <p className="text-label-sm text-on-surface-variant truncate">
              {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
            </p>
          </div>
        )}
        <button
          type="button"
          className={`inline-flex flex-shrink-0 h-9 w-9 items-center justify-center rounded-lg border border-outline-variant bg-surface text-on-surface shadow-sm transition-colors hover:border-primary hover:text-primary ${isOpen ? 'ml-3' : ''}`}
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className="material-symbols-outlined text-[20px]">{isOpen ? 'menu_open' : 'menu'}</span>
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        {lessons.map((lesson) => {
          const isCompleted = lesson.status === 'completed';
          const isCurrent = lesson.status === 'current';
          const isUnlocked = lesson.status === 'unlocked';
          const isLocked = lesson.status === 'locked';

          return (
            <button
              key={lesson.id}
              type="button"
              className={`flex flex-row gap-2 px-3 py-3 transition-colors hover:bg-surface-container border-b border-outline-variant/20 ${isOpen ? 'items-start justify-start text-left md:items-center' : 'items-center justify-center text-center md:justify-start md:items-center md:text-left'} ${
                isCurrent
                  ? 'text-primary font-bold bg-primary/5'
                  : isCompleted
                    ? 'text-on-surface-variant hover:bg-surface-container'
                    : isUnlocked
                      ? 'text-primary hover:bg-primary/5'
                      : isLocked
                        ? 'text-on-surface-variant opacity-50 cursor-not-allowed'
                        : 'text-on-surface-variant'
              }`}
              disabled={isLocked}
              onClick={() => !isLocked && onSelect(lesson.id)}
              title={lesson.title}
            >
              <span className="flex-shrink-0">
                <span
                  className={`material-symbols-outlined ${isCompleted ? 'text-green-600' : isUnlocked ? 'text-primary' : ''}`}
                  style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {lessonIconByStatus[lesson.status]}
                </span>
              </span>
              <span className={`text-label-sm font-label-sm truncate ${isOpen ? 'inline' : 'hidden'}`}>
                {lesson.title}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
