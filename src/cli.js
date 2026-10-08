#!/usr/bin/env node

import { rpn } from "./index.js";

try {
  const input = process.argv.slice(2).join(" ");
  process.stdout.write(`${rpn(input)}\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
