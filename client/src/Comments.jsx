import { useEffect, useState } from "react";
import API from "./api";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await API.post("/comments", {
        post_id: postId,
        username: name,
        comment: text,
      });

      // immediately show the new comment
      setComments([
        ...comments,
        {
          id: res.data.id,
          username: name,
          comment: text,
        },
      ]);

      setText("");
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>

      {comments.map((c) => (
        <div key={c.id}>
          <b>{c.username}</b>
          <p>{c.comment}</p>
        </div>
      ))}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Write comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

export default Comments;
