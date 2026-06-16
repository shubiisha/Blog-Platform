import { useState } from "react";

import API from "./api";

import { auth } from "./firebase";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const create = async () => {
    try {
      const firebaseUser = auth.currentUser;

      if (!firebaseUser) {
        alert("Please login first");
        return;
      }

      // Get MySQL user id using Firebase UID
      const response = await API.get(`/users/${firebaseUser.uid}`);

      const userId = response.data.id;

      const token = await firebaseUser.getIdToken();

      await API.post(
        "/posts",

        {
          title: title,

          content: content,

          user_id: userId,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Post created");

      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <button onClick={create}>Create Post</button>
    </div>
  );
}

export default CreatePost;
