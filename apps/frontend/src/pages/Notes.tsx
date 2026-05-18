import { useEffect, useMemo, useState } from 'react';
import { Header, Footer, Container, Breadcrumbs } from '../components';
import { NoteCard } from '../components/notes';
import { lessonNoteAPI, type LessonNote, type LessonNoteType } from '../services/api';

const noteTypeOptions: Array<{ value: LessonNoteType | 'all'; label: string }> = [
  { value: 'all', label: 'All types' },
  { value: 'text_note', label: 'Text notes' },
  { value: 'video_note', label: 'Video notes' },
  { value: 'highlight', label: 'Highlights' },
  { value: 'question_note', label: 'Question notes' },
  { value: 'ai_summary', label: 'AI summaries' },
];

export default function Notes() {
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [noteType, setNoteType] = useState<LessonNoteType | 'all'>('all');
  const [pinned, setPinned] = useState<'all' | 'true' | 'false'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      note_type: noteType,
      pinned: pinned === 'all' ? 'all' as const : pinned === 'true',
      search,
      limit: 100,
    }),
    [noteType, pinned, search]
  );

  useEffect(() => {
    let active = true;

    const loadNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await lessonNoteAPI.getMyNotes(filters);
        if (active) setNotes(result.data);
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : 'Failed to load notes');
      } finally {
        if (active) setLoading(false);
      }
    };

    const timeoutId = window.setTimeout(loadNotes, 200);
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [filters]);

  const pinnedCount = notes.filter((note) => note.is_pinned).length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Notes' }]} />

      <main className="flex-1 bg-surface-container-low py-10 md:py-12">
        <Container>
          <section className="mb-6">
            <p className="text-label-md font-bold uppercase tracking-wide text-primary">Study notes</p>
            <h1 className="mt-2 text-headline-lg font-bold text-on-surface">Notes list</h1>
            <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
              Review lesson notes, video timestamps, highlighted text, and quiz question explanations.
            </p>
          </section>

          <section className="mb-6 rounded-xl border border-outline-variant bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_180px]">
              <label className="block">
                <span className="mb-1 block text-label-md font-bold text-on-surface">Search</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 outline-none focus:border-primary"
                  placeholder="Search note content or selected text"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-label-md font-bold text-on-surface">Type</span>
                <select
                  value={noteType}
                  onChange={(event) => setNoteType(event.target.value as LessonNoteType | 'all')}
                  className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 outline-none focus:border-primary"
                >
                  {noteTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-label-md font-bold text-on-surface">Pinned</span>
                <select
                  value={pinned}
                  onChange={(event) => setPinned(event.target.value as 'all' | 'true' | 'false')}
                  className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 outline-none focus:border-primary"
                >
                  <option value="all">All notes</option>
                  <option value="true">Pinned only</option>
                  <option value="false">Unpinned only</option>
                </select>
              </label>
            </div>
          </section>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-body-sm text-on-surface-variant">
            <span>{loading ? 'Loading notes...' : `${notes.length} notes found`}</span>
            <span>{pinnedCount} pinned</span>
          </div>

          {error && <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</p>}

          {!loading && notes.length === 0 ? (
            <section className="rounded-xl border border-dashed border-outline-variant bg-white p-8 text-center text-on-surface-variant">
              No notes match the current filters.
            </section>
          ) : (
            <div className="grid gap-4">
              {notes.map((note) => (
                <NoteCard
                  key={note.note_id}
                  note={note}
                  onChanged={(updatedNote) =>
                    setNotes((previous) => previous.map((item) => (item.note_id === updatedNote.note_id ? updatedNote : item)))
                  }
                  onDeleted={(noteId) => setNotes((previous) => previous.filter((item) => item.note_id !== noteId))}
                />
              ))}
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
