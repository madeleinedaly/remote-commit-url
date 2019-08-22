'use strict';
const meow = require('meow');
const path = require('path');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const gitconfig = util.promisify(require('gitconfiglocal'));
const parseGitUrl = require('git-url-parse');
const sha1Regex = require('sha1-regex');
const pkg = require('./package.json');

const defaults = {
  ref: 'HEAD',
  remote: 'origin',
  cwd: process.cwd(),
  gitDir: process.env.GIT_DIR || '.git',
};

const options = {
  help: `
Usage:
  $ remote-commit-url [<ref>] [<remote>] [--cwd <dir> --git-dir <dir>]

Arguments:
  ref           Git ref (SHA1 hash, branch name, tag, etc.)
  remote        Name of git remote [default: origin]

Options:
  --cwd         Path to git repository [default: .]
  --git-dir     $GIT_DIR [default: $GIT_DIR or .git]`,
  flags: {
    cwd: {type: 'string', default: defaults.cwd},
    gitDir: {type: 'string', default: defaults.gitDir},
  },
};

const refTypes = {
  SHA1: 'sha1',
  BRANCH: 'branch',
  TAG: 'tag,'
};

const getRefType = async ref => {
  const {stdout} = await execFile('git', ['tag', 'ls']);

  if (!stdout) {
    return [];
  }

  return stdout.split('\n');
};

(async cli => {
  if (cli.flags.h || !cli.input.length) {
    cli.showHelp(0);
  }

  let [ref, remote] = cli.input;
  if (!remote) {
    remote = 'origin';
  }

  const {gitDir} = cli.flags;
  const cwd = cli.flags.cwd === defaults.cwd
    ? defaults.cwd
    : path.resolve(defaults.cwd, cli.flags.cwd);

  const config = await gitconfig(cwd);
  if (!remote in config.remote) {
    throw new Error(`remote ${remote} not found in gitconfig for ${cwd}`);
  }

  const urlInfo = parseGitUrl(config.remote[remote].url);
  console.log(urlInfo);
  // console.log(getRefType(ref));
})(meow(options));
