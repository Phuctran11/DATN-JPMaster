import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Section, SectionHeader, StarRating } from '../ui';
import { Text } from '../ui/Typography';
import { ratingAPI } from '../../services/api';

interface Review {
  rating_id: number;
  course_id: number;
  course_title: string;
  average_rating: number;
  user_id: number;
  username: string;
  rating: number;
  review: string | null;
  created_at: string;
}

function LargeTestimonial({ review }: { review?: Review }) {
  if (!review) {
    return null;
  }

  return (
    <div className="md:col-span-2 md:row-span-2 bg-primary/5 rounded-[2.5rem] p-12 flex flex-col justify-between border border-primary/10 relative overflow-hidden cursor-pointer hover:border-primary transition-colors">
      <div className="relative z-10">
        <div className="mb-8">
          <h4 className="font-bold text-xl text-primary mb-2">{review.username}</h4>
          <p className="text-on-surface-variant font-medium mb-2">{review.course_title}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} size="lg" />
            <span className="text-lg font-bold text-primary">{review.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-2xl font-medium text-primary leading-relaxed italic">
          "{review.review || 'Excellent course! Highly recommended.'}"
        </p>
      </div>
      <p className="text-xs text-on-surface-variant mt-8">
        {new Date(review.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-surface-container rounded-[2rem] p-8 border border-outline-variant/50 hover:border-primary transition-colors flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={review.rating} size="sm" />
          <span className="text-sm font-bold text-primary">{review.rating.toFixed(1)}</span>
        </div>
        <Text variant="body-md" color="on-surface-variant" className="italic mb-6 line-clamp-3">
          "{review.review || 'Great course!'}"
        </Text>
        <p className="text-xs text-primary font-semibold mb-4">{review.course_title}</p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-outline-variant">
        <div>
          <h4 className="font-bold text-primary text-sm">{review.username}</h4>
          <p className="text-xs text-on-surface-variant">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    let active = true;

    const fetchReviews = async () => {
      try {
        const res = await ratingAPI.getTopRatedCourses(3);
        if (!active) return;
        setReviews(res.data || []);
      } catch (error) {
        console.error('Failed to load top-rated reviews', error);
        setReviews([]);
      }
    };

    fetchReviews();
    return () => {
      active = false;
    };
  }, []);

  const handleReviewClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  const largeReview = reviews[0];
  const smallReviews = reviews.slice(1);

  return (
    <Section bgColor="light">
      <Container>
        <SectionHeader
          badge="Community Voices"
          title="Scholars Around the World"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {largeReview && (
            <div onClick={() => handleReviewClick(largeReview.course_id)} className="cursor-pointer">
              <LargeTestimonial review={largeReview} />
            </div>
          )}
          {smallReviews.map((review) => (
            <div key={review.rating_id} onClick={() => handleReviewClick(review.course_id)} className="cursor-pointer">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
