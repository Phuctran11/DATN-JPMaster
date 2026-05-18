import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../components';
import { QuizPanel } from '../components/lesson';
import { enrollmentAPI, quizAPI, type Quiz, type QuizAttemptSummary, type QuizSubmitResult } from '../services/api';

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const getAudioContextConstructor = () => {
  const audioWindow = window as Window & typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

  return audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
};

export default function QuizFocus() {
  const navigate = useNavigate();
  const { id: courseId, lessonId } = useParams<{ id: string; lessonId?: string }>();
  const isFinalTest = !lessonId;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttemptSummary | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [submitSignal, setSubmitSignal] = useState(0);
  const [submittedResult, setSubmittedResult] = useState<QuizSubmitResult | null>(null);
  const [readyToStart, setReadyToStart] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeUpChimePlayedRef = useRef(false);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const AudioContextConstructor = getAudioContextConstructor();
    if (!AudioContextConstructor) return null;

    audioContextRef.current ??= new AudioContextConstructor();
    return audioContextRef.current;
  }, []);

  const unlockAudio = useCallback(() => {
    const audioContext = getAudioContext();
    if (!audioContext || audioContext.state !== 'suspended') return;

    audioContext.resume().catch(() => {
      // Browsers can reject audio until the next user gesture.
    });
  }, [getAudioContext]);

  const playTimeUpChime = useCallback(() => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    const play = () => {
      const startTime = audioContext.currentTime;
      const notes = [880, 1174.66, 1567.98];

      notes.forEach((frequency, index) => {
        const noteStart = startTime + index * 0.18;
        const noteEnd = noteStart + 0.14;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, noteStart);
        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.12, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(noteStart);
        oscillator.stop(noteEnd + 0.02);
      });
    };

    if (audioContext.state === 'suspended') {
      audioContext.resume().then(play).catch(() => {
        // Keep timeout submission reliable even if sound is blocked.
      });
      return;
    }

    play();
  }, [getAudioContext]);

  const durationSeconds = useMemo(() => {
    return Math.max(1, quiz?.time_limit_minutes ?? 30) * 60;
  }, [quiz?.time_limit_minutes]);

  useEffect(() => {
    if (!courseId) return;
    if (isFinalTest && !readyToStart) return;

    let active = true;
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        const [courseResult, quizResult] = await Promise.all([
          enrollmentAPI.getEnrolledCourseDetail(parseInt(courseId)),
          isFinalTest
            ? quizAPI.getFinalQuiz(parseInt(courseId))
            : lessonId
              ? quizAPI.getLessonQuiz(parseInt(lessonId))
              : Promise.resolve({ data: null }),
        ]);

        if (!active) return;
        setCourseTitle(courseResult.data.title);

        if (!quizResult.data) {
          setQuiz(null);
          setError(isFinalTest ? 'Final test is not available for this course.' : 'Quiz is not available for this lesson.');
          return;
        }

        setQuiz(quizResult.data);
        setRemainingSeconds(Math.max(1, quizResult.data.time_limit_minutes ?? 30) * 60);
        const attemptResult = await quizAPI.startQuiz(quizResult.data.quiz_id);
        if (!active) return;
        setAttempt(attemptResult.data);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load quiz');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchQuiz();

    return () => {
      active = false;
    };
  }, [courseId, isFinalTest, lessonId, readyToStart]);

  useEffect(() => {
    if (loading || !quiz || submittedResult) return;

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          window.clearInterval(intervalId);
          setTimedOut(true);
          if (!timeUpChimePlayedRef.current) {
            timeUpChimePlayedRef.current = true;
            playTimeUpChime();
          }
          setSubmitSignal((value) => value + 1);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [loading, playTimeUpChime, quiz, submittedResult]);

  useEffect(() => {
    const handleFirstInteraction = () => unlockAudio();

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [unlockAudio]);

  useEffect(() => {
    if (submittedResult) return;

    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const blockBack = () => {
      window.history.pushState(null, '', window.location.href);
      window.alert('Please submit the quiz before leaving focus mode.');
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('beforeunload', beforeUnload);
    window.addEventListener('popstate', blockBack);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      window.removeEventListener('popstate', blockBack);
    };
  }, [submittedResult]);

  const handleSubmitted = useCallback((result: QuizSubmitResult) => {
    setSubmittedResult(result);
  }, []);

  const handleRetake = () => {
    setAttempt(null);
    setSubmittedResult(null);
    setRemainingSeconds(durationSeconds);
    setSubmitSignal(0);
    setTimedOut(false);
    timeUpChimePlayedRef.current = false;
    if (!quiz) return;
    quizAPI.startQuiz(quiz.quiz_id).then((result) => setAttempt(result.data)).catch((startError) => {
      setError(startError instanceof Error ? startError.message : 'Failed to start quiz');
    });
  };

  const handleExit = () => {
    if (!courseId) {
      navigate('/courses');
      return;
    }

    if (isFinalTest) {
      const finalRequirementSatisfied = Boolean(quiz?.has_passed || submittedResult?.passed);
      navigate(finalRequirementSatisfied ? `/courses/${courseId}/certificate` : `/courses/${courseId}`);
      return;
    }

    navigate(lessonId ? `/courses/${courseId}/lessons/${lessonId}` : `/courses/${courseId}`);
  };

  if (isFinalTest && !readyToStart) {
    return (
      <main className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-container-low p-6">
        <section className="w-full max-w-xl rounded-xl border border-outline-variant bg-white p-6 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-fixed text-on-primary-fixed">
            <span className="material-symbols-outlined text-[30px]">assignment</span>
          </div>
          <h1 className="text-headline-md font-bold text-on-surface">Ready to start the final test?</h1>
          <p className="mt-3 text-body-md text-on-surface-variant">
            Once you start, focus mode will be locked and the timer will begin. You must submit the test before leaving.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                unlockAudio();
                setReadyToStart(true);
              }}
              className="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary"
            >
              Start final test
            </button>
            <button
              type="button"
              onClick={() => navigate(courseId ? `/courses/${courseId}` : '/courses')}
              className="rounded-lg border border-outline-variant bg-white px-5 py-3 font-bold text-on-surface"
            >
              Back to course
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-container-low">
        <p className="text-on-surface-variant">Preparing focus mode...</p>
      </main>
    );
  }

  if (error || !quiz) {
    return (
      <main className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-container-low p-6">
        <section className="max-w-xl rounded-xl border border-outline-variant bg-white p-6 text-center shadow-lg">
          <h1 className="text-headline-md font-bold text-on-surface">Quiz unavailable</h1>
          <p className="mt-2 text-on-surface-variant">{error || 'Quiz not found.'}</p>
          <button type="button" onClick={handleExit} className="mt-5 rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">
            Back
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 z-[70] overflow-y-auto bg-surface-container-low">
      <div className="sticky top-0 z-10 border-b border-outline-variant bg-white/95 backdrop-blur">
        <Container>
          <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-label-md font-bold uppercase tracking-wide text-primary">
                {isFinalTest ? 'Final test focus mode' : 'Lesson quiz focus mode'}
              </p>
              <h1 className="mt-1 text-headline-sm font-bold text-on-surface">{quiz.title}</h1>
              <p className="mt-1 text-body-sm text-on-surface-variant">{courseTitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className={`rounded-xl border px-4 py-3 font-bold ${remainingSeconds <= 60 ? 'border-red-300 bg-red-50 text-red-700' : 'border-primary/20 bg-primary-fixed text-on-primary-fixed'}`}>
                <span className="mr-2 align-middle material-symbols-outlined text-[20px]">timer</span>
                {formatTime(remainingSeconds)}
              </div>
              {submittedResult && (
                <button type="button" onClick={handleExit} className="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">
                  {isFinalTest && (submittedResult.passed || quiz.has_passed) ? 'View certificate' : 'Exit focus mode'}
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-6 md:py-8">
        <div className="mx-auto max-w-4xl space-y-5">
          {!submittedResult && (
            <section className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
              Focus mode is locked. Submit this {isFinalTest ? 'final test' : 'quiz'} to exit.
            </section>
          )}

          {!submittedResult && timedOut && (
            <section className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5">timer_off</span>
                <div>
                  <h2 className="text-title-md font-bold">Time is up</h2>
                  <p className="mt-1 text-body-md">
                    Your current answers are being submitted automatically. Please wait for the result.
                  </p>
                </div>
              </div>
            </section>
          )}

          {submittedResult && (
            <section className={`rounded-xl border p-5 ${submittedResult.passed ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-red-300 bg-red-50 text-red-800'}`}>
              <h2 className="text-headline-sm font-bold">
                {submittedResult.passed ? 'Passed' : 'Not passed'} · {submittedResult.score.toFixed(2)}%
              </h2>
              <p className="mt-1 text-body-md">
                {timedOut ? 'Time is up. Your current answers were submitted automatically. ' : ''}
                Passing score: {submittedResult.passing_score}%. {submittedResult.passed
                  ? 'You can continue.'
                  : quiz.has_passed
                    ? 'This retake did not pass, but your previous passed attempt still satisfies the requirement.'
                    : 'Review your answers and retake when ready.'}
              </p>
              {!submittedResult.passed && (
                <button type="button" onClick={handleRetake} className="mt-4 rounded-lg bg-primary px-5 py-3 font-bold text-on-primary">
                  Retake
                </button>
              )}
            </section>
          )}

          <QuizPanel
            key={attempt?.attempt_id ?? quiz.quiz_id}
            quiz={quiz}
            attemptId={attempt?.attempt_id}
            titlePrefix={isFinalTest ? 'Final test' : 'Lesson quiz'}
            lockedMessage={isFinalTest ? 'Pass this test to complete the course and unlock certification.' : 'Pass this quiz before marking the lesson complete.'}
            allowIncompleteSubmit
            submitSignal={submitSignal}
            onSubmitted={handleSubmitted}
            onRetake={handleRetake}
            lessonId={lessonId ? parseInt(lessonId) : quiz.lesson_id ?? undefined}
          />
        </div>
      </Container>
    </main>
  );
}
