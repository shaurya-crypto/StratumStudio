const { buildSystemPrompt } = require("./systemPrompt");

async function generate(config, userPrompt, context, mode, activeFile, referencedFiles) {
  const modelVer = config.model || "llama-3.1-8b-instant";
  const systemText = buildSystemPrompt(context, mode, activeFile, referencedFiles);

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + config.apiKey
    },
    body: JSON.stringify({
      model: modelVer,
      // NO response_format json_object — this was causing json_validate_failed
      messages: [
        { role: "system", content: systemText },
        { role: "user", content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const rawBody = await response.text();
    let cleanMessage = rawBody;
    try {
      const parsed = JSON.parse(rawBody);
      cleanMessage = parsed?.error?.message || rawBody;
    } catch { /* use raw */ }

    if (response.status === 403) {
      cleanMessage = `Groq API access denied (403). Your API key may be invalid, expired, or your network/region may be blocked. Please verify your key at console.groq.com and check your internet connection.`;
    } else if (response.status === 401) {
      cleanMessage = `Groq API authentication failed (401). Your API key is invalid. Go to Tools > Settings to update it.`;
    }

    throw { status: response.status, message: cleanMessage };
  }

  const json = await response.json();
  const rawText = json.choices[0].message.content;
  return { type: "chat", payload: rawText };
}

module.exports = { generate };
