/* need to return:

[
  comment_id (psql),
  author,
  review_id,
  votes (psql),
  created_at,
  body
]

*/

exports.formatCommentData = (commentData) => {
  return commentData.map((comment) => {
    return [
      comment.author,
      comment.review_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};
