# remote-commit-url

Generate a URL for viewing a commit in the browser.

## Installation

``` shell
npm install -g remote-commit-url
```

## Usage

``` shell
remote-commit-url [options]
```

### Options

``` shell
--commit      Git commit ref [default: HEAD]
--remote      Git remote [default: origin]
--cwd         Path to git repository [default: .]
--git-dir     Path to git directory [default: $GIT_DIR or .git]
```

## Supported platforms
* BitBucket
* GitHub
* GitLab

## Contributing

Feel free to [open a PR](https://github.com/madeleinedaly/remote-commit-url/compare) to add support for additional platforms.

## License

MIT
