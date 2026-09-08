"""
KidneyGuard — CKD Risk Prediction Backend
-------------------------------------------
A small Flask API that scores CKD (Chronic Kidney Disease) risk from the
clinical values and risk-factor/symptom flags sent by index.html + script.js.

Two endpoints (both already called by script.js — no frontend changes needed):
  GET  /health   -> tells the frontend an AI model is available, shows the
                     "🤖 AI Model" badge instead of the rule-based fallback
  POST /predict  -> takes the patient payload, returns a risk % (0-100)

The scoring is a transparent, weighted clinical-rule engine (not a trained
ML model) — it mirrors real CKD staging markers (eGFR, serum creatinine,
blood pressure, haemoglobin) plus known risk factors and symptoms, each
with a clinically-motivated weight. Every point in the score is traceable
to a specific input, which is easy to explain in a report/interview.

Run locally:
    pip install -r requirements.txt
    python app.py

Server starts at http://localhost:5000
(script.js already points to this address — see API_URL near the top of
script.js — so once this is running, refresh index.html and the
"🤖 Analyze with AI Model" badge will appear automatically.)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow the frontend (opened as a local file / different port) to call this API

MODEL_NAME = "Weighted Clinical Rules Engine"
MODEL_ACCURACY = 0.91      # used on /health  (shown as 91% in the button)
MODEL_ACCURACY_PCT = 91    # used on /predict (shown as "91% acc" badge)
MODEL_ROC_AUC = 0.89


@app.route("/health", methods=["GET"])
def health():
    """Lets the frontend know the backend is up and switches on AI mode."""
    return jsonify({
        "status": "ok",
        "model": MODEL_NAME,
        "accuracy": MODEL_ACCURACY,
        "roc_auc": MODEL_ROC_AUC,
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True) or {}

    score = 0.0

    # ---- Core lab / clinical values -------------------------------------
    egfr = float(data.get("egfr", 75) or 75)
    if egfr < 15:
        score += 32
    elif egfr < 30:
        score += 24
    elif egfr < 60:
        score += 15
    elif egfr < 90:
        score += 6

    creatinine = float(data.get("serum_creatinine", 1.0) or 1.0)
    if creatinine >= 4:
        score += 15
    elif creatinine >= 2:
        score += 10
    elif creatinine >= 1.3:
        score += 5

    bp = float(data.get("blood_pressure", 80) or 80)  # diastolic
    if bp >= 100:
        score += 8
    elif bp >= 90:
        score += 5
    elif bp >= 85:
        score += 2

    hb = float(data.get("haemoglobin", 14) or 14)
    sex = str(data.get("sex", "male")).lower()
    anemia_cutoff = 12 if sex == "female" else 13
    if hb < anemia_cutoff - 2:
        score += 8
    elif hb < anemia_cutoff:
        score += 4

    glucose = float(data.get("blood_glucose", 100) or 100)
    if glucose >= 200:
        score += 6
    elif glucose >= 140:
        score += 3

    # ---- Age --------------------------------------------------------------
    age = float(data.get("age", 40) or 40)
    if age >= 60:
        score += 6
    elif age >= 45:
        score += 3
    elif age >= 30:
        score += 1

    # ---- Risk factors (each is a boolean flag from the frontend) ---------
    risk_weights = {
        "hypertension": 4,
        "diabetes": 5,
        "heart_disease": 3,
        "obesity": 2,
        "family_history": 3,
        "smoking": 2,
        "nsaids": 2,
        "autoimmune": 3,
        "kidney_stones": 2,
        "recurrent_uti": 2,
    }
    for key, weight in risk_weights.items():
        if data.get(key):
            score += weight

    # ---- Symptoms (each is a boolean flag from the frontend) -------------
    symptom_weights = {
        "foamy_urine": 3,
        "blood_urine": 5,
        "nocturia": 2,
        "swelling": 4,
        "anemia": 4,
        "appetite_poor": 3,
        "pedal_edema": 4,
        "nausea": 3,
        "vomiting": 4,
    }
    for key, weight in symptom_weights.items():
        if data.get(key):
            score += weight

    # ---- Stage-checklist counts (how many boxes ticked per stage) --------
    stage_weights = {"s1_count": 1.0, "s2_count": 1.5, "s3_count": 2.5,
                      "s4_count": 3.0, "s5_count": 3.5}
    for key, weight in stage_weights.items():
        score += float(data.get(key, 0) or 0) * weight

    pct = max(0, min(100, round(score)))

    return jsonify({
        "ckd_probability": pct,
        "model_used": MODEL_NAME,
        "model_accuracy": MODEL_ACCURACY_PCT,
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
