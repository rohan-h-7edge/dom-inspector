import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

export interface SkillInfo {
  name: string;
  description: string;
  /** Full markdown body (frontmatter stripped). */
  body: string;
}

/**
 * Minimal frontmatter parser — skills only need flat string fields
 * (name/description), so a full YAML parser is unnecessary.
 */
function parseFrontmatter(source: string): { name?: string; description?: string; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { body: source };

  const [, frontmatter, body] = match;
  const fields: Record<string, string> = {};
  for (const line of frontmatter.split(/\r?\n/)) {
    const fieldMatch = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!fieldMatch) continue;
    const [, key, rawValue] = fieldMatch;
    fields[key] = rawValue.trim().replace(/^["']|["']$/g, "");
  }

  return { name: fields.name, description: fields.description, body: body.trim() };
}

/**
 * Discover skills under `<root>/.claude/skills/*\/SKILL.md` — the same
 * format/location Claude Code and the Vercel skills CLI (`npx skills add`)
 * use, so a skill installed for either shows up here too.
 */
export function loadSkills(root: string): SkillInfo[] {
  const skillsDir = join(root, ".claude", "skills");
  if (!existsSync(skillsDir)) return [];

  const skills: SkillInfo[] = [];

  for (const entry of readdirSync(skillsDir)) {
    const skillDir = join(skillsDir, entry);
    if (!statSync(skillDir).isDirectory()) continue;

    const skillFile = join(skillDir, "SKILL.md");
    if (!existsSync(skillFile)) continue;

    const { name, description, body } = parseFrontmatter(readFileSync(skillFile, "utf-8"));
    if (!name || !description) {
      console.warn(`[dom-inspector] [skills] Skipping ${skillFile}: missing name/description`);
      continue;
    }

    skills.push({ name, description, body });
  }

  return skills;
}
