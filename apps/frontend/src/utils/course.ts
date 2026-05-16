import type { Course } from '../services/api';

export const getCourseLessonCount = (course?: Pick<Course, 'lessons'> | null): number => {
  return course?.lessons?.length ?? 0;
};
