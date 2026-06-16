import { useEffect, useState } from "react";
import API from "./api";
import { auth } from "./firebase";

function Comments({ postId, onUpdate }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await API.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadComments();
  }, [postId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const res = await API.get(`/users/${user.email}`);
          setUserId(res.data.id);
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await API.post("/comments", {
        post_id: postId,
        user_id: userId,
        comment,
      });

      const res = await API.get(`/comments/${postId}`);

      setComments(res.data);
      setComment("");

      // update parent (Home)
      onUpdate?.(postId, res.data);
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
