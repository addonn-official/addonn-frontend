/**
 * Review object represents review-related API endpoints and their methods.
 */
const UserReview = {
  /**
   * Endpoint for getting all reviews.
   * @memberof UserReview
   * @type {object}
   * @property {string} url - The URL for getting all reviews.
   * @property {string} method - The HTTP method for getting all reviews (GET).
   */
  getAllReviews: {
    url: "/api/v1/review/get-all",
    method: "GET",
  },

  /**
   * Endpoint for submitting a review to a course.
   * @memberof UserReview
   * @type {object}
   * @property {string} url - The URL for submitting a course review.
   * @property {string} method - The HTTP method for submitting a course review (POST).
   */
  giveReviewToCourse: {
    url: "/api/v1/review/give-to-course",
    method: "POST",
  },


// Endpoint for update a review to a course.
  updateReviewToCourse: {
    url: "/api/v1/review/update/:id",
    method: "POST",
  },

// Endpoint for remove a review to a course.
   deleteReviewToCourse: {
    url: "/api/v1/review/delete/:id",
    method: "DELETE",
  },
};

export default UserReview;