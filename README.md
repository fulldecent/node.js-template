# Simple RPN calculator

> [!TIP]
> This template is a starting point you can use for every Node.js project. We offer:
>
> - Clear structure and a small working example
> - Node.js and Yarn versions pinned for local development and CI
> - Tests and formatting in continuous integration
> - Automated releases with [Release Please](.github/workflows/release.yml) and SLSA provenance attestation
>
> What is in-scope for this template?
>
> We the people who manage Node.js projects, in order to advocate for a safer installation path and great defaults for Node.js, maintain this starting point for all projects.
>
> This node.js-template must remain broad—addressing the needs of many kinds of projects. Every project deserves a README, and a clear rule on basic formatting questions, this is why we include continuous integration linting.
>
> We do not specify that GitHub and GitHub Actions are the only way to host projects, others may consider our GitHub-specific notes as a starting point guide for implementing outside of GitHub.
>
> And now below is the template, shown for a specific hypothetical project, enjoy!

[![Build and test](https://github.com/fulldecent/node.js-template/actions/workflows/build-test.yml/badge.svg?branch=main)](https://github.com/fulldecent/node.js-template/actions/workflows/build-test.yml) [![Lint](https://github.com/fulldecent/node.js-template/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/fulldecent/node.js-template/actions/workflows/lint.yml)

Add and subtract, in reverse Polish notation.

Simple RPN calculator reads a string of digits, spaces, `+` and `-`. It returns the resulting number. Wrong input throws an error.

```console
$ rpn 3 4 +
7

$ rpn 5 1 2 + -
2
```

> [!NOTE]
> Replace the project name, description, demonstration and badge URLs with your own. Show what your project does before asking people to read further.

## Installation

You will need Git, Node.js at the version in [.node-version](.node-version), and Yarn (via Corepack).

> [!WARNING]
> fnm is a Node.js version manager, which installs `node` at the version we specify in [.node-version](.node-version). We recommend to install fnm using your package manager as this is safer than the advice on the fnm and nvm websites ([ref](#references)).

If you do not use a version manager and instead modify the commands below to use a copy of Node.js from your operating system, this may use your package manager's (possibly ancient) version. That build may fail and will be unsupported by this project.

```sh
node --version
corepack --version
```

Open a terminal (PowerShell on Windows) and use the instructions for your operating system.

### Linux

On Ubuntu 22.04+ or Debian 12+:

```sh
sudo apt update
sudo apt install git
```

On Fedora:

```sh
sudo dnf install git
```

If your distribution has no `fnm` package, [other fnm installation methods](https://github.com/Schniz/fnm) are available, but beware as that page does also recommend some dangerous methods ([ref](#references)).

### macOS

Install Apple's Command Line Tools if they are not already installed:

```sh
xcode-select --install
```

Complete the installation dialog. With Homebrew installed, install Git and fnm:

```sh
brew install git fnm
```

Homebrew's `node` formula is a standalone runtime. It does not honor [.node-version](.node-version). Use `fnm` instead.

### Windows

Use winget to install Git and fnm:

```powershell
winget install --exact --id Git.Git
winget install --exact --id Schniz.fnm
```

Allow administrator prompts and wait for installation to finish. Open a new PowerShell window so fnm is on `PATH`.

### Build and install

Clone the project and install dependencies. From this directory, fnm installs the Node.js version in [.node-version](.node-version) on first use. CI uses the same file. Corepack installs the Yarn version pinned by `packageManager` in [package.json](package.json).

```sh
git clone https://github.com/fulldecent/node.js-template.git
cd node.js-template
eval "$(fnm env)"
fnm install
fnm use
corepack enable
node --version
yarn --version
yarn install --immutable
```

In PowerShell:

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm install
fnm use
corepack enable
node --version
yarn --version
yarn install --immutable
```

Run the command without a global install:

```sh
yarn node src/cli.js 3 4 +
yarn node src/cli.js 5 1 2 + -
```

> [!NOTE]
> Explain what your users need to install, including the tools your project is built on. Replace the repository URL and command name with your own.

## Usage

Evaluate an expression. Tokens are non-negative integers, `+` and `-`. Operators take the two values on the top of the stack, with the right-hand operand popped last.

```sh
yarn node src/cli.js 3 4 +
yarn node src/cli.js 10 3 -
yarn node src/cli.js 5 1 2 + -
```

From another ES module in this project:

```js
import { rpn } from "./src/index.js";

rpn("3 4 +"); // 7
```

The command joins its arguments with spaces. Input that uses any other character, that is empty, that leaves the stack short for an operator, or that does not reduce to one number, throws an error. The command writes that error to standard error and exits with status 1.

> [!NOTE]
> Explain how to use your project, including the limits that matter to users.

## Development

Thank you for taking an interest in improving Simple RPN calculator and the programs of people using it!

Follow the installation instructions above to get Git, fnm, Node.js and Yarn. Work from the project directory. The implementation is in [src/index.js](src/index.js) and [src/cli.js](src/cli.js); you can run it without a global install:

```sh
yarn node src/cli.js 3 4 +
```

Commit [yarn.lock](yarn.lock) so application dependencies remain reproducible.

### Testing

All project updates that we release must conform to our test suite. GitHub Actions runs [checks](./.github/workflows) on pushes to `main` and pull requests. You can also run them locally before sending proposed changes:

```sh
yarn test
yarn format
```

The tests in [test/rpn.test.js](test/rpn.test.js) check addition, subtraction, chained operators, invalid input and the command-line program. They check the exit status, standard output and standard error of the actual program.

With an actively maintained version of Node.js installed, correct other formatting issues before sending proposed changes:

```sh
npx prettier@latest --check . --write
npx markdownlint-cli@latest "**/*.md" --fix
```

Yarn puts install outputs in the ignored `node_modules/` directory. Packed releases go in the ignored `dist/` directory.

### Releases

Use `fix:`, `feat:` or `BREAKING CHANGE:` in your commit messages. This triggers our bot to make a release draft pull request. Merging that pull request triggers a new tag and GitHub Release.

The [release workflow](.github/workflows/release.yml) uses Release Please's `simple` release type. Set the version in [package.json](package.json) to the proposed release version before merging the release pull request.

[Build and test](.github/workflows/build-test.yml) installs dependencies, runs tests, packs a tarball, then attests and uploads it. The release includes `simple-rpn-calculator.tgz` and `release.sigstore.jsonl`, containing build provenance and version attestations.

> [!NOTE]
> In your GitHub repository settings, under Actions, General, Workflow permissions, select read and write permissions and check "Allow GitHub Actions to create and approve pull requests". Under General, Releases, enable release immutability. Attestations are available for public repositories; private repositories require GitHub Enterprise Cloud.

### Maintenance

The project administrator completes these maintenance tasks each month. If they are 3+ months late, please remind them or send your own issue/pull request.

1. Identify external Actions in [.github/workflows](.github/workflows) and look for available new versions. Review and update them if it is safe. GitHub-supported Actions (under the actions/ organization) may require only cursory review.
1. Review the Node.js version in [.node-version](.node-version). Update it when a newer version is appropriate. `fnm install` reads that file.
1. Review the Yarn version in `package.json` (`packageManager`). Update it with `yarn set version stable && yarn` when a newer stable version is appropriate.
1. Review direct dependencies with `yarn upgrade-interactive`.

## Project scope

We are people who write Node.js modules and command-line tools. Sometimes we need a tiny, dependency-free starting point with pinned tooling and a test that actually runs the program.

Simple RPN calculator does that one job: evaluate reverse Polish notation with add and subtract, and reject input that is not digits, spaces, `+` and `-`. It keeps the package empty of runtime dependencies.

We specifically will not add multiply, divide, parentheses, decimal numbers or a graphical interface.

> [!NOTE]
> Introduce your community, explain what is in scope and say what is out of scope. Help people recognize when their own work belongs here.

## References

1. We use title case only for proper nouns, including the name of our project.
1. We recommend to use your package manager to install fnm because the fnm and nvm websites prefer the unsafe `curl|sh` method ([fnm issue](https://github.com/Schniz/fnm/issues/1588)).
1. This project is built based on [best practices documented in node.js-template](https://github.com/fulldecent/node.js-template/), version 1.0.0.
1. The Node.js ignore rules in [.gitignore](.gitignore) come from [GitHub's Node gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore).
1. `.yarnrc.yml` sets `enableScripts` to true (Yarn 4.14 defaults to false) and `npmMinimalAgeGate` to 0 (Yarn 4.12 defaults to one day). `approvedGitRepositories` is `"**"`, which approves every git dependency. [Yarn: Security](https://yarnpkg.com/features/security)
1. This project is released under the [MIT license](LICENSE.md).

> [!NOTE]
> Carefully consider which license to apply to your project and replace the copyright line in [LICENSE.md](LICENSE.md). Cite external sources that materially informed your decisions, including the release of this Node.js template you used.
