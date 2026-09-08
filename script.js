// ═══════════════════════════════════════════
//  CLINICAL DATA (Harvard, NIDDK, KDIGO 2024)
// ═══════════════════════════════════════════
const STAGE_SYMPTOMS = {
  1:[
    {id:'s1_foamy',   label:'Foamy or bubbly urine',              detail:'Proteinuria — earliest CKD biomarker (NIDDK)'},
    {id:'s1_blood',   label:'Blood-tinged or dark urine',          detail:'Hematuria — indicates glomerular damage'},
    {id:'s1_nocturia',label:'Urinating more at night (nocturia)',  detail:'Kidneys lose concentrating ability during sleep'},
    {id:'s1_ankles',  label:'Mild swelling in ankles or feet',     detail:'Early fluid retention from reduced filtration'},
    {id:'s1_hbp',     label:'Elevated blood pressure (newly)',      detail:'Kidneys regulate BP; damage raises it'},
    {id:'s1_itching', label:'Occasional unexplained itching',      detail:'Mild phosphate imbalance even at Stage 1'},
    {id:'s1_fatigue', label:'Unexplained tiredness / low energy',  detail:'Mild anemia begins early in CKD'},
    {id:'s1_thirst',  label:'Persistent unusual thirst / dry mouth',detail:'Linked to impaired urine concentration'},
  ],
  2:[
    {id:'s2_freq',    label:'Changes in urination frequency',      detail:'More or less frequent than usual'},
    {id:'s2_pale',    label:'Pale or diluted urine',               detail:'Kidneys less able to concentrate waste'},
    {id:'s2_back',    label:'Mild lower back or flank pain',       detail:'Dull ache near kidney location'},
    {id:'s2_puffiness',label:'Puffiness around eyes in morning',  detail:'Periorbital edema from proteinuria'},
    {id:'s2_fatigue2',label:'Fatigue not improved by rest',        detail:'Progressive mild anemia'},
    {id:'s2_concentrate',label:'Slight difficulty concentrating', detail:'Mild uremic cognitive effect'},
    {id:'s2_appetite',label:'Decreased appetite without reason',   detail:'Early uremia suppresses hunger'},
    {id:'s2_weakness',label:'Muscle weakness or cramps',           detail:'Electrolyte imbalances beginning'},
  ],
  3:[
    {id:'s3_swelling',  label:'Notable swelling in legs/ankles/feet',detail:'Progressive fluid retention'},
    {id:'s3_shortwnd',  label:'Shortness of breath (mild)',          detail:'Fluid around lungs (pulmonary edema)'},
    {id:'s3_urine_dark',label:'Urine noticeably darker or brown',    detail:'Concentrated waste from reduced filtration'},
    {id:'s3_nausea',    label:'Nausea or stomach discomfort',        detail:'Uremic toxins affecting GI tract'},
    {id:'s3_sleep',     label:'Sleep problems / restless legs',      detail:'Uremia-linked restless leg syndrome'},
    {id:'s3_cramps',    label:'Frequent leg / muscle cramps',        detail:'Low calcium, phosphate accumulation'},
    {id:'s3_anemia',    label:'Pale skin or always feeling cold',    detail:'Significant anemia (reduced erythropoietin)'},
    {id:'s3_concentrate2',label:'Difficulty thinking or focusing',  detail:'Uremic encephalopathy beginning'},
    {id:'s3_bone',      label:'Bone pain or easy fracturing',        detail:'CKD-MBD — disrupted calcium-phosphate'},
    {id:'s3_headache',  label:'Frequent persistent headaches',       detail:'Uncontrolled hypertension from CKD Stage 3'},
  ],
  4:[
    {id:'s4_vomit',  label:'Vomiting (not from illness)',           detail:'Significant uremia affecting the GI system'},
    {id:'s4_metal',  label:'Metallic or ammonia taste in mouth',    detail:'Uremic toxins diffusing through saliva'},
    {id:'s4_smell',  label:'Urine-like breath odor (uremic fetor)', detail:'Ammonia from urea breakdown — serious sign'},
    {id:'s4_noappe', label:'Severe loss of appetite',               detail:'Uremia suppressing hunger hormones'},
    {id:'s4_chest',  label:'Chest pain or pressure',                detail:'Pericarditis from uremia or fluid overload'},
    {id:'s4_confusion',label:'Confusion or mental fog',             detail:'Uremic encephalopathy; toxins affecting brain'},
    {id:'s4_skin',   label:'Yellowing or dull grayish skin',        detail:'Urochrome pigment deposition'},
    {id:'s4_itch',   label:'Severe persistent whole-body itching',  detail:'High phosphate stimulating nerve endings'},
    {id:'s4_reduced',label:'Noticeably reduced urine output',       detail:'Significant nephron loss'},
    {id:'s4_twitch', label:'Muscle twitching / fasciculations',     detail:'Electrolyte and uremia-induced neuromuscular irritability'},
  ],
  5:[
    {id:'s5_nouri',  label:'Little to no urine output',             detail:'Kidneys nearly stopped functioning'},
    {id:'s5_severe', label:'Severe whole-body swelling',            detail:'Critical fluid overload — EMERGENCY'},
    {id:'s5_breath', label:'Severe shortness of breath at rest',    detail:'Pulmonary edema — EMERGENCY'},
    {id:'s5_seizure',label:'Seizures',                              detail:'Uremic seizure — CALL EMERGENCY SERVICES'},
    {id:'s5_halluc', label:'Confusion / hallucinations',            detail:'Severe uremic encephalopathy'},
    {id:'s5_heart',  label:'Palpitations or irregular heartbeat',   detail:'Dangerous hyperkalemia — cardiac risk'},
    {id:'s5_lethargy',label:'Extreme lethargy / unresponsiveness', detail:'Pre-comatose uremic state'},
    {id:'s5_rash',   label:'Uremic frost (white crystals on skin)', detail:'Urea crystallizing on skin — sign of ESRD'},
  ]
};

const DIET_PLANS = {
  low: {
    tag:'Stage 1–2 (Preventive)',
    eat:[['Stay hydrated','6–8 glasses of water daily'],['Fruits & vegetables','Apples, berries, cabbage, cauliflower, garlic'],['Whole grains','Brown rice, oats, whole wheat bread'],['Lean protein','Chicken, fish (2–3×/week), eggs in moderation'],['Healthy fats','Olive oil, avocado, nuts'],],
    limit:[['Sodium','Max 2300 mg/day — avoid processed food'],['Red meat','Max 1–2 servings/week'],['Added sugar','Linked to diabetes, a key CKD driver'],],
    avoid:[['Excess NSAIDs','Ibuprofen, naproxen damage kidneys with long use'],['High-sodium processed food','Chips, canned soup, fast food'],],
  },
  moderate: {
    tag:'Stage 3 (Kidney-Protective)',
    eat:[['Low-potassium fruits','Apples, berries, grapes, peaches, pears'],['Low-potassium veggies','Cabbage, cauliflower, green beans, cucumbers'],['White rice / pasta','Lower potassium than whole grains'],['Egg whites','High-quality protein without phosphorus additives'],['Cranberries','Shown to help prevent UTIs linked to CKD'],],
    limit:[['Protein','0.6–0.8 g/kg body weight per day'],['Potassium','1,500–2,000 mg/day max'],['Phosphorus','800–1,000 mg/day — avoid phosphate additives'],['Sodium','Max 1,500 mg/day'],],
    avoid:[['High-potassium foods','Bananas, oranges, potatoes, tomatoes, avocado'],['Phosphate additives','Cola drinks, processed cheese, fast food'],['Salt substitutes','Often contain potassium chloride — dangerous in CKD'],],
  },
  high: {
    tag:'Stage 4–5 (Renal Diet — Strict)',
    eat:[['Cauliflower','Versatile low-K, low-P vegetable'],['Egg whites only','Yolks contain phosphorus'],['Cabbage','Very low potassium and phosphorus'],['Apple / red grapes','Safe low-K fruits'],['White bread','Much lower phosphorus than whole grain'],],
    limit:[['Fluid intake','800–1000 mL/day if on dialysis'],['Protein','0.6 g/kg/day if not on dialysis; 1.2 g/kg on dialysis'],['Potassium','Below 1,500 mg/day strictly'],['Phosphorus','Below 800 mg/day strictly'],],
    avoid:[['Dairy products','Very high phosphorus — milk, cheese, yogurt'],['Nuts and seeds','Very high phosphorus and potassium'],['Whole grains','Oats, brown rice — high potassium & phosphorus'],['Dark colas','High in phosphoric acid'],['Bananas, oranges, potatoes','Very high potassium — can cause cardiac events'],],
  }
};

// ═════════════════════
//  BLOOD GROUP DATA
// ═════════════════════
const BLOOD_GROUP_INFO = {
  'A+':  { compatible: ['A+', 'A−', 'O+', 'O−'], canDonateTo: ['A+', 'AB+'], note: 'You can receive from A+, A−, O+, O− donors.' },
  'A-':  { compatible: ['A−', 'O−'],              canDonateTo: ['A+', 'A−', 'AB+', 'AB−'], note: 'Rare type — you can receive from A− and O− donors only.' },
  'B+':  { compatible: ['B+', 'B−', 'O+', 'O−'], canDonateTo: ['B+', 'AB+'], note: 'You can receive from B+, B−, O+, O− donors.' },
  'B-':  { compatible: ['B−', 'O−'],              canDonateTo: ['B+', 'B−', 'AB+', 'AB−'], note: 'Rare type — you can receive from B− and O− donors only.' },
  'AB+': { compatible: ['A+','A−','B+','B−','AB+','AB−','O+','O−'], canDonateTo: ['AB+'], note: 'Universal recipient — you can receive blood from any blood type.' },
  'AB-': { compatible: ['A−', 'B−', 'AB−', 'O−'], canDonateTo: ['AB+', 'AB−'], note: 'You can receive from A−, B−, AB− and O− donors.' },
  'O+':  { compatible: ['O+', 'O−'],              canDonateTo: ['A+', 'B+', 'AB+', 'O+'], note: 'Most common type — you can receive from O+ and O− donors.' },
  'O-':  { compatible: ['O−'],                    canDonateTo: ['All blood types'], note: 'Universal donor — you can only receive from O− donors. Your blood is the most in-demand for emergencies.' },
};

// ═════════════════
//  STATE
// ═════════════════
let advancedOpen = false;
let chartDonut = null, chartBar = null;

const SCREENS = ['screen-landing','screen-info','screen-health','screen-stage1','screen-stage2','screen-stage3','screen-stage4','screen-stage5'];

// ═════════════════
//  BMI CALCULATOR
// ═════════════════
function parseHeight(val) {
  if (!val) return null;
  val = val.trim();
  // ft'in" format
  const ft = val.match(/(\d+)\s*['']\s*(\d+)/);
  if (ft) return (parseInt(ft[1]) * 30.48) + (parseInt(ft[2]) * 2.54);
  // cm
  const cm = parseFloat(val.replace(/[^0-9.]/g,''));
  return isNaN(cm) ? null : cm;
}
function parseWeight(val) {
  if (!val) return null;
  val = val.trim().toLowerCase();
  const num = parseFloat(val.replace(/[^0-9.]/g,''));
  if (isNaN(num)) return null;
  return val.includes('lb') ? num * 0.453592 : num;
}
function updateBMI() {
  const h = parseHeight(document.getElementById('f-height').value);
  const w = parseWeight(document.getElementById('f-weight').value);
  const widget = document.getElementById('bmi-widget');
  const obesityItem = document.querySelector('.risk-item[data-value="obesity"]');
  if (!h || !w || h < 50 || w < 10) {
    widget.style.display = 'none';
    if (obesityItem) obesityItem.classList.remove('checked');
    return;
  }
  const bmi = w / ((h/100) ** 2);
  let cat, desc, color, barPct, autoFlag = '';
  if (bmi < 16)        { cat='Severely Underweight'; desc='Dangerously low BMI — malnutrition is a serious CKD complication risk.'; color='#ef4444'; barPct=8; }
  else if (bmi < 18.5) { cat='Underweight'; desc='Low BMI may indicate malnutrition, which worsens CKD outcomes.'; color='#3b82f6'; barPct=20; }
  else if (bmi < 25)   { cat='Normal Weight'; desc='Healthy BMI — lower CKD risk from obesity.'; color='#22c55e'; barPct=40; }
  else if (bmi < 30)   { cat='Overweight'; desc='Overweight (BMI 25–29.9) raises CKD risk. Target BMI <25.'; color='#f59e0b'; barPct=62; autoFlag='⚠️ Obesity risk factor enabled'; }
  else if (bmi < 35)   { cat='Obese — Class I'; desc='Obesity raises CKD risk by 83% (Harvard Health, 2023).'; color='#f97316'; barPct=80; autoFlag='⚠️ Obesity risk factor enabled'; }
  else if (bmi < 40)   { cat='Obese — Class II'; desc='Severe obesity is a major independent CKD risk factor.'; color='#ef4444'; barPct=90; autoFlag='⚠️ Obesity risk factor enabled'; }
  else                  { cat='Obese — Class III (Morbid)'; desc='Morbid obesity — very high CKD and cardiovascular risk.'; color='#b91c1c'; barPct=98; autoFlag='⚠️ Obesity risk factor enabled'; }

  document.getElementById('bmi-num').textContent = bmi.toFixed(1);
  document.getElementById('bmi-num').style.color = color;
  document.getElementById('bmi-cat').textContent = cat;
  document.getElementById('bmi-cat').style.color = color;
  document.getElementById('bmi-desc').textContent = desc + (autoFlag ? ' ' + autoFlag : '');
  document.getElementById('bmi-bar').style.width = barPct + '%';
  document.getElementById('bmi-bar').style.background = color;
  widget.style.display = 'flex';

  // Auto-sync obesity risk checkbox
  if (obesityItem) obesityItem.classList.toggle('checked', bmi >= 25);
}

// ═════════════════
//  eGFR (CKD-EPI 2021)
// ═════════════════
function autoCalcEgfr() {
  const scr = parseFloat(document.getElementById('f-creatinine').value);
  const age = parseInt(document.getElementById('f-age').value) || 0;
  const sex = document.querySelector('input[name="sex"]:checked')?.value || 'male';
  if (!scr || scr <= 0 || !age) { document.getElementById('egfr-calc-result').style.display='none'; return; }
  const female = sex === 'female';
  const kappa = female ? 0.7 : 0.9;
  const alpha = female ? -0.241 : -0.302;
  const ratio = scr / kappa;
  const egfr = 142 * Math.pow(Math.min(ratio,1), alpha) * Math.pow(Math.max(ratio,1), -1.200) * Math.pow(0.9938, age) * (female ? 1.012 : 1);
  const egfrRounded = Math.round(egfr);
  document.getElementById('f-egfr').value = egfrRounded;
  let stageLabel, stageColor;
  if (egfrRounded >= 90)      { stageLabel='Stage 1 — Normal or High'; stageColor='var(--success)'; }
  else if (egfrRounded >= 60) { stageLabel='Stage 2 — Mildly Decreased'; stageColor='#3b82f6'; }
  else if (egfrRounded >= 30) { stageLabel='Stage 3 — Moderately Decreased'; stageColor='var(--warning)'; }
  else if (egfrRounded >= 15) { stageLabel='Stage 4 — Severely Decreased'; stageColor='var(--danger)'; }
  else                         { stageLabel='Stage 5 — Kidney Failure (ESRD)'; stageColor='var(--accent)'; }
  const el = document.getElementById('egfr-calc-result');
  document.getElementById('egfr-calc-num').textContent = egfrRounded;
  document.getElementById('egfr-calc-num').style.color = stageColor;
  document.getElementById('egfr-stage-label').textContent = stageLabel;
  document.getElementById('egfr-stage-label').style.color = stageColor;
  el.style.display = 'block';
}

function toggleAdvanced() {
  advancedOpen = !advancedOpen;
  document.getElementById('adv-toggle-sw').classList.toggle('on', advancedOpen);
  document.getElementById('adv-lab-section').classList.toggle('hidden', !advancedOpen);
}

// ═════════════════
//  SYMPTOM GRID
// ═════════════════
function initSymptomGrids() {
  for (let stage = 1; stage <= 5; stage++) {
    const grid = document.getElementById(`symptoms-stage${stage}`);
    if (!grid) continue;
    grid.innerHTML = STAGE_SYMPTOMS[stage].map(s => `
      <div class="symptom-item" id="item-${s.id}" onclick="toggleSymptom(this,${stage})">
        <div class="check-box"><svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
        <div class="symptom-label"><strong>${s.label}</strong><span>${s.detail}</span></div>
      </div>`).join('');
  }
}
function toggleSymptom(el, stage) { el.classList.toggle('checked'); updateCounter(stage); }
function toggleRisk(el) { el.classList.toggle('checked'); }
function updateCounter(stage) {
  document.getElementById(`count-s${stage}`).textContent =
    document.querySelectorAll(`#symptoms-stage${stage} .symptom-item.checked`).length;
}

// ═════════════════
//  NAVIGATION
// ═════════════════
function showScreen(id) {
  SCREENS.forEach(s => document.getElementById(s).classList.add('hidden'));
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.classList.add('fade-in');
  setTimeout(() => el.classList.remove('fade-in'), 400);
  if (id !== 'screen-landing') {
    document.getElementById('stepper-wrap').classList.add('visible');
    updateStepper(SCREENS.indexOf(id) - 1);
  } else {
    document.getElementById('stepper-wrap').classList.remove('visible');
  }
  window.scrollTo({top:0,behavior:'smooth'});
}

function updateStepper(active) {
  for (let i = 0; i < 7; i++) {
    const c = document.getElementById(`sc-${i}`);
    const n = document.getElementById(`sn-${i}`);
    c.classList.remove('active','done');
    n.classList.remove('active');
    if (i < active)       { c.classList.add('done'); }
    else if (i === active) { c.classList.add('active'); n.classList.add('active'); }
  }
  for (let i = 0; i < 6; i++) {
    document.getElementById(`sl-${i}`).classList.toggle('done', i < active);
  }
}

function validateInfoAndNext() {
  if (!document.getElementById('f-name').value.trim()) { alert('Please enter your name.'); return; }
  const age = parseInt(document.getElementById('f-age').value);
  if (!age || age < 1 || age > 120) { alert('Please enter a valid age.'); return; }
  if (!document.querySelector('input[name="sex"]:checked')) { alert('Please select your biological sex.'); return; }
  showScreen('screen-health');
}

// ═════════════════════════════════════════
//  RISK CALCULATION (Rule-based + AI model)
// ═════════════════════════════════════════
const API_URL = 'http://localhost:5000';
let modelAvailable = false;

// Check if Flask API is running on page load
async function checkModelAvailability() {
  try {
    const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const d = await res.json();
      modelAvailable = true;
      // Show AI badge on result button
      const btn = document.querySelector('button[onclick="calculateResult()"]');
      if (btn) btn.innerHTML = `🤖 Analyze with AI Model (${d.accuracy*100}% acc)`;
      console.log(`✅ AI Model ready: ${d.model} | Acc=${d.accuracy*100}% | AUC=${d.roc_auc}`);
    }
  } catch { modelAvailable = false; }
}
checkModelAvailability();

function getChecked(stage) { return document.querySelectorAll(`#symptoms-stage${stage} .symptom-item.checked`).length; }
function getTotal(stage)   { return STAGE_SYMPTOMS[stage].length; }
function getRiskFactors()  { return document.querySelectorAll('.risk-item.checked').length; }

// Build payload for the Flask AI API
function buildApiPayload() {
  const sex = document.querySelector('input[name="sex"]:checked')?.value || 'male';
  const bp_raw = (document.getElementById('f-bp')?.value||'').trim();
  const bp_diastolic = bp_raw.includes('/') ? parseFloat(bp_raw.split('/')[1]) : 80;
  const riskChecked = {};
  document.querySelectorAll('.risk-item.checked').forEach(el =>
    riskChecked[el.dataset.value] = true);

  return {
    age:              parseFloat(document.getElementById('f-age').value) || 50,
    sex:              sex,
    blood_pressure:   bp_diastolic,
    serum_creatinine: parseFloat(document.getElementById('f-creatinine')?.value) || 1.0,
    egfr:             parseFloat(document.getElementById('f-egfr')?.value) || 75,
    haemoglobin:      sex==='female' ? 13.0 : 14.5,
    blood_glucose:    riskChecked['diabetes'] ? 160 : 100,
    blood_urea:       35,
    sodium:           138, potassium: 4.2,
    packed_cell_volume: 42, wbc_count: 7500, rbc_count: 4.8,
    // Risk factors
    hypertension:     !!riskChecked['hypertension'],
    diabetes:         !!riskChecked['diabetes'],
    heart_disease:    !!riskChecked['heart'],
    obesity:          !!riskChecked['obesity'],
    family_history:   !!riskChecked['family'],
    smoking:          !!riskChecked['smoking'],
    nsaids:           !!riskChecked['nsaids'],
    autoimmune:       !!riskChecked['autoimmune'],
    kidney_stones:    !!riskChecked['kidney_stones'],
    recurrent_uti:    !!riskChecked['recurrent_uti'],
    // Symptoms
    foamy_urine:      !!document.getElementById('item-s1_foamy')?.classList.contains('checked'),
    blood_urine:      !!document.getElementById('item-s1_blood')?.classList.contains('checked'),
    nocturia:         !!document.getElementById('item-s1_nocturia')?.classList.contains('checked'),
    swelling:         !!document.getElementById('item-s3_swelling')?.classList.contains('checked'),
    anemia:           !!document.getElementById('item-s3_anemia')?.classList.contains('checked'),
    appetite_poor:    !!document.getElementById('item-s2_appetite')?.classList.contains('checked'),
    pedal_edema:      !!document.getElementById('item-s3_swelling')?.classList.contains('checked'),
    nausea:           !!document.getElementById('item-s3_nausea')?.classList.contains('checked'),
    vomiting:         !!document.getElementById('item-s4_vomit')?.classList.contains('checked'),
    // Stage counts
    s1_count: getChecked(1), s2_count: getChecked(2), s3_count: getChecked(3),
    s4_count: getChecked(4), s5_count: getChecked(5),
  };
}

async function calculateResult() {
  const s1=getChecked(1),t1=getTotal(1), s2=getChecked(2),t2=getTotal(2),
        s3=getChecked(3),t3=getTotal(3), s4=getChecked(4),t4=getTotal(4),
        s5=getChecked(5),t5=getTotal(5);
  const rf   = getRiskFactors();
  const age  = parseInt(document.getElementById('f-age').value) || 40;
  const name = document.getElementById('f-name').value || 'Patient';
  const egfr = parseFloat(document.getElementById('f-egfr').value) || 0;

  // ── Try AI Model first ──────────────────────────────────────────
  let aiResult = null;
  if (modelAvailable) {
    try {
      const resp = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(buildApiPayload()),
        signal: AbortSignal.timeout(4000)
      });
      if (resp.ok) aiResult = await resp.json();
    } catch { aiResult = null; }
  }

  // ── Rule-based fallback ─────────────────────────────────────────
  // Weighted symptom score (symptoms are the PRIMARY signal)
  const symptomScore = (s1/t1)*10 + (s2/t2)*15 + (s3/t3)*25 + (s4/t4)*28 + (s5/t5)*32;
  // Risk factors amplify existing symptoms; without symptoms they barely move the needle
  const rfBonus = symptomScore > 0
    ? Math.min(rf * 2.5, 15)   // symptomatic: up to +15
    : Math.min(rf * 0.8, 4);   // asymptomatic: up to +4 (risk factors alone ≠ CKD)
  const ageFactor = age>=60 ? 3 : age>=45 ? 1.5 : age>=30 ? 0.5 : 0;
  let egfrPenalty = 0;
  if (egfr>0&&egfr<15) egfrPenalty=30; else if(egfr>=15&&egfr<30) egfrPenalty=20;
  else if(egfr>=30&&egfr<60) egfrPenalty=12; else if(egfr>=60&&egfr<90) egfrPenalty=5;

  let total = Math.min(Math.max(symptomScore + rfBonus + ageFactor + egfrPenalty, 0), 100);
  let rulePct = Math.round(total);

  // Blend: if AI model answered, weight it 70% AI + 30% rule-based
  let pct = aiResult ? Math.round(aiResult.ckd_probability * 0.70 + rulePct * 0.30) : rulePct;
  pct = Math.min(Math.max(pct, 0), 100);

  let usedModel = aiResult ? aiResult.model_used : 'Rule-based';
  let modelAcc  = aiResult ? aiResult.model_accuracy : null;

  let level, levelClass, message, dietKey;
  if (s5>=2||pct>=78) {
    level='CRITICAL RISK'; levelClass='level-critical'; dietKey='high';
    message=`<strong>${name}</strong>, your symptom profile strongly overlaps with <strong>advanced CKD (Stage 4–5)</strong>. Estimated <strong>${pct}% probability</strong> of significant kidney disease. <strong style="color:var(--accent)">Seek immediate nephrology evaluation</strong> — do not delay.`;
  } else if (s4>=3||pct>=60) {
    level='HIGH RISK'; levelClass='level-high'; dietKey='high';
    message=`<strong>${name}</strong>, your profile closely matches <strong>CKD Stage 3–4</strong>. Estimated <strong>${pct}% probability</strong>. Schedule a nephrologist within <strong>1–2 weeks</strong> and request uACR + eGFR immediately.`;
  } else if (s3>=3||pct>=40) {
    level='MODERATE RISK'; levelClass='level-moderate'; dietKey='moderate';
    message=`<strong>${name}</strong>, notable overlap with <strong>CKD Stage 2–3</strong>. Estimated <strong>${pct}% probability</strong>. Consult your physician soon and request a kidney function panel (BMP, urinalysis, uACR).`;
  } else if ((s1+s2)>=3||pct>=18) {
    level='LOW–MODERATE RISK'; levelClass='level-low'; dietKey='low';
    message=`<strong>${name}</strong>, some early CKD markers present. Estimated <strong>${pct}% probability</strong>. Visit a doctor within 1–3 months for a routine kidney check. Lifestyle changes can significantly prevent progression.`;
  } else {
    level='MINIMAL RISK'; levelClass='level-minimal'; dietKey='low';
    message=`<strong>${name}</strong>, your profile shows minimal overlap with CKD indicators. Estimated <strong>${pct}% probability</strong>. Reassuring, but CKD can be silent — request a kidney check at your next annual physical if risk factors exist.`;
  }

  // Save to localStorage
  const prev = loadHistory();
  saveHistory({ name, age, pct, level, timestamp: Date.now() });

  // Show result screen
  document.getElementById('result-screen').style.display='block';
  SCREENS.forEach(s => document.getElementById(s).classList.add('hidden'));
  document.getElementById('stepper-wrap').classList.remove('visible');

  const modelBadge = aiResult
    ? `<span style="display:inline-flex;align-items:center;gap:6px;background:rgba(46,196,182,.12);border:1px solid rgba(46,196,182,.35);color:var(--success);font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:20px;margin-left:8px;">🤖 AI Model · ${usedModel} · ${modelAcc}% acc</span>`
    : `<span style="display:inline-flex;align-items:center;gap:6px;background:rgba(148,163,184,.1);border:1px solid rgba(148,163,184,.3);color:var(--muted);font-size:.72rem;padding:3px 10px;border-radius:20px;margin-left:8px;">📐 Rule-based · <a href='model/setup_and_run.bat' style='color:var(--secondary)'>Enable AI model</a></span>`;

  document.getElementById('result-name').innerHTML =
    `Assessment for <strong>${name}</strong>, Age ${age} ${modelBadge}`;
  document.getElementById('risk-badge').textContent = level;
  document.getElementById('risk-badge').className = `risk-level-badge ${levelClass}`;
  document.getElementById('result-message').innerHTML = message;

  // Show AI feature importances if available
  if (aiResult?.top_features?.length) {
    const featHtml = aiResult.top_features.map(f =>
      `<span style="background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:4px 10px;font-size:.75rem;color:var(--muted);">
        <strong style="color:var(--secondary)">${f.feature.replace(/_/g,' ')}</strong> ${(f.importance*100).toFixed(1)}%
      </span>`).join('');
    document.getElementById('result-message').innerHTML +=
      `<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center">
        <span style="font-size:.75rem;color:var(--muted);width:100%;margin-bottom:2px;">🔑 Top AI features driving this prediction:</span>
        ${featHtml}
      </div>`;
  }

  // Animate gauge
  setTimeout(() => {
    const path = document.getElementById('meter-path');
    const filled = (pct/100)*270;
    path.setAttribute('stroke-dasharray', `${filled} ${270-filled}`);
    const color = pct>=78?'#f72585':pct>=60?'#ef4444':pct>=40?'#f59e0b':pct>=18?'#3b82f6':'#2ec4b6';
    path.setAttribute('stroke', color);
    document.getElementById('meter-pct').style.color = color;
    let n=0;
    const iv = setInterval(()=>{ n=Math.min(n+Math.ceil(pct/40),pct); document.getElementById('meter-pct').textContent=n+'%'; if(n>=pct) clearInterval(iv); },28);
  },200);

  // Stage bars + chart data
  const stages = [{s:s1,t:t1,id:'s1'},{s:s2,t:t2,id:'s2'},{s:s3,t:t3,id:'s3'},{s:s4,t:t4,id:'s4'},{s:s5,t:t5,id:'s5'}];
  const barPcts = [];
  setTimeout(()=>{
    stages.forEach(({s,t,id})=>{
      const p=t>0?Math.round((s/t)*100):0;
      barPcts.push(p);
    });
    renderCharts(pct, barPcts);
  },400);

  // History compare
  if (prev && prev.pct !== undefined) {
    const diff = pct - prev.pct;
    const trend = diff > 2 ? 'trend-up' : diff < -2 ? 'trend-down' : 'trend-same';
    const arrow = diff > 2 ? '↑' : diff < -2 ? '↓' : '→';
    const date = new Date(prev.timestamp).toLocaleDateString();
    document.getElementById('history-compare-section').innerHTML = `
      <div class="history-compare">
        <h4>📊 Compared to Your Last Assessment (${date})</h4>
        <div class="compare-row">
          <span>Previous: <strong>${prev.pct}%</strong> (${prev.level})</span>
          <span class="compare-arrow ${trend}">${arrow} ${Math.abs(diff)}%</span>
          <span>Current: <strong>${pct}%</strong> (${level})</span>
        </div>
        <p style="font-size:.78rem;color:var(--muted);margin-top:8px;">${diff>2?'Your risk has increased since your last assessment — please consult a doctor.':diff<-2?'Your risk has improved since your last assessment — keep up the healthy habits!':'Your risk level is similar to your last assessment.'}</p>
      </div>`;
  } else {
    document.getElementById('history-compare-section').innerHTML='';
  }

  // Recommended tests
  const tests = ['Serum creatinine & eGFR (CKD-EPI 2021 formula) — NIDDK standard','Urine albumin-to-creatinine ratio (uACR) — detects protein in urine','Complete metabolic panel (BMP/CMP) — electrolytes, kidney markers','Complete blood count (CBC) — check for anemia','Urinalysis — protein, blood cells, casts, specific gravity'];
  if (s3>2||s4>0) tests.push('Kidney ultrasound — structural evaluation (size, obstruction)');
  if (s4>2||s5>0) tests.push('Serum phosphate, calcium, PTH — CKD-MBD bone-mineral metabolism');
  if (s5>0) tests.push('STAT electrolytes (potassium) — cardiac risk from hyperkalemia');
  document.getElementById('recommended-tests').innerHTML = tests.map(t=>`<li>${t}</li>`).join('');

  // Diet Plan
  buildDietPlan(dietKey);

  // Recommendations
  const recs = [];
  if (pct>=60) recs.push({icon:'🏥',title:'See a Nephrologist Urgently',body:'Request a nephrology referral from your GP within 1–2 weeks. Bring this printed report.'});
  else if (pct>=30) recs.push({icon:'👨‍⚕️',title:'Visit Your Doctor Soon',body:'Schedule within 1 month and request a kidney function panel (BMP, urinalysis, uACR).'});
  else recs.push({icon:'📅',title:'Annual Kidney Check',body:'Request eGFR and uACR at your next annual physical, especially if you have risk factors.'});
  recs.push({icon:'💧',title:'Stay Well Hydrated',body:'6–8 glasses of water daily. Chronic dehydration concentrates toxins and accelerates nephron damage.'});
  recs.push({icon:'🚫',title:'Avoid Nephrotoxic Drugs',body:'Limit NSAIDs (Ibuprofen, Naproxen). Always disclose all medications to your doctor.'});
  recs.push({icon:'🥗',title:'Follow Kidney-Friendly Diet',body:'Reduce sodium, potassium, phosphorus per stage. See the diet plan section above.'});
  if (rf>0) recs.push({icon:'💉',title:'Control Underlying Conditions',body:'Target BP <130/80 mmHg and HbA1c <7%. These directly drive CKD progression rate.'});
  recs.push({icon:'🏃',title:'Regular Exercise',body:'150 min/week moderate aerobic activity lowers CKD progression risk by 30% (Harvard Health, 2022).'});
  document.getElementById('recommendations').innerHTML = recs.map(r=>`<div class="rec-card"><div class="rec-icon">${r.icon}</div><div class="rec-body"><h4>${r.title}</h4><p>${r.body}</p></div></div>`).join('');

  // ── Anemia detection & blood bank section ──────────────────────────
  const anemiaSymptom = document.getElementById('item-s3_anemia')?.classList.contains('checked');
  const anemiaRisk    = document.querySelector('.risk-item[data-value="anemia"]')?.classList.contains('checked');
  const anemiaFatigue = document.getElementById('item-s1_fatigue')?.classList.contains('checked');
  const hasAnemia = anemiaSymptom || anemiaRisk || (anemiaFatigue && pct >= 30);

  const anemiaSection = document.getElementById('anemia-section');
  const bloodGroup = document.getElementById('f-blood-group').value;

  if (hasAnemia) {
    anemiaSection.style.display = 'block';
    const bgInfo = BLOOD_GROUP_INFO[bloodGroup];
    const infoEl = document.getElementById('anemia-blood-group-info');
    if (bgInfo && bloodGroup) {
      infoEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span style="background:rgba(247,37,133,.15);border:1px solid rgba(247,37,133,.4);color:#f72585;font-size:1.2rem;font-weight:800;padding:6px 14px;border-radius:10px;">${bloodGroup}</span>
          <strong style="color:var(--text);">Your Blood Group</strong>
        </div>
        <p style="margin-bottom:6px;"><strong style="color:var(--secondary);">Compatible donors:</strong> ${bgInfo.compatible.join(', ')}</p>
        <p style="margin-bottom:6px;"><strong style="color:var(--secondary);">You can donate to:</strong> ${bgInfo.canDonateTo.join(', ')}</p>
        <p style="color:var(--muted);">ℹ️ ${bgInfo.note} When visiting a blood bank for an anemia transfusion, request <strong>${bgInfo.compatible[0]}</strong> or <strong>O−</strong> (universal) if your type is unavailable.</p>`;
    } else {
      infoEl.innerHTML = `<p style="color:var(--muted);">ℹ️ Blood group not provided. Go back to <strong>Personal Info</strong> and select your blood group to see compatible donor types and blood bank guidance.</p>`;
    }
  } else {
    anemiaSection.style.display = 'none';
  }

  window.scrollTo({top:0,behavior:'smooth'});
}

// ═════════════════
//  CHARTS (Chart.js)
// ═════════════════
function renderCharts(overallPct, stagePcts) {
  if (chartDonut) { chartDonut.destroy(); chartDonut=null; }
  if (chartBar)   { chartBar.destroy();   chartBar=null;   }

  const riskColor = overallPct>=78?'#f72585':overallPct>=60?'#ef4444':overallPct>=40?'#f59e0b':overallPct>=18?'#3b82f6':'#2ec4b6';

  // Donut chart
  const donutCtx = document.getElementById('chart-donut').getContext('2d');
  chartDonut = new Chart(donutCtx, {
    type:'doughnut',
    data:{
      labels:['CKD Risk','No Risk'],
      datasets:[{data:[overallPct, 100-overallPct], backgroundColor:[riskColor,'#1f2937'], borderWidth:0, hoverOffset:4}]
    },
    options:{
      responsive:true, maintainAspectRatio:false, cutout:'72%',
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:ctx=>' '+ctx.parsed+'%'}}
      }
    }
  });

  // Bar chart
  const barCtx = document.getElementById('chart-bar').getContext('2d');
  chartBar = new Chart(barCtx, {
    type:'bar',
    data:{
      labels:['Stage 1','Stage 2','Stage 3','Stage 4','Stage 5'],
      datasets:[{
        label:'% Matched',
        data: stagePcts,
        backgroundColor:['#2ec4b6','#3b82f6','#f59e0b','#ef4444','#a855f7'],
        borderRadius:6, borderWidth:0
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>` ${ctx.parsed.y}% matched`}}},
      scales:{
        y:{max:100,ticks:{color:'#94a3b8',font:{size:10},callback:v=>v+'%'},grid:{color:'rgba(255,255,255,.05)'}},
        x:{ticks:{color:'#94a3b8',font:{size:10}},grid:{display:false}}
      }
    }
  });
}

// ═════════════════
//  DIET PLAN
// ═════════════════
function buildDietPlan(key) {
  const plan = DIET_PLANS[key];
  document.getElementById('diet-stage-tag').textContent = '— ' + plan.tag;
  const mkList = (arr,cls='') => arr.map(([name,desc])=>`<li class="${cls}"><strong>${name}</strong> — ${desc}</li>`).join('');
  document.getElementById('diet-content').innerHTML = `
    <div class="diet-grid">
      <div class="diet-card">
        <h4>✅ EAT FREELY <span class="diet-badge badge-eat">Recommended</span></h4>
        <ul>${mkList(plan.eat)}</ul>
      </div>
      <div class="diet-card">
        <h4>⚠️ LIMIT <span class="diet-badge badge-limit">In Moderation</span></h4>
        <ul>${mkList(plan.limit)}</ul>
      </div>
      <div class="diet-card" style="grid-column:1/-1">
        <h4>🚫 AVOID <span class="diet-badge badge-avoid">Harmful for Kidneys</span></h4>
        <ul>${mkList(plan.avoid,'avoid')}</ul>
      </div>
    </div>
    <p style="font-size:.76rem;color:var(--muted);margin-top:12px;">📖 Source: American Kidney Fund Renal Diet Guide, NKF KDOQI Nutrition Guidelines 2020.</p>`;
}
function toggleDiet() {
  const c=document.getElementById('diet-content');
  const icon=document.getElementById('diet-toggle-icon');
  c.classList.toggle('open');
  icon.style.transform = c.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
}
function toggleCitations() {
  const b=document.getElementById('citations-body');
  const i=document.getElementById('cite-icon');
  b.classList.toggle('open');
  i.style.transform = b.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
}

// ═════════════════════════════
//  DOCTOR LOCATOR + LOCATION
// ═════════════════════════════
let _locCoords = null;       // {lat, lng} from GPS
let _locDocType = 'nephrologist';

function findBloodBank(type = 'blood bank') {
  const bloodGroup = document.getElementById('f-blood-group').value;
  const query = bloodGroup ? `${type} ${bloodGroup} blood type` : type;
  findDoctors(query);
}

function findDoctors(query) {
  _locDocType = query;
  // Reset modal state
  setLocStatus('', '', false);
  document.getElementById('loc-auto-btn').disabled = false;
  document.getElementById('loc-manual-input').value =
    document.getElementById('f-country').value.trim() || '';
  // Highlight correct type button
  const types = ['nephrologist','kidney clinic','kidney specialist hospital'];
  types.forEach((t,i) => {
    document.getElementById(`btn-type-${i}`).classList.toggle('active', t===query);
  });
  document.getElementById('modal-query-label').textContent = query;
  document.getElementById('loc-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function selectDocType(idx, type) {
  _locDocType = type;
  document.querySelectorAll('.loc-type-btn').forEach((b,i) =>
    b.classList.toggle('active', i===idx));
  document.getElementById('modal-query-label').textContent = type;
}

function closeLocModal() {
  document.getElementById('loc-modal').classList.add('hidden');
  document.body.style.overflow = '';
}
function closeLocModalOnBg(e) {
  if (e.target.id === 'loc-modal') closeLocModal();
}

function setLocStatus(icon, text, show, type='') {
  const el = document.getElementById('loc-status');
  document.getElementById('loc-status-icon').textContent = icon;
  document.getElementById('loc-status-text').textContent = text;
  el.className = 'loc-status' + (show ? ' show' : '') + (type ? ' '+type : '');
}

function getAutoLocation() {
  if (!navigator.geolocation) {
    setLocStatus('❌', 'GPS not supported by your browser. Please enter location manually.', true, 'error');
    return;
  }
  const btn = document.getElementById('loc-auto-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spin">⏳</span> Detecting your location…';
  setLocStatus('⏳', 'Requesting GPS location from your device…', true, 'loading');

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      _locCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      btn.innerHTML = '✅ Location detected!';
      setLocStatus('✅',
        `Location found: ${_locCoords.lat.toFixed(4)}°, ${_locCoords.lng.toFixed(4)}° — 20 km radius ready`,
        true, 'success');
    },
    (err) => {
      btn.disabled = false;
      btn.innerHTML = '<span>📡</span> Use My Current Location (GPS)';
      const msgs = {1:'Location permission denied. Please allow access or enter manually.',2:'Location unavailable. Enter manually below.',3:'Location request timed out. Enter manually.'};
      setLocStatus('❌', msgs[err.code] || 'Location error. Enter manually.', true, 'error');
      _locCoords = null;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

function openMapsWithLocation() {
  const manual = document.getElementById('loc-manual-input').value.trim();
  const type = _locDocType;

  // Build URL — prefer GPS coords for precise 20km radius
  if (_locCoords) {
    // Google Maps: zoom level 13 ≈ ~20km radius view
    const q = encodeURIComponent(type);
    const url = `https://www.google.com/maps/search/${q}/@${_locCoords.lat},${_locCoords.lng},13z`;
    window.open(url, '_blank');
    closeLocModal();
    return;
  }

  // Fallback: manual text location
  if (manual) {
    const q = encodeURIComponent(`${type} near ${manual}`);
    window.open(`https://www.google.com/maps/search/${q}`, '_blank');
    closeLocModal();
    return;
  }

  // Nothing entered
  setLocStatus('⚠️', 'Please allow GPS access or enter your city/address above.', true, 'error');
}

// ═════════════════
//  LOCALSTORAGE
// ═════════════════
function saveHistory(data) { try { localStorage.setItem('ckd_last', JSON.stringify(data)); } catch(e){} }
function loadHistory()     { try { const d=localStorage.getItem('ckd_last'); return d?JSON.parse(d):null; } catch(e){return null;} }

function showHistoryBanner() {
  const h = loadHistory();
  if (!h) return;
  const date = new Date(h.timestamp).toLocaleDateString();
  const colorMap = {'MINIMAL RISK':'var(--success)','LOW–MODERATE RISK':'#7eecea','MODERATE RISK':'var(--warning)','HIGH RISK':'#ff6b7a','CRITICAL RISK':'var(--accent)'};
  const col = colorMap[h.level] || 'var(--secondary)';
  document.getElementById('history-banner-wrap').innerHTML = `
    <div class="history-banner" onclick="loadPreviousResult()">
      <div class="history-icon">📋</div>
      <div class="history-body">
        <h4>Previous Assessment Found — ${h.name}, Age ${h.age}</h4>
        <p>${date} · Click to view your last result, or begin a new assessment below</p>
      </div>
      <div class="history-pct" style="color:${col}">${h.pct}%</div>
    </div>`;
}

// ═════════════════
//  HELPERS
// ═════════════════
function loadPreviousResult() {
  const h = loadHistory();
  if (!h) return;
  document.getElementById('f-name').value = h.name || '';
  document.getElementById('f-age').value  = h.age  || '';
  alert(`Showing your last saved result (${new Date(h.timestamp).toLocaleDateString()}). To re-run the full assessment, click "Begin Free Assessment".`);
}

function preparePrint() {
  document.getElementById('print-date').textContent = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  window.print();
}

function restartAssessment() {
  document.getElementById('result-screen').style.display='none';
  document.querySelectorAll('.symptom-item.checked').forEach(el=>el.classList.remove('checked'));
  document.querySelectorAll('.risk-item.checked').forEach(el=>el.classList.remove('checked'));
  document.querySelectorAll('input[type=radio]').forEach(el=>el.checked=false);
  document.querySelectorAll('.radio-btn.selected').forEach(el=>el.classList.remove('selected'));
  ['f-name','f-age','f-height','f-weight','f-country','f-creatinine','f-egfr','f-bp'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('f-ethnicity').value='';
  document.getElementById('f-blood-group').value='';
  document.getElementById('anemia-section').style.display='none';
  document.getElementById('bmi-widget').style.display='none';
  document.getElementById('egfr-calc-result').style.display='none';
  for(let i=1;i<=5;i++) document.getElementById(`count-s${i}`).textContent='0';
  if(advancedOpen) toggleAdvanced();
  showScreen('screen-landing');
}

// Radio buttons
document.addEventListener('click',function(e){
  const btn=e.target.closest('.radio-btn');
  if(!btn) return;
  const group=btn.closest('.radio-group');
  if(!group) return;
  group.querySelectorAll('.radio-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  const radio=btn.querySelector('input[type=radio]');
  if(radio) radio.checked=true;
  // Recalc eGFR if creatinine is entered
  if(document.getElementById('f-creatinine').value) autoCalcEgfr();
});

// Boot
initSymptomGrids();
