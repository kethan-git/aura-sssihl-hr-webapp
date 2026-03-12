// netlify/functions/ai-insights.js
// Secure proxy — Groq API key lives here on the server, never sent to the browser.

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { dataContext } = body;
  if (!dataContext || typeof dataContext !== "string") {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing dataContext" }) };
  }

  // Key read from Netlify environment variable — never hardcoded
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "API key not configured on server." }),
    };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: "You are a senior HR analytics expert and organizational psychologist. Analyze the provided HR data and generate concise, actionable root cause analysis. Format your response as clear sections with specific, data-driven insights and concrete recommendations. Use markdown-style bold for key figures. Keep it focused and professional.",
          },
          {
            role: "user",
            content: `Based on this HR dataset analysis, provide a root cause analysis of employee attrition with 4-5 key findings and specific recommendations:\n\n${dataContext}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || "Groq API error" }),
      };
    }

    const text = data.choices?.[0]?.message?.content || "";
    return { statusCode: 200, headers, body: JSON.stringify({ text }) };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
