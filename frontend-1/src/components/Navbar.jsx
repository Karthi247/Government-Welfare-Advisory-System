import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gov fixed-top shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <span className="logo-circle me-2">GW</span>
          Welfare Advisory System
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#govNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="govNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* Common */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* USER ROLE */}
            {user && user.role === "USER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/check">Check Eligibility</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/history">History</Link>
                </li>
              </>
            )}

            {/* OFFICER ROLE */}
            {user && user.role === "OFFICER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/officer">Officer Dashboard</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/verify">Verify Applications</Link>
                </li>
              </>
            )}

            {/* ADMIN ROLE */}
            {user && user.role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/schemes">Manage Schemes</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/users">Manage Users</Link>
                </li>
              </>
            )}

            {/* AUTH SECTION */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-outline-light" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* User Info */}
                <li className="nav-item dropdown ms-lg-3">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    {user.fullName} ({user.role})
                  </span>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
