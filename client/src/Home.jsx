import { useEffect, useState } from "react";
import API from "./api";
import Comments from "./Comments";

function Home() {
  const [posts, setPosts] = useState([]);

  const updateComments = (postId, comments) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments } : post,
      ),
    );
  };

  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Blog Home Page</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            Author: <i>{post.email}</i>
          </p>

          {post.comments?.map((comment) => (
            <p key={comment.id}>
              <b>{comment.email}</b>: {comment.comment}
            </p>
          ))}

          <Comments postId={post.id} updateComments={updateComments} />

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Home;
