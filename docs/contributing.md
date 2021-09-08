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

To merge your changes, you must submit a PR that targets `staging`. PRs that are
not version releases from `staging` to `alpha` or `master` will automatically be
closed. I will review Your PR will to ensure that the changes are in line with
the goals and design of the codebase.

Once I accept your change into `staging`, I will merge it into `alpha` or
`master` as part of the next release.

## Project Structure

I follow the Bulletproof React guidelines for structuring this project. This
means that the `src/` directory is laid out as:

```
src
|
+-- assets            # assets folder can contain all the static data such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration, env variables, etc. get exported from here and used in the app
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries pre-configured for the application
|
+-- providers         # all of the application providers
|
+-- routes            # routes configuration
|
+-- stores            # global state stores
|
+-- test              # test utilities and mock server
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

Every feature folder contains domain-specific code for a specific feature of the
application. This structure promotes the encapsulation of areas of concern and
makes the application easier to maintain.

Inside each feature folder is this structure:

```
src/features/awesome-feature
|
+-- api         # exported API request declarations and API hooks related to the feature
|
+-- components  # components scoped to the feature, not used anywhere else
|
+-- hooks       # hooks scoped to the feature, not used anywhere else
|
+-- routes      # route components for the given feature
|
+-- types       # typescript types for the given feature
|
+-- utils       # utility functions used only by the feature
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

When importing a feature, use the following module path: `@/feature/<feature
name>`.  This path will import the entry point of the feature and should be the
only method of including a part of a feature. Imports that reach inside a
feature, such as `@/feature/<feature name>/component/<component name>` are not
allowed.