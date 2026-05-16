import { useState, useEffect } from 'react';
import { ratingAPI } from '../../services/api';
import { Card } from '../ui';
import { Heading, Text } from '../ui/Typography';
import { Button } from '../Button';

interface UserRating {
  rating_id: number;
  user_id: number;
  username?: string;
  rating: number;
  review: string | null;
  created_at: string;
}

interface RatingFormProps {
  courseId: number;
  userRating?: UserRating | null;
  onSuccess?: (newRating?: UserRating | null) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function RatingForm({ courseId, userRating, onSuccess, onError, disabled = false }: RatingFormProps) {
  const [rating, setRating] = useState<number>(userRating?.rating || 0);
  const [review, setReview] = useState<string>(userRating?.review || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const isEditing = !!userRating;

  // Sync internal state when parent-provided userRating changes
  useEffect(() => {
    setRating(userRating?.rating || 0);
    setReview(userRating?.review || '');
  }, [userRating]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      onError?.('Please select a rating');
      return;
    }

    try {
      setIsSubmitting(true);
      if (isEditing && userRating) {
        const res = await ratingAPI.updateRating(userRating.rating_id, rating, review || undefined);
        const updated = res.data as UserRating;
        setRating(updated.rating);
        setReview(updated.review || '');
        onSuccess?.(updated);
      } else {
        const res = await ratingAPI.createRating(courseId, rating, review || undefined);
        const created = res.data as UserRating;
        setRating(created.rating);
        setReview(created.review || '');
        onSuccess?.(created);
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !userRating) return;

    if (!confirm('Are you sure you want to delete your review?')) {
      return;
    }

    try {
      setIsSubmitting(true);
      await ratingAPI.deleteRating(userRating.rating_id);
      setRating(0);
      setReview('');
      onSuccess?.(null);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to delete rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white p-8 border border-outline-variant">
      <Heading level="h3" size="headline-md" className="text-on-surface mb-2">
        {isEditing ? 'Update Your Review' : 'Share Your Review'}
      </Heading>
      <Text variant="body-md" color="on-surface-variant" className="mb-6">
        {isEditing
          ? 'You can update your rating and review anytime.'
          : 'Help other students by sharing your experience with this course'}
      </Text>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="block text-label-lg font-bold text-on-surface mb-3">
            Rate this course
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={disabled || isSubmitting}
                className="transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span
                  className="material-symbols-outlined text-4xl text-secondary transition-all"
                  style={{
                    fontVariationSettings:
                      (hoverRating || rating) >= star ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  star
                </span>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-label-md text-primary font-semibold mt-2">
              {rating} out of 5 stars
            </p>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review" className="block text-label-lg font-bold text-on-surface mb-2">
            Your Review (Optional)
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about this course..."
            disabled={disabled || isSubmitting}
            maxLength={500}
            className="w-full px-4 py-3 rounded-lg border-2 border-outline-variant bg-surface-container focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body-md resize-none"
            rows={4}
          />
          <p className="text-label-sm text-on-surface-variant mt-2">
            {review.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={disabled || isSubmitting || rating === 0}
            variant="primary"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Review' : 'Submit Review'}
          </Button>
          {isEditing && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={disabled || isSubmitting}
              variant="secondary"
            >
              {isSubmitting ? 'Deleting...' : 'Delete Review'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
