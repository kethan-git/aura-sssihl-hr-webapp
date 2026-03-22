# AURA — Attrition Understanding & Retention Analytics

> *"AURA doesn't just show you the data. It tells you what to do about it."*

**AURA** is an AI-powered HR analytics web application that helps organizations understand, predict, and reduce employee attrition. Built as a single-file web app with no backend dependencies, it combines statistical analysis, machine learning, and generative AI to give HR professionals actionable insights from their workforce data.

🔗 **Live Demo:** [your-site.netlify.app](https://your-site.netlify.app)

---

## Features at a Glance

| Module | Description |
|---|---|
| Analytics Dashboard | Organization-wide attrition patterns and workforce health metrics |
| What-If Simulator | Real-time attrition risk simulation using interactive sliders |
| Root Cause Analysis | Statistical correlation analysis + AI-generated insights |
| Attrition Predictor | Individual employee risk scoring with intervention recommendations |
| Upload Your Data | Plug in your own HR dataset and refresh all analysis instantly |

---

## Modules

### Analytics Dashboard
A real-time view of your entire workforce. Visualizes attrition across six dimensions - department, job role, age group, tenure, burnout distribution, and salary buckets. Four KPI cards track total employees, overall attrition rate, average burnout score, and average job satisfaction. Includes a department × tenure heatmap for cross-dimensional risk identification.

### What-If Simulator
An interactive risk simulation engine. Adjust 10 employee parameters - burnout score, overtime hours, job satisfaction, work-life balance, salary, manager effectiveness, training hours, sentiment score, tenure, and age - and watch the attrition risk gauge update in real time. Includes a salary impact curve showing how compensation changes affect risk across the full salary range, and a key insights panel quantifying the effect of each intervention.

### Root Cause Analysis
Surfaces the structural drivers of attrition. Displays Pearson correlation coefficients for 11 features against attrition, a department health matrix, a satisfaction vs. attrition scatter plot, and six dynamically generated at-risk segments. The AI Insights panel uses a large language model (Llama 3.3 70B via Groq) to generate a data-driven root cause analysis and recommendations - recalculated from your live dataset every time.

### Attrition Predictor
Enter any employee profile across 11 parameters and receive an instant attrition probability score powered by a logistic regression model. The result includes a risk classification (Low / Medium / High), the top contributing risk factors, a list of recommended interventions, and a benchmark comparison against company and department averages.

### Upload Your Data
Replace the built-in demo dataset with your own HR data. Upload an XLSX file with 15 required columns and AURA recomputes every chart, KPI, correlation, prediction, and AI insight instantly. A downloadable template is provided to get started quickly. All processing happens in the browser - your data never leaves your device.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript - single file, zero build step |
| Charts | Chart.js 4.4.1 |
| Spreadsheet parsing | SheetJS (xlsx) 0.18.5 |
| Fonts | Google Fonts - Lora |
| AI Insights | Llama 3.3 70B via Groq API |
| Hosting | Netlify (static site + serverless function) |
| API Security | Netlify serverless proxy - API key never exposed to browser |

---

## ML Model

AURA uses a **logistic regression model** with hand-tuned weights calibrated to HR attrition research. Inputs are z-score normalized before scoring.

| Feature | Weight | Direction |
|---|---|---|
| Burnout Score | +0.55 | Risk driver |
| Job Satisfaction | −0.42 | Protective |
| Overtime Hours | +0.25 | Risk driver |
| Work-Life Balance | −0.13 | Protective |
| Sentiment Score | −0.10 | Protective |
| Manager Effectiveness | −0.18 | Protective |
| Monthly Salary | −0.08 | Protective |
| Promotions | −0.08 | Protective |
| Training Hours | −0.05 | Protective |
| Tenure | −0.05 | Protective |
| Age | −0.03 | Protective |

---

## Dataset

The default demo dataset contains **5,000 synthetic employees** across:
- 6 departments — Engineering, Finance, HR, Marketing, Sales, Support
- 5 job roles — Analyst, Engineer, Executive, Manager, Specialist
- 4 age groups and 4 tenure brackets
- 15 features per employee

Overall demo attrition rate: **~26%**

---

## Upload Data Format

To use your own data, upload an `.xlsx` file with these 15 columns:

| Column | Type | Range |
|---|---|---|
| Employee_ID | String/Number | Any |
| Department | String | Any |
| Job_Role | String | Any |
| Age | Number | 18–70 |
| Tenure_Years | Number | 0–50 |
| Monthly_Salary | Number | > 0 |
| Promotion_Last_Years | Number | 0–10 |
| Overtime_Hours | Number | 0–40 |
| Job_Satisfaction | Number | 0–1 |
| Manager_Effectiveness | Number | 0–1 |
| Work_Life_Balance | Number | 0–1 |
| Training_Hours | Number | 0–200 |
| Burnout_Score | Number | 0–1 |
| Sentiment_Score | Number | 0–1 |
| Attrition | Number | 0 or 1 |

Download the template directly from the Upload Data page in the app.

---

## Project Structure

```
aura-deploy/
├── index.html                  ← Complete AURA web application
├── netlify.toml                ← Netlify routing and security headers
├── netlify/
│   └── functions/
│       └── ai-insights.js      ← Serverless proxy for Groq API
└── README.md                   ← This file
```

---

## Deployment

AURA is hosted on **Netlify** with a serverless function acting as a secure proxy for the Groq API. The API key is stored as a Netlify environment variable and never exposed to the browser.

### Deploy your own instance

1. Fork this repository
2. Connect it to Netlify via "Import from Git"
3. Add environment variable: `GROQ_API_KEY` = your key from [console.groq.com](https://console.groq.com)
4. Deploy - done

> Groq is free to use with no credit card required.

---

## Security

- The Groq API key is stored exclusively as a server-side environment variable
- All HR data uploaded by users is processed entirely in the browser — nothing is sent to any server
- No user data is stored, logged, or transmitted anywhere

---

## Authors

**Omkar & Kethan**
Sri Sathya Sai Institute of Higher Learning (SSSIHL)

---

## License

This project is intended for academic and demonstration purposes.
