function Result({ result }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Eligibility Result</h3>
      <p><b>Score:</b> {result.eligibility_score}</p>
      <p><b>Status:</b> {result.eligibility_status}</p>

      <h4>Recommended Schemes</h4>

      {result.recommended_schemes.length === 0 ? (
        <p>No schemes available</p>
      ) : (
        <ul>
          {result.recommended_schemes.map((s, index) => (
            <li key={index}>
              <b>{s.scheme_name}</b> – {s.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Result;
