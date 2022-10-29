import { useState } from "react";

const Comments = ({ blog, handleComment }) => {
  const [comment, setComment] = useState("");

  const addComment = (event) => {
    event.preventDefault();
    const commentAddedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    };
    handleComment(commentAddedBlog)
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={(e) => addComment(e)}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {!blog.comments ? null : blog.comments.map((c, i) => <li key={i}>{c}</li>)}
    </div>
  );
};

export default Comments;
