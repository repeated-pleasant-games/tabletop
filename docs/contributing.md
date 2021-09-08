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
     *  It _must_ be imperative, present tense (i.e. "change" instead of
        "changed" or "changes").
     *  Does not have a capitalized first word (i.e. "hello, World!" instead of
        "Hello, World!").
     *  Does not have a period/dot ('.') at the end.
 *  `[optional body]` use imperative, present tense