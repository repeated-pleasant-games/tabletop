# Contributor's Guide

## Getting Started

 1. Install project dependencies with `npm` or `yarn`:

    NPM:
    ```shell
    $ npm install
    ```

    Yarn:
    ```shell
    $ yarn install
    ```
    
    This command will install all the dependencies required for development, and
    install commit hooks via `husky`.
    
 1. Run the development server with `npm run develop` or `yarn develop`.

    This command will run the `vite` development server, which will by default
    serve the app on `http://localhost:3000`. If port 3000 is unavailable,
    `vite` serves on port 3001. If that port is unreachable, it continues
    incrementing the port number and checking if it is available until it finds
    an open port.

## Committing, Pushing, and Merging

### Commit Style

I use the Conventional Commit style for my commits to this repository, enforced
by `commitlint` and a commit-message hook installed by `husky` during dependency
setup. I also run `commitlint` on push via GitHub Actions, which will check
if the pushed commits are in line with the Conventional Commit style.

> ***Note:*** Submitting commits that do not fit the Conventional Commit style
> does not preclude them from being merged.

The Conventional Commit style follows this template:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Where:
 *  `<type>` is one of: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`,
    `refactor`, `revert`, `style`, `test`.
 *  `[optional scope]` is a feature name surrounded in parenthesis. (i.e.
    `(table)`).
 *  `<description>` is a statement of what the commit does.
     *  It _must_ be imperative, present tense (i.e., "change" instead of
        "changed" or "changes").
     *  Does not have a capitalized first word (i.e., "hello, World!" instead of
        "Hello, World!").
     *  Does not have a period/dot ('.') at the end.
 *  `[optional body]` uses imperative, present tense like `<description>`, and it
    should include the motivation for the change and contrast this with previous
    behavior. A blank line must precede the body.
 *  `[optional footer]` contains information about breaking changes and is the
    place to reference GitHub issues and pull requests. If reporting breaking
    changes, `BREAKING CHANGE:` must precede the description of these changes.

### Pushing Changes and Patches

You cannot push to the `master`, `alpha`, and `staging` branches unless the
current head has passed all unit tests and linting checks. This policy prevents
errant pushes that trigger a release. Instead of working directly on `master`,
`alpha`, or `staging`, create a new branch for your work and push it to the
repository.  If you do not have push access, fork the repository and push your
changes there.

The recommended naming convention for branches is `<type>/<short description>`.
`<type>` is any of: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`,
`refactor`, `revert`, `style`, `test`, or `pr`. `<short description>` is a quick
name for the patch or fix. If fixing an issue, the description can be
`issue-<issue number>`.

### Merging Changes and Patches