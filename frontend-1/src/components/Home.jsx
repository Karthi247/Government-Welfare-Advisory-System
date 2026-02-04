import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-5 text-center">

        <h1 className="fw-bold mb-3 gov-title">
          Government Welfare Advisory System
        </h1>

        <p className="fs-5 text-muted mb-4">
          A trusted platform that helps citizens identify eligible government
          welfare schemes using Machine Learning and intelligent recommendations.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary btn-lg px-4"
            onClick={() => navigate("/check")}
          >
            Check Eligibility
          </button>

          <button
            className="btn btn-outline-secondary btn-lg px-4"
            onClick={() => navigate("/history")}
          >
            View History
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;
