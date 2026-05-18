import { useState, type RefObject } from 'react';
import type { Lesson as LessonData } from '../../services/api';
import { Heading, Text } from '../ui/Typography';

interface LessonContentProps {
  lesson: LessonData;
  isStudyMode: boolean;
  onToggleStudyMode: () => void;
  articleRef: RefObject<HTMLElement | null>;
  onAddHighlightNote?: (selectedText: string) => void;
}

type LessonContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'ordered-list' | 'unordered-list'; items: string[] };

const normalizeLessonContent = (value?: string | null) => {
  return (value ?? '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n?/g, '\n')
    .trim();
};

const parseLessonContent = (content: string): LessonContentBlock[] => {
  const blocks: LessonContentBlock[] = [];
  const lines = content.split('\n');
  let paragraphLines: string[] = [];
  let listType: 'ordered-list' | 'unordered-list' | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    const text = paragraphLines.join('\n').trim();
    if (text) blocks.push({ type: 'paragraph', text });
    paragraphLines = [];
  };

  const flushList = () => {
    if (listType && listItems.length > 0) {
      blocks.push({ type: listType, items: listItems });
    }
    listType = null;
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const orderedMatch = trimmedLine.match(/^\d+[.)]\s+(.+)$/);
    const unorderedMatch = trimmedLine.match(/^[-*•]\s+(.+)$/);

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    if (orderedMatch) {
      flushParagraph();
      if (listType !== 'ordered-list') {
        flushList();
        listType = 'ordered-list';
      }
      listItems.push(orderedMatch[1].trim());
      return;
    }

    if (unorderedMatch) {
      flushParagraph();
      if (listType !== 'unordered-list') {
        flushList();
        listType = 'unordered-list';
      }
      listItems.push(unorderedMatch[1].trim());
      return;
    }

    flushList();
    paragraphLines.push(line);
  });

  flushParagraph();
  flushList();

  return blocks;
};

export function LessonContent({ lesson, isStudyMode, onToggleStudyMode, articleRef, onAddHighlightNote }: LessonContentProps) {
  const contentText = normalizeLessonContent(lesson.content_text);
  const contentBlocks = contentText ? parseLessonContent(contentText) : [];
  const [selectionMenu, setSelectionMenu] = useState<{ text: string; x: number; y: number } | null>(null);

  const handleTextAction = (action: 'translate' | 'note' | 'flashcard' | 'grammar') => {
    const selectedText = selectionMenu?.text || window.getSelection()?.toString().trim();
    if (!selectedText) return;

    if (action === 'note') {
      onAddHighlightNote?.(selectedText);
      window.getSelection()?.removeAllRanges();
      setSelectionMenu(null);
      return;
    }

    window.alert(`${selectedText}\n\n${action === 'translate' ? 'Dictionary lookup is not connected yet.' : action === 'flashcard' ? 'Flashcard save flow is not connected yet.' : 'Grammar explain is not connected yet.'}`);
    setSelectionMenu(null);
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (!selection || !selectedText || selection.rangeCount === 0) {
      setSelectionMenu(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const container = articleRef.current;
    if (!container || !container.contains(range.commonAncestorContainer)) {
      setSelectionMenu(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    setSelectionMenu({
      text: selectedText,
      x: rect.left + rect.width / 2,
      y: Math.max(12, rect.top - 12),
    });
  };

  return (
    <article
      ref={articleRef}
      onMouseUp={handleSelection}
      onKeyUp={handleSelection}
      className={`overflow-hidden rounded-xl border bg-surface-container-lowest shadow-sm transition-all duration-300 ${
        isStudyMode ? 'border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20' : 'border-outline-variant'
      }`}
    >
      <header className="border-b border-outline-variant bg-surface px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-label-md font-label-md uppercase text-secondary">Focus lesson</p>
            <Heading level="h2" size="headline-md" className="text-on-surface">
              {lesson.title}
            </Heading>
            <Text variant="body-md" color="on-surface-variant" className="mt-2 max-w-[680px]">
              {lesson.content_type === 'video'
                ? 'Watch the lesson first, then use the notes below to lock in the main ideas.'
                : 'Read carefully through the lesson notes and mark the lesson complete when you are ready.'}
            </Text>
          </div>
          <button
            type="button"
            onClick={onToggleStudyMode}
            aria-pressed={isStudyMode}
            className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${
              isStudyMode
                ? 'border-primary bg-primary text-on-primary'
                : 'border-outline-variant bg-surface-container-low text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{isStudyMode ? 'visibility_off' : 'visibility'}</span>
            <span className="text-label-md font-label-md">{isStudyMode ? 'Exit study mode' : 'Study mode'}</span>
          </button>
        </div>
      </header>

      <section className="px-5 py-6 sm:px-7 sm:py-8">
        <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
            <span className="material-symbols-outlined text-[22px]">article</span>
          </span>
          <div>
            <h3 className="text-headline-sm font-headline-sm text-on-surface">Lesson Content</h3>
            <p className="text-body-md font-body-md text-on-surface-variant">Read at your own pace.</p>
          </div>
        </div>

        <div className="space-y-5 text-on-surface">
          {contentBlocks.length > 0 ? (
            contentBlocks.map((block, index) => {
              if (block.type === 'ordered-list') {
                return (
                  <ol key={index} className="list-decimal space-y-2 pl-6 text-body-lg font-body-lg leading-8 text-on-surface">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }

              if (block.type === 'unordered-list') {
                return (
                  <ul key={index} className="list-disc space-y-2 pl-6 text-body-lg font-body-lg leading-8 text-on-surface">
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="whitespace-pre-line text-body-lg font-body-lg leading-8 text-on-surface">
                    {block.text}
                  </p>
                );
              }

              return null;
            })
          ) : (
            <div className="rounded-lg border border-dashed border-outline-variant bg-surface-container-low px-4 py-5 text-on-surface-variant">
              This lesson does not have text content yet.
            </div>
          )}
        </div>

        {selectionMenu && (
          <div
            className="fixed z-[95] flex -translate-x-1/2 -translate-y-full flex-wrap gap-2 rounded-xl border border-outline-variant bg-white p-2 shadow-xl"
            style={{ left: selectionMenu.x, top: selectionMenu.y }}
          >
            <button type="button" onClick={() => handleTextAction('translate')} className="rounded-lg px-3 py-2 text-label-md font-bold text-on-surface-variant hover:bg-surface-container">
              Translate
            </button>
            <button type="button" onClick={() => handleTextAction('note')} className="rounded-lg bg-primary px-3 py-2 text-label-md font-bold text-on-primary">
              Add Note
            </button>
            <button type="button" onClick={() => handleTextAction('flashcard')} className="rounded-lg px-3 py-2 text-label-md font-bold text-on-surface-variant hover:bg-surface-container">
              Save Flashcard
            </button>
            <button type="button" onClick={() => handleTextAction('grammar')} className="rounded-lg px-3 py-2 text-label-md font-bold text-on-surface-variant hover:bg-surface-container">
              Grammar Explain
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
