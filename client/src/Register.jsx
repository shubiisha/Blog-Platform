import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";

import API from "./api";

function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      console.log("Firebase UID:", user.uid);

      // Save user in MySQL through backend
      await API.post("/users", {
        email: user.email,

        firebase_uid: user.uid,
      });

      alert("Registration successful");
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
