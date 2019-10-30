# remote-commit-url

Generate a URL for viewing a commit in the browser.

## Usage

### CLI

#### Installation

``` shell
$ npm i -g remote-commit-url
```

#### Usage

``` shell
$ remote-commit-url [options]
```

##### Options

``` shell
--commit      Git commit ref [default: HEAD]
--remote      Git remote [default: origin]
--cwd         Path to git repository [default: .]
--git-dir     Path to git directory [default: $GIT_DIR or .git]
--debug       Whether to print debug info
```

### API

#### Installation

``` shell
$ npm i remote-commit-url
```

#### Usage

``` js
'use strict';
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
* Azure DevOps
* BitBucket
* GitHub
* GitLab
* RhodeCode

## License

MIT
