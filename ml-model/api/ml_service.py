from flask import Flask, request, jsonify
import joblib
import pandas as pd
from pathlib import Path
import os

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_DIR = BASE_DIR / "data" / "processed"

model = joblib.load(MODEL_DIR / "welfare_decision_tree_model.pkl")
encoders = joblib.load(MODEL_DIR / "encoders.pkl")

# 🔒 EXACT training order (replace if your print shows different)
FEATURE_ORDER = [
    "age",
    "gender",
    "category",
    "state",
    "occupation",
    "annual_income",
    "disability",
    "is_minority"
]

def safe_label_encode(series, encoder):
    series = series.astype(str)
    return series.apply(
        lambda x: encoder.transform(["Unknown"])[0]
        if x not in encoder.classes_
        else encoder.transform([x])[0]
    )

@app.route("/predict", methods=["POST"])
def predict_score():
    data = request.json
    df = pd.DataFrame([data])

    for col in FEATURE_ORDER:
        if col not in df:
            df[col] = "Unknown"

    for col, encoder in encoders.items():
        if col in df:
            df[col] = safe_label_encode(df[col], encoder)

    df = df.loc[:, FEATURE_ORDER]

    score = model.predict_proba(df)[0][1]

    return jsonify({
        "eligibility_score": float(score)
    })


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
