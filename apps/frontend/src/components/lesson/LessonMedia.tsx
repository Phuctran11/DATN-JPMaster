import { useRef } from 'react';
import { Card } from '../ui';
import type { Lesson as LessonData } from '../../services/api';
import { getYouTubeEmbedUrl } from './lessonUtils';

interface LessonMediaProps {
  lesson: LessonData;
  onAddVideoNote?: (timestampSeconds: number | null) => void;
}

export function LessonMedia({ lesson, onAddVideoNote }: LessonMediaProps) {
  const embedUrl = getYouTubeEmbedUrl(lesson.video_url);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!lesson.video_url) {
    return null;
  }

  return (
    <Card className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-low px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">smart_display</span>
          <p className="truncate text-label-md font-label-md text-on-surface">Lesson media</p>
        </div>
        <span className="rounded-lg bg-surface px-2.5 py-1 text-label-sm text-on-surface-variant">
          {lesson.content_type}
        </span>
      </div>
      <div className="relative w-full aspect-video bg-inverse-surface overflow-hidden">
        {embedUrl ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full"
            controls
            playsInline
            src={lesson.video_url}
          />
        )}
      </div>
      {onAddVideoNote && (
        <div className="border-t border-outline-variant bg-white px-4 py-3">
          <button
            type="button"
            onClick={() => onAddVideoNote(videoRef.current ? Math.floor(videoRef.current.currentTime) : null)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-on-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add_notes</span>
            Add video note
          </button>
          {embedUrl && (
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Embedded video timestamps cannot be read directly. Add the note and edit the timestamp later if needed.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
