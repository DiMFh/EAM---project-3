import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";

const LoginForm = ({ db }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStyle, setEmailStyle] = useState({});
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const ref = doc(db, "users", email);
      const res = await getDoc(ref);

      if (!res.exists()) {
        console.log("No such document in the database");
        // setError('Something is wrong with DB connection');
      } else {
        console.log("Email from database:", res.data().email);
        console.log("Password from database:", res.data().password);

        if (res.data().email === email && res.data().password === password) {
          localStorage.setItem("role", res.data().role);
          localStorage.setItem("email", res.data().email);
          navigate("/certificate");
          console.log("Found User:", res.data());
        } else {
          setEmailStyle({ borderColor: "red" });
          setPassword("");
          console.log("Incorrect email or password");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Εδώ μπορείτε να χειριστείτε το σφάλμα, π.χ. να εμφανίσετε ένα μήνυμα σφάλματος
    }
  }

  return (
    <div>
      <h2>Εθνικόν και Καποδιστριακόν Πανεπιστήμιον Αθηνών</h2>
      <p>Γραμματεία Πληροφορικής και Τηλεπικοινωνιών</p>
      <form onSubmit={handleLogin} className="login-container">
        <h2>Σύνδεση</h2>

        <div className="login-row">
          <div className="input-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 14C14.7614 14 17 11.3137 17 8C17 4.68629 14.7614 2 12 2C9.23858 2 7 4.68629 7 8C7 11.3137 9.23858 14 12 14Z"
                fill="#3F3F3F"
              />
              <path
                d="M21.8 19.1C20.9 17.3 19.2 15.8 17 14.9C16.4 14.7 15.7 14.7 15.2 15C14.2 15.6 13.2 15.9 12 15.9C10.8 15.9 9.8 15.6 8.8 15C8.3 14.8 7.6 14.7 7 15C4.8 15.9 3.1 17.4 2.2 19.2C1.5 20.5 2.6 22 4.1 22H19.9C21.4 22 22.5 20.5 21.8 19.1Z"
                fill="#3F3F3F"
              />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={emailStyle}
            />
          </div>
          <div className="login-row">
            <label>Password:</label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="/register">Create new user</a>
        </div>
      </form>
      <nav>
        <NavLink to="student-page" className="student-page">
          <button type="submit">Login</button>
        </NavLink>
      </nav>
    </div>
  );
};

export default LoginForm;
