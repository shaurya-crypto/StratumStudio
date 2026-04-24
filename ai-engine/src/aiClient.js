const { loadConfig } = require("./config");
const https = require("https");
const http = require("http");

if (!global.fetchPolyfilled) {
  global.fetch = function (url, options = {}) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const reqModule = parsedUrl.protocol === "http:" ? http : https;

      const req = reqModule.request(
        url,
        {
          method: options.method || "GET",
          headers: options.headers || {},
        },
        (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => {
            resolve({
              ok: res.statusCode >= 200 && res.statusCode < 300,
              status: res.statusCode,
              text: async () => body,
              json: async () => JSON.parse(body),
            });
          });
        }
      );

      req.on("error", reject);

      if (options.body) {
        req.write(options.body);
      }
      req.end();
    });
  };
  global.fetchPolyfilled = true;
}
// Load raw HTTP drivers
const anthropicProvider = require("./providers/anthropic");
const openaiProvider = require("./providers/openai");
const ollamaProvider = require("./providers/ollama");
const groqProvider = require("./providers/groq");
const geminiProvider = require("./providers/gemini");

const TIMEOUT_MS = 30000; // 30s for complex code generation tasks
const MAX_TOKENS = 12000;

// ── Auto Model Routing ──────────────────────────────────────
// Evaluates prompt complexity and picks the best model for the provider.
// Heuristic: short/simple prompts → fast/cheap model, complex → powerful model.
function resolveAutoModel(provider, userPrompt) {
  const len = (userPrompt || "").length;
  // Complexity signals: code blocks, error traces, multi-file references, long prompts
  const hasCodeBlock = /```/.test(userPrompt);
  const hasError = /error|traceback|exception|failed|bug|fix/i.test(userPrompt);
  const hasMultiFile = (userPrompt.match(/@/g) || []).length >= 2;
  const isComplex = len > 500 || hasCodeBlock || hasError || hasMultiFile;

  const AUTO_MAP = {
    openai:     { fast: "gpt-4.1-mini",                powerful: "gpt-4o" },
    anthropic:  { fast: "claude-haiku-4-5-20251001",   powerful: "claude-sonnet-4-5-20251001" },
    gemini:     { fast: "gemini-2.5-flash",            powerful: "gemini-2.5-pro" },
    groq:       { fast: "llama-3.1-8b-instant",        powerful: "llama-3.3-70b-versatile" },
    openrouter: { fast: "meta-llama/llama-4-maverick",  powerful: "anthropic/claude-sonnet-4-5" },
    ollama:     { fast: "qwen2.5-coder:7b",            powerful: "qwen2.5-coder:32b" },
    deepseek:   { fast: "deepseek-chat",               powerful: "deepseek-reasoner" },
    mistral:    { fast: "mistral-small-latest",         powerful: "codestral-latest" },
  };

  const mapping = AUTO_MAP[provider] || AUTO_MAP.openai;
  const chosen = isComplex ? mapping.powerful : mapping.fast;
  console.log(`[AI-ENGINE] Auto-routing: complexity=${isComplex ? "HIGH" : "LOW"} → ${chosen}`);
  return chosen;
}

function trimContextLen(contextJSON) {
  if (!contextJSON) return {};
  let len = JSON.stringify(contextJSON).length;
  if (len > MAX_TOKENS) {
     if (contextJSON.optional) {
        delete contextJSON.optional;
     }
  }
  return contextJSON;
}

async function requestTargetLLM(config, userPrompt, context, mode, activeFile, referencedFiles) {
  switch (config.provider.toLowerCase()) {
    case "anthropic":
      return anthropicProvider.generate(config, userPrompt, context, mode, activeFile, referencedFiles);
    case "openai":
      return openaiProvider.generate(config, userPrompt, context, mode, activeFile, referencedFiles);
    case "groq":
      return groqProvider.generate(config, userPrompt, context, mode, activeFile, referencedFiles);
    case "gemini":
      return geminiProvider.generate(config, userPrompt, context, mode, activeFile, referencedFiles);
    case "openrouter":
      // OpenRouter uses the OpenAI-compatible API format with a different base URL
      return openaiProvider.generate(
        { ...config, baseUrl: "https://openrouter.ai/api/v1" },
        userPrompt, context, mode, activeFile, referencedFiles
      );
    case "deepseek":
      // DeepSeek uses the OpenAI-compatible API format with a different base URL
      return openaiProvider.generate(
        { ...config, baseUrl: "https://api.deepseek.com/v1" },
        userPrompt, context, mode, activeFile, referencedFiles
      );
    case "mistral":
      // Mistral uses the OpenAI-compatible API format with a different base URL
      return openaiProvider.generate(
        { ...config, baseUrl: "https://api.mistral.ai/v1" },
        userPrompt, context, mode, activeFile, referencedFiles
      );
    case "ollama":
    default:
      return ollamaProvider.generate(config, userPrompt, context, mode, activeFile, referencedFiles);
  }
}

/**
 * Main exposed function for the MCP Server
 */
async function generate({ userPrompt, context, mode, activeFile, referencedFiles, configOverride }) {
  // 1. Load config instantly off-disk
  const diskConfig = loadConfig();
  
  // Merge live UI React config with Disk Config as ultimate fallback
  const config = Object.assign({}, diskConfig, configOverride);

  // Guard API existence
  if (config.provider !== "ollama" && !config.apiKey) {
    return {
      error: {
        type: "INVALID_KEY",
        message: `Missing API Key for provider: ${config.provider}`
      }
    };
  }

  // ── Auto Model Routing ──
  // If model is "auto", pick the best model based on prompt complexity
  if (!config.model || config.model === "auto") {
    config.model = resolveAutoModel(config.provider, userPrompt);
  }

  const safeContext = trimContextLen(context);

  // Debug: Confirm exactly what we are sending to the network
  console.log(`[AI-ENGINE] Dispatching to ${config.provider} (Model: ${config.model})`);

  try {
    const rawResult = await Promise.race([
      requestTargetLLM(config, userPrompt, safeContext, mode, activeFile, referencedFiles),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), TIMEOUT_MS))
    ]);

    console.log(`[AI-ENGINE] Response type: ${rawResult.type}, has code: ${!!(rawResult.code && rawResult.code.length > 0)}`);

    return {
      success: true,
      response_text: rawResult  // Pass the full object — NOT just the explanation string
    };
  } catch (err) {
    // Normalization Wrapper
    if (err.message === "Timeout") {
      return { error: { type: "TIMEOUT", message: "API Provider took too long to respond. Try another model" } };
    }
    if (err.status === 429) {
      return { error: { type: "RATE_LIMIT", message: "Quota Exhausted." } };
    }
    if (err.status === 403 || err.status === 401) {
      return { error: { type: "AUTH_ERROR", message: err.message || "API access denied. Check your API key and network settings." } };
    }
    console.error("[AI-ENGINE] Raw error:", err);
    return { error: { type: "RUNTIME", message: err.message || JSON.stringify(err) } };
  }
}

module.exports = { generate };
