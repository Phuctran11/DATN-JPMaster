import { useEffect, useState } from 'react';
import { lessonNoteAPI, type LessonNote, type LessonNoteType } from '../../services/api';

interface NoteComposerProps {
  lessonId?: number | null;
  noteType: LessonNoteType;
  questionId?: number | null;
  selectedText?: string | null;
  videoTimestampSeconds?: number | null;
  existingNote?: LessonNote | null;
  title?: string;
  placeholder?: string;
  compact?: boolean;
  onSaved?: (note: LessonNote) => void;
  onCreated?: () => void;
  onCancel?: () => void;
}

const typeLabels: Record<LessonNoteType, string> = {
  text_note: 'Text note',
  video_note: 'Video note',
  highlight: 'Highlight note',
  question_note: 'Question note',
  ai_summary: 'AI summary',
};

const formatTimestamp = (seconds?: number | null) => {
  if (seconds == null) return null;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, '0')}`;
};

export function NoteComposer({
  lessonId,
  noteType,
  questionId,
  selectedText,
  videoTimestampSeconds,
  existingNote,
  title,
  placeholder = 'Write your note...',
  compact = false,
  onSaved,
  onCreated,
  onCancel,
}: NoteComposerProps) {
  const [content, setContent] = useState(existingNote?.note_content ?? '');
  const [isPinned, setIsPinned] = useState(Boolean(existingNote?.is_pinned));
  const [timestampSeconds, setTimestampSeconds] = useState<number | null>(
    videoTimestampSeconds ?? existingNote?.video_timestamp_seconds ?? null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timestampLabel = formatTimestamp(timestampSeconds);
  const selectedTextValue = selectedText ?? existingNote?.selected_text;

  useEffect(() => {
    setContent(existingNote?.note_content ?? '');
    setIsPinned(Boolean(existingNote?.is_pinned));
    setTimestampSeconds(videoTimestampSeconds ?? existingNote?.video_timestamp_seconds ?? null);
  }, [existingNote?.note_id, existingNote?.note_content, existingNote?.is_pinned, existingNote?.video_timestamp_seconds, videoTimestampSeconds]);

  const handleSubmit = async () => {
    if (!content.trim() || saving) return;

    try {
      setSaving(true);
      setError(null);
      const result = existingNote
        ? await lessonNoteAPI.updateNote(existingNote.note_id, {
            note_content: content.trim(),
            selected_text: selectedTextValue?.trim() || null,
            video_timestamp_seconds: timestampSeconds,
            is_pinned: isPinned,
          })
        : await lessonNoteAPI.createNote({
            lesson_id: lessonId ?? null,
            question_id: questionId ?? null,
            note_type: noteType,
            note_content: content.trim(),
            selected_text: selectedTextValue?.trim() || null,
            video_timestamp_seconds: timestampSeconds,
            is_pinned: isPinned,
          });
      if (!existingNote) {
        setContent('');
        setIsPinned(false);
      }
      onSaved?.(result.data);
      onCreated?.();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={compact ? 'space-y-3' : 'rounded-xl border border-outline-variant bg-white p-5 shadow-sm'}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-label-md font-bold uppercase tracking-wide text-primary">{typeLabels[noteType]}</p>
          {title && <h3 className="mt-1 text-title-lg font-bold text-on-surface">{title}</h3>}
          {timestampLabel && <p className="mt-1 text-body-sm text-on-surface-variant">Timestamp {timestampLabel}</p>}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-label-md text-on-surface-variant">
          <input
            type="checkbox"
            checked={isPinned}
            onChange={(event) => setIsPinned(event.target.checked)}
            className="h-4 w-4"
          />
          Pin
        </label>
      </div>

      {selectedTextValue && (
        <blockquote className="rounded-lg border-l-4 border-primary bg-primary-fixed/40 px-4 py-3 text-body-md text-on-primary-fixed">
          {selectedTextValue}
        </blockquote>
      )}

      {noteType === 'video_note' && (
        <label className="block">
          <span className="mb-1 block text-label-md font-bold text-on-surface">Timestamp seconds</span>
          <input
            type="number"
            min={0}
            value={timestampSeconds ?? 0}
            onChange={(event) => setTimestampSeconds(Math.max(0, Number(event.target.value) || 0))}
            className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>
      )}

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={compact ? 3 : 4}
        className="w-full resize-y rounded-lg border border-outline-variant bg-white px-4 py-3 text-body-md text-on-surface outline-none focus:border-primary"
        placeholder={placeholder}
      />

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-body-sm text-red-700">{error}</p>}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-outline-variant bg-white px-4 py-2 font-bold text-on-surface"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim() || saving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-bold text-on-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">add_notes</span>
          {saving ? 'Saving...' : existingNote ? 'Update note' : 'Save note'}
        </button>
      </div>
    </section>
  );
}
