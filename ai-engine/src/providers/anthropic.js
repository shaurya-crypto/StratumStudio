const { buildSystemPrompt } = require("./systemPrompt");

async function generate(config, userPrompt, context, mode, activeFile, referencedFiles) {
  const modelVer = config.model || "claude-3-5-sonnet-20241022";
  const systemText = buildSystemPrompt(context, mode, activeFile, referencedFiles);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: modelVer,
      max_tokens: 4096,
      system: systemText,
      messages: [{ role: "user", content: userPrompt }]
    })
  });

  if (!response.ok) {
    throw { status: response.status, message: await response.text() };
  }

  const json = await response.json();
  const rawText = json.content[0].text;
  return { type: "chat", payload: rawText };
}

module.exports = { generate };
