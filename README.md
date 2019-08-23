# remote-commit-url

Generate a URL for viewing a commit in the browser.

## Usage

### CLI

``` shell
npm install -g remote-commit-url
```

``` shell
remote-commit-url [options]
```

#### Options

``` shell
--commit      Git commit ref [default: HEAD]
--remote      Git remote [default: origin]
--cwd         Path to git repository [default: .]
--git-dir     Path to git directory [default: $GIT_DIR or .git]
```

### API

``` shell
npm i remote-commit-url
```

``` jsx
const remoteCommitUrl = require('remote-commit-url');

const commit = 'HEAD';
const remote = 'origin';
const cwd = '~/Code/dotfiles';

(async () => {
  const url = await remoteCommitUrl({commit, remote, cwd});
  console.log(url); // => 'https://github.com/madeleinedaly/dotfiles/commit/HEAD'
})();
```

## Requirements

Node >= 8

## Supported platforms
* BitBucket
* GitHub
* GitLab

## Contributing

Feel free to [open a PR](https://github.com/madeleinedaly/remote-commit-url/compare) to add support for additional platforms.

## License

MIT
