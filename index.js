#!/usr/bin/env node
'use strict';
const util = require('util');
const template = require('lodash.template');
const gitUrlParse = require('git-url-parse');
const templateSettings = require('lodash.templatesettings');
const gitconfig = util.promisify(require('gitconfiglocal'));

templateSettings.interpolate = /{([\s\S]+?)}/g;

module.exports = async ({commit, remote, cwd, gitDir}) => {
  const config = await gitconfig(cwd, {gitDir});

  if (!(remote in config.remote)) {
    throw new Error(`remote "${remote}" not found in ${cwd}/${gitDir}/config`);
  }

  const {source, owner, name} = gitUrlParse(config.remote[remote].url);
  const templates = require('./templates.json');

  if (!(source in templates)) {
    throw new Error(`service "${source}" is not supported`);
  }

  const interpolate = template(templates[source]);
  return interpolate({source, owner, name, commit});
};
