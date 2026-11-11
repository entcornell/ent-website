#!/usr/bin/env node
// Dependency-free commit guard, called by .githooks/pre-commit and .githooks/commit-msg.
// It enforces the rules a person forgets: no environment files, no build output and no
// AI attribution trailers. Enable once per clone with `npm run hooks:install`.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

// Folders that are always generated, never committed.
const BUILD_OUTPUT = ["dist/", "build/", "coverage/"];

export function stagedPathProblems(paths) {
  const problems = [];
  for (const path of paths) {
    const name = basename(path);
    if (name.startsWith(".env") && name !== ".env.example") {
      problems.push(`${path}: environment file (commit .env.example instead)`);
    }
    if (BUILD_OUTPUT.some((dir) => path.startsWith(dir))) {
      problems.push(`${path}: build output`);
    }
  }
  return problems;
}

export function commitMessageProblems(message) {
  // `git commit -v` appends the diff below a scissors line; only the message above it counts.
  const [body = ""] = message.split(/^# -+ >8 -+$/m);
  const problems = [];
  for (const line of body.split("\n")) {
    if (line.startsWith("#")) continue;
    if (
      /^\s*co-authored-by:.*\b(claude|anthropic)\b/i.test(line) ||
      /^\s*claude-session:/i.test(line) ||
      /generated with \[?claude/i.test(line)
    ) {
      problems.push(`attribution not allowed: ${line.trim()}`);
    }
  }
  return problems;
}

function stagedPaths() {
  const output = execFileSync(
    "git",
    ["diff", "--cached", "--name-only", "-z", "--diff-filter=ACMR"],
    { encoding: "utf8" },
  );
  return output.split("\0").filter(Boolean);
}

const [mode, messageFile] = process.argv.slice(2);
if (mode !== undefined) {
  const problems =
    mode === "pre-commit"
      ? stagedPathProblems(stagedPaths())
      : mode === "commit-msg" && messageFile
        ? commitMessageProblems(readFileSync(messageFile, "utf8"))
        : [`unknown mode "${mode}" (expected pre-commit or commit-msg <file>)`];
  if (problems.length > 0) {
    console.error(`git-guard ${mode}: commit blocked\n  - ${problems.join("\n  - ")}`);
    console.error("Fix the cause (see CONTRIBUTING.md); do not bypass with --no-verify.");
    process.exit(1);
  }
}
