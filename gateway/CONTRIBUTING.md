# How to contribute

BharatHealthStack loves to welcome your contributions. There are several ways to help out:
* Create an [issue](https://github.com/bharathealthstack/healthgateway) on GitHub, if you have found a bug
* Write test cases for open bug issues
* Write patches for open bug/feature issues, preferably with test cases included
* Contribute to the [documentation](https://app.swaggerhub.com/apis/raghava-mfine/healthgateway/1.0.0)

There are a few guidelines that we need contributors to follow so that we have a
chance of keeping on top of things.

## Code of Conduct

Help us keep CakePHP open and inclusive. Please read and follow our [Code of Conduct](https://github.com/bharathealthstack/healthgateway/blob/master/CODE_OF_CONDUCT.md).

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free).
* Submit an [issue](https://github.com/bharathealthstack/healthgateway), assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.
* Fork the repository on GitHub.

## Making Changes

* Create a topic branch from where you want to base your work.
  * This is usually the master branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on master; `git branch
    master/my_contribution master` then checkout the new branch with `git
    checkout master/my_contribution`. Better avoid working directly on the
    `master` branch, to avoid conflicts if you pull in updates from origin.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Use descriptive commit messages and reference the #issue number.
* Core test cases should continue to pass. You can run tests locally.

## Which branch to base the work

* Bugfix branches will be based on master.
* New features that are backwards compatible will be based on next minor release
  branch.
* New features or other non backwards compatible changes will go in the next major release branch.

## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the repository in the bharathealthstack organization, with the
  correct target branch.

## Test cases and codesniffer

## Reporting a Security Issue

If you've found a security related issue in bharathealthstack, please don't open an issue in GitHub. Instead contact us at shakir.khan@mfine.co.

# Additional Resources
