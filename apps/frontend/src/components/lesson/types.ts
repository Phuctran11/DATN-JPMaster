export interface LessonItem {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'unlocked' | 'locked';
}
