const fs = require("fs");
const path = require("path");
const logger = require("./logger");

/**
 * Parses the prompt for @mentions and resolves them to file content from the store or disk.
 * @param {string} prompt - The user prompt
 * @param {object} sessionState - The current session state from ContextStore
 * @param {string} workspacePath - The current opened folder path on disk
 */
function resolveRefMentions(prompt, sessionState, workspacePath) {
  if (!prompt) return [];

  // Regex to find @filename.ext (supporting dots, underscores, dashes, backslashes, colons)
  const mentionRegex = /@([a-zA-Z0-9._\-\/\\:]+)/g;
  const matches = [...prompt.matchAll(mentionRegex)];
  const resolvedFiles = [];
  const handledNames = new Set();

  for (const match of matches) {
    const fileName = match[1];
    if (handledNames.has(fileName)) continue;
    handledNames.add(fileName);

    let resolvedContent = null;
    let resolvedPath = null;

    // Special Case: @terminal
    if (fileName.toLowerCase() === "terminal") {
      const logs = sessionState.telemetry.logs || [];
      resolvedContent = logs.length > 0 ? logs.join("\n") : "Terminal is empty.";
      resolvedPath = "SERIAL_TERMINAL_LOGS";
    }
    // 1. Check Attached Files in Store
    else if (sessionState.editor.attached_files && sessionState.editor.attached_files[fileName]) {
      const attached = sessionState.editor.attached_files;
      resolvedContent = attached[fileName].content;
      resolvedPath = attached[fileName].filePath;
    } 
    // 2. Check if it matches the current active file name
    else if (sessionState.editor.active_file === fileName || path.basename(sessionState.editor.active_file || "") === fileName) {
       resolvedContent = sessionState.editor.code_buffer;
       resolvedPath = sessionState.editor.active_file;
    }
    // 3. Try to resolve from disk using comprehensive path strategies
    else {
      try {
        const pathsToTry = [];
        
        // Strategy A: Is absolute path?
        const isAbsolute = path.isAbsolute(fileName) || /^[a-zA-Z]:/.test(fileName) || fileName.startsWith('/') || fileName.startsWith('\\');
        if (isAbsolute) {
          pathsToTry.push(path.normalize(fileName));
        } else {
          // Strategy B: Relative to active file's folder (and grandparent)
          const activeFile = sessionState.editor.active_file;
          if (activeFile) {
            const activeDir = path.dirname(activeFile);
            pathsToTry.push(path.join(activeDir, fileName));
            pathsToTry.push(path.join(path.dirname(activeDir), fileName));
          }
          
          // Strategy C: Relative to workspace
          if (workspacePath) {
            pathsToTry.push(path.join(workspacePath, fileName));
            pathsToTry.push(path.join(path.dirname(workspacePath), fileName));
          }
        }
        
        for (const fullPath of pathsToTry) {
          const normalized = path.normalize(fullPath);
          if (fs.existsSync(normalized) && fs.lstatSync(normalized).isFile()) {
            resolvedContent = fs.readFileSync(normalized, "utf-8");
            resolvedPath = normalized;
            break;
          }
        }
      } catch (err) {
        logger.debug(`Could not resolve @mention ${fileName} from disk: ${err.message}`);
      }
    }

    if (resolvedContent !== null) {
      resolvedFiles.push({
        name: fileName,
        path: resolvedPath,
        content: resolvedContent
      });
    }
  }

  return resolvedFiles;
}

module.exports = { resolveRefMentions };
