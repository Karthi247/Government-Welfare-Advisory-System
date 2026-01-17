import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/welfare/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching history", err));
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Eligibility History</h3>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Age</th>
              <th>Income</th>
              <th>Status</th>
              <th>Score</th>
              <th>Checked At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.age}</td>
                <td>{item.annual_income}</td>
                <td>{item.eligibility_status}</td>
                <td>{item.eligibility_score}</td>
                <td>{item.checkedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
