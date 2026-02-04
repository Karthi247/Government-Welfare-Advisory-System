import { useState } from "react";

function EligibilityForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="container mt-5 pt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px" }}>

        <h3 className="fw-bold text-center gov-title mb-4">
          Eligibility Check
        </h3>

        {/* Progress */}
        <div className="progress mb-4">
          <div
            className="progress-bar bg-gov"
            style={{ width: `${step * 33}%` }}
          >
            Step {step} of 3
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h5 className="mb-3">Personal Details</h5>
            <input className="form-control mb-3" placeholder="Age" />
            <select className="form-select mb-3">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h5 className="mb-3">Economic Details</h5>
            <input className="form-control mb-3" placeholder="Annual Income" />
            <select className="form-select mb-3">
              <option>Category</option>
              <option>SC</option>
              <option>ST</option>
              <option>OBC</option>
              <option>General</option>
            </select>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h5 className="mb-3">Occupation & State</h5>
            <input className="form-control mb-3" placeholder="Occupation" />
            <input className="form-control mb-3" placeholder="State" />
          </>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          {step > 1 && (
            <button className="btn btn-outline-secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {step < 3 ? (
            <button className="btn btn-primary ms-auto" onClick={() => setStep(step + 1)}>
              Next
            </button>
          ) : (
            <button className="btn btn-success ms-auto">
              Check Eligibility
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default EligibilityForm;
