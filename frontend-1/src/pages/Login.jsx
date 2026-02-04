import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const body = mobileOrEmail.includes("@")
        ? { email: mobileOrEmail, password }
        : { mobile: mobileOrEmail, password };

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
      const msg = await response.text();
      alert(msg);
      return;
    }

      const user = await response.json();

      // store logged-in user
      localStorage.setItem("user", JSON.stringify(user));

      // role-based navigation
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "OFFICER") navigate("/officer");
      else if (user.role === "USER") navigate("/user");
      else alert("Unknown role");

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: "420px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <input
          className="form-control mb-2"
          placeholder="Mobile Number or Email"
          onChange={(e) => setMobileOrEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-3">
          New user?{" "}
          <span
            style={{ cursor: "pointer" }}
            className="text-primary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
