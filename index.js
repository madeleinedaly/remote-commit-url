#!/usr/bin/env node
'use strict';
const util = require('util');
const gitUrlParse = require('git-url-parse');
const gitconfig = util.promisify(require('gitconfiglocal'));

module.exports = async ({commit, remote, cwd, gitDir}) => {
  const config = await gitconfig(cwd, {gitDir});

  if (!(remote in config.remote)) {
    throw new Error(`remote "${remote}" not found in ${cwd}/${gitDir}/config`);
  }

  const {source, owner, name} = gitUrlParse(config.remote[remote].url);

  const route = `commit${source === 'bitbucket.org' ? 's' : ''}`;
  return `https://${source}/${owner}/${name}/${route}/${commit}`;
};
