function Dashboard() {
  return (
    <div className="container mt-5 pt-5">
      <h3 className="fw-bold gov-title mb-4">
        Welfare Dashboard
      </h3>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h6 className="text-muted">Total Schemes</h6>
            <h2 className="fw-bold">45</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h6 className="text-muted">Eligible Schemes</h6>
            <h2 className="fw-bold text-success">6</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h6 className="text-muted">Previous Checks</h6>
            <h2 className="fw-bold">18</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
