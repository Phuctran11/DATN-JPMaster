const API_BASE_URL = 'http://localhost:5000/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  level?: string;
}

interface GoogleLoginRequest {
  token: string;
}

interface AuthResponse {
  message: string;
  data: {
    user_id: number;
    username: string;
    email: string;
    role: string;
  };
  token?: string;
}

// Helper to get authorization header
const getAuthHeader = (): { Authorization?: string } => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper to make authenticated requests
const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'learner',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    return response.json();
  },

  async googleLogin(tokenData: GoogleLoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokenData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Google login failed');
    }

    return response.json();
  },
};

// Course API endpoints
export interface Course {
  course_id: number;
  title: string;
  description: string | null;
  price: number;
  level?: string | null;
  is_free?: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  lesson_id: number;
  course_id: number;
  title: string;
  content_type: 'video' | 'text' | 'flashcard' | 'quiz';
  content_text: string | null;
  video_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
  is_completed?: boolean;
}

export interface CourseRating {
  rating_id: number;
  user_id: number;
  username?: string;
  rating: number;
  review: string | null;
  created_at: string;
}

/**
 * Enrolled course with enrollment details
 * Returned by getMyCourses endpoint
 */
export interface EnrolledCourse {
  enrollment_id: number;
  user_id: number;
  course_id: number;
  enrollment_date: string;
  status: 'active' | 'completed' | 'dropped';
  course: Course;
  progress_percent?: number;
  completed_lessons?: number;
  total_lessons?: number;
}

export interface Course {
  course_id: number;
  title: string;
  description: string | null;
  price: number;
  level?: string | null;
  is_free?: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
  ratings?: CourseRating[];
  average_rating?: number;
  rating_count?: number;
  enroll_count?: number;
}

export interface Purchase {
  purchase_id: number;
  user_id: number;
  course_id: number;
  purchase_date: string;
  price_paid: number;
  voucher_id?: number;
  status: 'pending' | 'completed' | 'canceled';
  purchase_type: 'standard' | 'voucher';
}

export const courseAPI = {
  async getAllCourses(limit = 10, offset = 0, withLessons = false): Promise<{ data: Course[]; count: number }> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      ...(withLessons && { withLessons: 'true' }),
    });

    const response = await fetch(`${API_BASE_URL}/courses?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch courses');
    }

    return response.json();
  },

  async getPopularCourses(limit = 4): Promise<{ data: Course[]; count: number }> {
    const params = new URLSearchParams({ limit: String(limit) });
    const response = await fetch(`${API_BASE_URL}/courses/popular?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch popular courses');
    }

    return response.json();
  },

  async getCourseById(courseId: number): Promise<{ data: Course }> {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch course');
    }

    return response.json();
  },
};

export const purchaseAPI = {
  async getPurchase(purchaseId: number): Promise<{ data: Purchase }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/purchases/${purchaseId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch purchase');
    }

    return response.json();
  },
};

/**
 * Enrollment API endpoints
 * Handles course enrollment, access tracking, and enrollment status
 */
export const enrollmentAPI = {
  /**
   * Get all user's enrolled courses (all statuses)
   */
  async getMyCourses(limit = 10, offset = 0): Promise<{ data: EnrolledCourse[]; count: number }> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/my-courses?${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch your courses');
    }

    return response.json();
  },

  /**
   * Get enrolled courses by status
   * Status: 'active' | 'completed' | 'dropped'
   */
  async getMyCoursesByStatus(
    status: 'active' | 'completed' | 'dropped',
    limit = 10,
    offset = 0
  ): Promise<{ data: EnrolledCourse[]; count: number; status: string }> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/my-courses/${status}?${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch your courses');
    }

    return response.json();
  },

  /**
   * Enroll user in a course
   * Creates both CourseEnrollment (access) and Purchase (payment) records
   */
  async enrollCourse(courseId: number, pricePaid = 0): Promise<{ message: string; data: { enrollment: any; purchase: Purchase } }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/enroll`, {
      method: 'POST',
      body: JSON.stringify({
        course_id: courseId,
        price_paid: pricePaid,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to enroll in course');
    }

    return response.json();
  },

  /**
   * Get enrolled course detail with lessons and ratings
   */
  async getEnrolledCourseDetail(courseId: number): Promise<{ data: Course & { enrollment_status: string; enrollment_date: string } }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/course/${courseId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch course detail');
    }

    return response.json();
  },

  /**
   * Update enrollment status
   */
  async updateEnrollmentStatus(
    enrollmentId: number,
    status: 'active' | 'completed' | 'dropped'
  ): Promise<{ message: string; data: any }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/${enrollmentId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to update enrollment');
    }

    return response.json();
  },

  /**
   * Drop course / delete enrollment
   */
  async dropCourse(enrollmentId: number): Promise<{ message: string }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/${enrollmentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to drop course');
    }

    return response.json();
  },

  /**
   * Get next unfinished lesson for enrolled course
   */
  async getNextLesson(courseId: number): Promise<{ data: Lesson }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/enrollments/course/${courseId}/next-lesson`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch next lesson');
    }

    return response.json();
  },
};

// Rating API endpoints
export const ratingAPI = {
  async getCourseRatings(
    courseId: number,
    limit = 5,
    offset = 0
  ): Promise<{ data: CourseRating[]; average_rating: number; rating_count: number }> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const response = await fetch(`${API_BASE_URL}/ratings/courses/${courseId}?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch course ratings');
    }

    return response.json();
  },

  async getTopRatedCourses(limit = 3): Promise<{ data: any[]; count: number }> {
    const params = new URLSearchParams({ limit: String(limit) });
    const response = await fetch(`${API_BASE_URL}/ratings/top-rated/courses?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch top-rated courses');
    }

    return response.json();
  },

  async createRating(
    courseId: number,
    rating: number,
    review?: string
  ): Promise<{ message: string; data: CourseRating }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/ratings/courses/${courseId}`, {
      method: 'POST',
      body: JSON.stringify({
        rating,
        review,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to create rating');
    }

    return response.json();
  },

  async updateRating(
    ratingId: number,
    rating: number,
    review?: string
  ): Promise<{ message: string; data: CourseRating }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: 'PUT',
      body: JSON.stringify({
        rating,
        review,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to update rating');
    }

    return response.json();
  },

  async deleteRating(ratingId: number): Promise<{ message: string }> {
    const response = await authenticatedFetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Please login first');
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete rating');
    }

    return response.json();
  },
};
