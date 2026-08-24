# yarn-template

An opinionated starting point for every project built with Yarn.

## How to use this

1. Install Node.js 24 with [fnm](https://github.com/Schniz/fnm):

   ```sh
   fnm install
   fnm use
   ```

2. Install project dependencies:

   ```sh
   yarn
   ```

3. Run tests:

   ```sh
   yarn test
   ```

## What this template includes

- `package.json` with a minimal `test` script (`true`)
- No dependencies and no application code
- GitHub Actions workflow that runs tests and verifies Yarn v4 in CI
- Node version pinned with [`.node-version`](.node-version)

## References

- Yarn docs: <https://yarnpkg.com/>
- Corepack docs: <https://nodejs.org/api/corepack.html>
- setup-node action: <https://github.com/actions/setup-node>
