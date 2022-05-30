// need to return:
/*

[
  review_id (psql), 
  title,
  review_body,
  designer,
  review_img_url,
  votes,
  cagegory,
  owner,created_at
]
  
  */

exports.formatReviewData = (reviewData) => {
  return reviewData.map((review) => {
    return [
      review.title,
      review.review_body,
      review.designer,
      review.review_img_url,
      review.votes,
      review.category,
      review.owner,
      review.created_at,
    ];
  });
};
