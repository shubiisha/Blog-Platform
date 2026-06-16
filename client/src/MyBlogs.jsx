import { useEffect, useState } from "react";

import API from "./api";

import { auth } from "./firebase";

function MyBlogs() {
  const [posts, setPosts] = useState([]);

  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const loadPosts = async () => {
    const user = auth.currentUser;

    const response = await API.get(`/posts/user/${user.uid}`);

    setPosts(response.data);
  };

  useEffect(() => {
    const loadPosts = async () => {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const response = await API.get(`/posts/user/${user.uid}`);

      setPosts(response.data);
    };

    loadPosts();
  }, []);

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);

    alert("Post deleted");

    loadPosts();
  };

  const editPost = async () => {
    await API.put(`/posts/${editId}`, {
      title: title,

      content: content,
    });

    alert("Post updated");

    setEditId(null);

    loadPosts();
  };

  return (
    <div>
      <h1>My Blogs</h1>

      {posts.map((post) => (
        <div className="card" key={post.id}>
          {editId === post.id ? (
            <div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button onClick={editPost}>Save</button>
            </div>
          ) : (
            <div>
              <h2>{post.title}</h2>

              <p>{post.content}</p>

              <button
                onClick={() => {
                  setEditId(post.id);

                  setTitle(post.title);

                  setContent(post.content);
                }}
              >
                Edit
              </button>

              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBlogs;
