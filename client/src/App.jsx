import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CreatePost from "./CreatePost";
import MyBlogs from "./MyBlogs";
import Comments from "./Comments";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2 className="logo">BlogSphere</h2>

        <div className="links">
          <Link to="/">Home</Link>

          {user && <Link to="/myblogs">My Blogs</Link>}

          {user && <Link to="/create">Create</Link>}

          {!user && <Link to="/login">Login</Link>}

          {!user && <Link to="/register">Register</Link>}

          {user && (
            <button className="logout" onClick={logout}>
              Logout
            </button>
          )}
        </div>

        {user && (
          <div className="profile">
            <div className="avatar">{user.email[0].toUpperCase()}</div>

            <span>{user.email}</span>
          </div>
        )}
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/create" element={<CreatePost />} />

          <Route path="/myblogs" element={<MyBlogs />} />

          {/* Comments page */}
          <Route path="/comments/:postId" element={<Comments />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
