import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const script = fileURLToPath(new URL("../scripts/lint-format.js", import.meta.url));
const relativeDir = "test/tmp-lint-format";
const dir = join(root, relativeDir);

function run(args) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

function output(result) {
  return `${result.stdout}${result.stderr}`;
}

describe("lint-format", () => {
  it("fails when an earlier Markdown file has a violation", () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "bad.md"), "# Same\n\n# Same\n");
    writeFileSync(join(dir, "good.md"), "# Title\n");
    try {
      const result = run(["lint:markdown", `${relativeDir}/bad.md`, `${relativeDir}/good.md`]);
      assert.notEqual(result.status, 0);
      assert.match(output(result), /MD024/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails when a non-Markdown path follows a violation", () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "bad.md"), "# Same\n\n# Same\n");
    writeFileSync(join(dir, "note.js"), "const value = 1;\n");
    try {
      const result = run(["lint:markdown", `${relativeDir}/bad.md`, `${relativeDir}/note.js`]);
      assert.notEqual(result.status, 0);
      assert.match(output(result), /MD024/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("skips a non-Markdown path", () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "note.js"), "const value = 1;\n");
    try {
      const result = run(["lint:markdown", `${relativeDir}/note.js`]);
      assert.equal(result.status, 0);
      assert.equal(output(result), "");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
