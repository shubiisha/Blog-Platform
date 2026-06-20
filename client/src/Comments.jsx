import { useEffect, useState } from "react";
import API from "./api";
import { auth } from "./firebase";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [firebaseUid, setFirebaseUid] = useState("");

  const loadComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUid(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await API.post("/comments", {
        post_id: postId,
        user_id: firebaseUid,
        comment: comment,
      });

      setComment("");

      loadComments();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h3>Comments</h3>

      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((item) => (
          <p key={item.id}>
            <b>{item.email || "User"}</b> : {item.comment}
          </p>
        ))
      )}

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
