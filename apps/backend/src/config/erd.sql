CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('guest', 'learner', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Course" (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    created_by INT NOT NULL REFERENCES "User"(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Lesson" (
    lesson_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES "Course"(course_id),
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('video', 'text', 'flashcard', 'quiz')),
    content_text TEXT,
    video_url TEXT,
    order_index INT NOT NULL,
    created_by INT NOT NULL REFERENCES "User"(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Flashcard" (
    flashcard_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(user_id),
    lesson_id INT NOT NULL REFERENCES "Lesson"(lesson_id),
    word VARCHAR(100) NOT NULL,
    meaning TEXT NOT NULL,
    example_sentence TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Quiz" (
    quiz_id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL REFERENCES "Lesson"(lesson_id),
    title VARCHAR(255) NOT NULL,
    created_by INT NOT NULL REFERENCES "User"(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quiz_type VARCHAR(20) CHECK (quiz_type IN ('assessment', 'practice', 'final'))
);

CREATE TABLE "Question" (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL REFERENCES "Quiz"(quiz_id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'fill_in_blank', 'true_false')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Option" (
    option_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES "Question"(question_id),
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "UserQuizResult" (
    user_quiz_result_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(user_id),
    quiz_id INT NOT NULL REFERENCES "Quiz"(quiz_id),
    score NUMERIC(5, 2) NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Voucher" (
    voucher_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent NUMERIC(5, 2) NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "UserVoucher" (
    user_voucher_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(user_id),
    voucher_id INT NOT NULL REFERENCES "Voucher"(voucher_id),
    used BOOLEAN DEFAULT FALSE NOT NULL,
    used_at TIMESTAMP
);

CREATE TABLE "Purchase" (
    purchase_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(user_id),
    course_id INT NOT NULL REFERENCES "Course"(course_id),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price_paid NUMERIC(10, 2) NOT NULL,
    voucher_id INT REFERENCES "Voucher"(voucher_id),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'canceled')),
    purchase_type VARCHAR(20) CHECK (purchase_type IN ('standard', 'voucher'))
);

CREATE TABLE "UserLessonProgress" (
    user_lesson_progress_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(user_id),
    lesson_id INT NOT NULL REFERENCES "Lesson"(lesson_id),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    video_watched_percent NUMERIC(5, 2) DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE, -- Trạng thái hoàn thành chung
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
    UNIQUE (user_id, lesson_id)
);

CREATE TABLE "CourseRating" (
    rating_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES "Course"(course_id),
    user_id INT NOT NULL REFERENCES "User"(user_id),
    rating NUMERIC(2, 1) CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (course_id, user_id) -- Đảm bảo mỗi người dùng chỉ đánh giá một lần cho mỗi khóa học
);

CREATE TABLE "CourseEnrollment" (
    enrollment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(user_id),
    course_id INT NOT NULL REFERENCES "Course"(course_id),
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('active', 'completed', 'dropped'))
);