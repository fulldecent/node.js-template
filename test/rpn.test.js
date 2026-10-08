import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

import { rpn } from "../src/index.js";

const cli = fileURLToPath(new URL("../src/cli.js", import.meta.url));

function runCli(args) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });
}

describe("rpn", () => {
  it("returns a single number", () => {
    assert.equal(rpn("42"), 42);
  });

  it("adds", () => {
    assert.equal(rpn("3 4 +"), 7);
  });

  it("subtracts", () => {
    assert.equal(rpn("10 3 -"), 7);
  });

  it("chains add and subtract", () => {
    assert.equal(rpn("5 1 2 + -"), 2);
  });

  it("throws on the wrong characters", () => {
    assert.throws(() => rpn("3 4 *"), { message: /digits, spaces, \+ and -/ });
  });

  it("throws on an empty string", () => {
    assert.throws(() => rpn(""), { message: /empty/ });
  });

  it("throws when an operator lacks operands", () => {
    assert.throws(() => rpn("1 +"), { message: /not enough operands/ });
  });

  it("throws when the stack does not reduce to one number", () => {
    assert.throws(() => rpn("1 2"), { message: /one number/ });
  });
});

describe("cli", () => {
  it("prints the result", () => {
    const result = runCli(["3", "4", "+"]);
    assert.equal(result.status, 0);
    assert.equal(result.stdout, "7\n");
    assert.equal(result.stderr, "");
  });

  it("prints an error and exits 1 on bad input", () => {
    const result = runCli(["3", "4", "*"]);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /digits, spaces, \+ and -/);
  });
});
