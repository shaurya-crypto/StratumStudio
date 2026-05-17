// Helper for updating AIPanel.tsx
function extractActions(text: string) {
  const actions: any[] = [];
  let workingText = text;

  // Step 1: Unwrap action tags that the LLM wrapped inside markdown code fences
  // Supports incomplete code fences at the end of the text
  workingText = workingText.replace(
    /```[\w]*\s*\n?\s*(<action[\s\S]*?(?:<\/action>|\/>|$))(?:\s*\n?\s*```)?/gi,
    '$1'
  );

  // Step 2: Extract all <action ...>content</action> and <action ... /> tags
  // Uses (?:<\/action>|$) to handle truncated outputs where the LLM stopped generating
  const actionRegex = /<action\s+([^>]*?)(?:>([\s\S]*?)(?:<\/action>|$))|(\/>)/gi;

  let match;
  while ((match = actionRegex.exec(workingText)) !== null) {
    // If it matched the empty /> group, the attributes are in match[1] and content is empty
    const attrString = match[1];
    if (!attrString) continue;

    const content = match[2]?.trim() || '';

    const typeMatch = attrString.match(/type=["']([^"']+)["']/i);
    const targetMatch = attrString.match(/target=["']([^"']+)["']/i);
    const pathMatch = attrString.match(/path=["']([^"']+)["']/i);
    const packageMatch = attrString.match(/package=["']([^"']+)["']/i);

    if (!typeMatch) continue;

    actions.push({
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: typeMatch[1],
      target: targetMatch?.[1],
      path: pathMatch?.[1] || packageMatch?.[1],
      content,
      status: 'pending'
    });
  }

  // Step 3: Strip matched action tags from display text
  let strippedText = workingText.replace(/<action\s+[^>]*?(?:>[\s\S]*?(?:<\/action>|$))|(\/>)/gi, '');

  // Step 4: Clean orphaned empty code blocks and excessive blank lines
  strippedText = strippedText.replace(/```[\w]*\s*\n?\s*```/g, '');
  strippedText = strippedText.replace(/\n{3,}/g, '\n\n').trim();

  console.log(`[StratumStudio:Parser] Found ${actions.length} actions:`, actions.map(a => `${a.type}:${a.path}`));
  return { strippedText, actions };
}
