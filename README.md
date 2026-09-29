# Node.js template

[![Lint](https://github.com/fulldecent/node.js-template/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/fulldecent/node.js-template/actions/workflows/lint.yml)
[![Test](https://github.com/fulldecent/node.js-template/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/fulldecent/node.js-template/actions/workflows/test.yml)

> [!TIP]
>
> To use this template with your own project:
>
> - Replace the above heading with your project name.
> - Update the status badge and all other mentions of "node.js-template" (except the references section) to instead point to your own repo.
> - Update the name and description in package.json. Remove `"private": true` if you publish the package.
> - Address and remove this and all other "TIP" items below.

## What this project does

This is an opinionated template for a Node.js module or application that provides:

- Development instructions which install the Node.js version pinned in [.node-version](.node-version) and the Yarn version pinned by `packageManager` in [package.json](package.json)
- [Continuous integration testing](.github/workflows/test.yml) with GitHub Actions.
- Modern development best practices: [.gitignore](.gitignore), [enforced formatting](.github/workflows/lint.yml)
- A minimal package to extend

The included package has no dependencies. Its test is `true`, so `yarn test` succeeds.

## Development

Clone the repo:

```sh
git clone https://github.com/fulldecent/node.js-template.git ~/Developer/fulldecent-node.js-template
cd ~/Developer/fulldecent-node.js-template
```

Use Node and yarn. The Node version is pinned in [.node-version](.node-version), and the Yarn version is pinned in [package.json](package.json). Quick start with [fnm](https://github.com/Schniz/fnm):

```sh
fnm install
fnm use
corepack enable
yarn install
yarn test
```

Format files the lint workflow checks:

```sh
yarn format
```

## Maintenance and dependency updates

Do this every month or so and please send a PR here if you see updates available:

1. Identify external Actions in [.github/workflows](./.github/workflows) scripts and look for available new versions. Review and then update to the new version if it is safe. GitHub-supported Actions (i.e. under the actions/ organization) may require only cursory review.
1. Review the Node.js version in `.node-version`. Update it when a newer version is appropriate. `fnm install` reads that file.
1. Review the Yarn version in `package.json` (`packageManager`). Update it with `yarn set version stable && yarn` when a newer stable version is appropriate. [Yarn's install instructions](https://yarnpkg.com/getting-started/install) document that command.
1. Review direct dependencies with `yarn upgrade-interactive`.

## References

1. We use title case for titles and proper nouns; not for headings and things. This includes our README above as well as our workflow rules and other configuration files. If you have a different policy, then please implement it throughout.
1. We use an MIT license for this template. You should carefully consider which license to apply to your own project.
1. We would prefer if fnm supported build attestations since it is installed as a binary ([issue #1588](https://github.com/Schniz/fnm/issues/1588)).
1. Node.js ignore rules are inlined from [Node.gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore).
1. `.yarnrc.yml` sets `enableScripts` to true (Yarn 4.14 defaults to false) and `npmMinimalAgeGate` to 0 (Yarn 4.12 defaults to one day). `approvedGitRepositories` is `"**"`, which approves every git dependency. [Yarn: Security](https://yarnpkg.com/features/security)
1. This project is built based on [best practices documented in node.js-template](https://github.com/fulldecent/node.js-template).
1. This project is built based on [best practices documented in project-template](https://github.com/fulldecent/project-template), release 1.0.0.
