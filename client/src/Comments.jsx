import { useEffect, useState } from "react";
import API from "./api";
import { auth } from "./firebase";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await API.get(`/comments/${postId}`);

        console.log("Post ID:", postId);
        console.log("Comments:", res.data);

        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadComments();
  }, [postId]);

  const addComment = async () => {
    try {
      await API.post("/comments", {
        post_id: postId,
        user_id: auth.currentUser.uid,
        comment: comment,
      });

      setComment("");

      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3>Comments</h3>

      {comments.map((item) => (
        <p key={item.id}>
          <b>{item.email}</b> : {item.comment}
        </p>
      ))}

      {auth.currentUser && (
        <div>
          <textarea
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
          />

          <br />

          <button onClick={addComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
}

export default Comments;
