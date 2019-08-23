'use strict';
const util = require('util');
const template = require('lodash.template');
const gitUrlParse = require('git-url-parse');
const templateSettings = require('lodash.templatesettings');
const gitconfig = util.promisify(require('gitconfiglocal'));

templateSettings.interpolate = /{([\s\S]+?)}/g;

module.exports = async ({commit, remote, cwd, gitDir, debug}) => {
  const config = await gitconfig(cwd, {gitDir});

  if (debug) {
    console.log(config);
  }

  if (!config.remote) {
    throw new Error(`No remotes found in ${cwd}/${gitDir}/config`);
  }

  if (!config.remote[remote]) {
    throw new Error(`Remote "${remote}" not found in ${cwd}/${gitDir}/config`);
  }

  const urlInfo = gitUrlParse(config.remote[remote].url);

  if (debug) {
    console.log(urlInfo);
  }

  const {source, owner, name} = urlInfo;
  const templates = require('./templates.json');

  if (!templates[source]) {
    throw new Error(`Service "${source}" is not supported`);
  }

  const interpolate = template(templates[source]);
  return interpolate({source, owner, name, commit});
};
