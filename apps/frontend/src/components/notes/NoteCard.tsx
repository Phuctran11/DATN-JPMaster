import { Link } from 'react-router-dom';
import { lessonNoteAPI, type LessonNote } from '../../services/api';

interface NoteCardProps {
  note: LessonNote;
  onChanged?: (note: LessonNote) => void;
  onDeleted?: (noteId: number) => void;
}

const noteTypeLabels: Record<LessonNote['note_type'], string> = {
  text_note: 'Text note',
  video_note: 'Video note',
  highlight: 'Highlight',
  question_note: 'Question note',
  ai_summary: 'AI summary',
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const formatTimestamp = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
};

export function NoteCard({ note, onChanged, onDeleted }: NoteCardProps) {
  const lessonHref = note.course_id && note.lesson_id ? `/courses/${note.course_id}/lessons/${note.lesson_id}` : undefined;

  const handlePin = async () => {
    const result = await lessonNoteAPI.setPinned(note.note_id, !note.is_pinned);
    onChanged?.({ ...note, ...result.data });
  };

  const handleDelete = async () => {
    await lessonNoteAPI.deleteNote(note.note_id);
    onDeleted?.(note.note_id);
  };

  return (
    <article className="rounded-xl border border-outline-variant bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-fixed px-3 py-1 text-label-sm font-bold text-on-primary-fixed">
              {noteTypeLabels[note.note_type]}
            </span>
            {note.video_timestamp_seconds != null && (
              <span className="rounded-full bg-surface-container px-3 py-1 text-label-sm text-on-surface-variant">
                {formatTimestamp(note.video_timestamp_seconds)}
              </span>
            )}
          </div>
          <p className="mt-2 text-body-sm text-on-surface-variant">Created {formatDateTime(note.created_at)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handlePin}
            aria-pressed={note.is_pinned}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
              note.is_pinned
                ? 'border-primary bg-primary text-on-primary'
                : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
            title={note.is_pinned ? 'Unpin note' : 'Pin note'}
          >
            <span className="material-symbols-outlined text-[20px]">{note.is_pinned ? 'check_circle' : 'radio_button_unchecked'}</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-white text-on-surface-variant hover:border-red-300 hover:text-red-700"
            title="Delete note"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>

      {note.selected_text && (
        <blockquote className="mt-4 rounded-lg border-l-4 border-primary bg-primary-fixed/40 px-4 py-3 text-body-md text-on-primary-fixed">
          {note.selected_text}
        </blockquote>
      )}

      {note.question_text && (
        <p className="mt-4 rounded-lg bg-surface-container-low px-4 py-3 text-body-sm text-on-surface-variant">
          Question: {note.question_text}
        </p>
      )}

      <p className="mt-4 whitespace-pre-line text-body-md leading-7 text-on-surface">{note.note_content}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-outline-variant pt-4 text-body-sm text-on-surface-variant">
        {lessonHref ? (
          <Link to={lessonHref} className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
            <span className="material-symbols-outlined text-[18px]">school</span>
            {note.lesson_title || `Lesson ${note.lesson_id}`}
          </Link>
        ) : note.lesson_id ? (
          <span>Lesson {note.lesson_id}</span>
        ) : (
          <span>Final test question</span>
        )}
        {note.course_title && <span>{note.course_title}</span>}
      </div>
    </article>
  );
}
