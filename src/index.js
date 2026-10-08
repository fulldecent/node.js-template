const TOKEN = /^(?:\d+|[+-])$/;

export function rpn(input) {
  if (typeof input !== "string") {
    throw new Error("input must be a string of digits, spaces, + and -");
  }

  if (/[^\d +\-]/.test(input)) {
    throw new Error("input must be a string of digits, spaces, + and -");
  }

  const tokens = input.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    throw new Error("input is empty");
  }

  const stack = [];

  for (const token of tokens) {
    if (!TOKEN.test(token)) {
      throw new Error(`invalid token: ${token}`);
    }

    if (token === "+" || token === "-") {
      if (stack.length < 2) {
        throw new Error("not enough operands");
      }
      const right = stack.pop();
      const left = stack.pop();
      stack.push(token === "+" ? left + right : left - right);
      continue;
    }

    stack.push(Number(token));
  }

  if (stack.length !== 1) {
    throw new Error("expression does not reduce to one number");
  }

  return stack[0];
}
