# Node.js template

[![test](https://github.com/fulldecent/node.js-template/actions/workflows/test.yml/badge.svg)](https://github.com/fulldecent/node.js-template/actions/workflows/test.yml)

Use this template as a starting point for any Node.js project to follow best practices.

## Features

Your new Node.js project will immediately implement these best practices:

1. Testing as a standard
2. Turnkey access to GitHub Actions
3. Node version pinned with [`.node-version`](.node-version)
4. Installation instructions for all build tools

## How to use this

1. Install the latest Node.js LTS with [fnm](https://github.com/Schniz/fnm):

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

## Maintenance: updating dependencies

Do this every month or so and please send a PR here if you see updates available:

```sh
yarn set version latest && yarn # Send PR
yarn upgrade-interactive # Send PR
```

Review [GitHub Action workflows](./.github/workflows) and upgrade any actions if appropriate.

## References

1. This website is built based on [best practices documented for Node.js projects](https://github.com/fulldecent/node.js-template).
2. We would prefer if fnm supported build attestations since it is installed as a binary ([issue #1588](https://github.com/Schniz/fnm/issues/1588)).
