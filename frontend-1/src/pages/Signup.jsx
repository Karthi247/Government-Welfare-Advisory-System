import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          mobile,
          email: email || null, // important for optional email
          password
        })
      });

      const result = await response.text();
      alert(result);

      if (response.ok && result.toLowerCase().includes("success")) {
        navigate("/login");
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: "420px" }}>
        <h4 className="text-center mb-3">Citizen Signup</h4>

        <input
          className="form-control mb-2"
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Email (optional)"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="btn btn-success w-100"
          onClick={handleSignup}
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already registered?{" "}
          <span
            style={{ cursor: "pointer" }}
            className="text-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
