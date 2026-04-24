const { buildSystemPrompt } = require("./systemPrompt");

async function generate(config, userPrompt, context, mode, activeFile, referencedFiles) {
  const modelVer = config.model || "gpt-4o";
  const systemText = buildSystemPrompt(context, mode, activeFile, referencedFiles);
  const baseUrl = config.baseUrl || "https://api.openai.com/v1";

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + config.apiKey
    },
    body: JSON.stringify({
      model: modelVer,
      // NO response_format json_object — we accept natural Markdown
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

    if (response.status === 403 || response.status === 401) {
      const providerName = config.baseUrl?.includes("openrouter") ? "OpenRouter"
        : config.baseUrl?.includes("deepseek") ? "DeepSeek"
        : config.baseUrl?.includes("mistral") ? "Mistral"
        : "OpenAI";
      cleanMessage = `${providerName} API access denied (${response.status}). Check your API key in Tools > Settings.`;
    }

    throw { status: response.status, message: cleanMessage };
  }

  const json = await response.json();
  const rawText = json.choices[0].message.content;
  return { type: "chat", payload: rawText };
}

module.exports = { generate };
