# CKD Predict — AI-Based Chronic Kidney Disease Risk Assessment

CKD Predict is a web app that helps users assess their risk of Chronic 
Kidney Disease (CKD) through a guided, stage-by-stage symptom and health 
information questionnaire — no lab visit required to get a first read on 
your risk.

## Features

- **Stage-wise Assessment** — Collects personal info, lifestyle factors, 
  and symptoms in progressive stages rather than one long form, improving 
  completion rates and accuracy.
- **CKD Risk Prediction** — ML model analyzes responses and outputs a 
  percentage likelihood of CKD.
- **AI-Generated Health Report** — Auto-generates a clear, readable summary 
  of the assessment, risk factors identified, and recommended next steps.
- **Nephrologist Locator** — Finds nephrologists within a 20km radius 
  based on user location.
- **Kidney Clinic Finder** — Surfaces nearby kidney/dialysis clinics.
- **Anemia-Aware Referrals** — If anemia indicators are detected, 
  additionally suggests nearby blood banks and donation centers.

## How It Works

1. User answers a staged questionnaire (personal details → lifestyle → 
   symptoms).
2. Model computes a CKD risk percentage from the responses.
3. An AI-generated report summarizes findings in plain language.
4. Based on location + risk profile, the app recommends relevant 
   healthcare resources nearby.

## Tech Stack

- **Frontend:** _(e.g., React / Next.js)_
- **Backend:** _(e.g., Node.js / Python-Flask / FastAPI)_
- **ML Model:** _(e.g., scikit-learn / TensorFlow — trained on CKD clinical dataset)_
- **APIs:** Geolocation + Places API for nearby facility search
- **Report Generation:** LLM-based summarization

## Disclaimer

This tool provides a preliminary risk estimate and is **not a substitute 
for professional medical diagnosis**. Users with concerning results 
should consult a certified nephrologist.
