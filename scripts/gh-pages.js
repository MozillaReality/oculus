#!/usr/bin/env node

/**
 * Fancy script to deploy to GitHub Pages
 * ======================================
 *
 * Sample usage
 * ------------
 *
 * % node ./scripts/gh-pages
 * gh-pages -d dist -r git@github.com:cvan/webvr-oculus.git
 *
 * % node ./scripts/gh-pages luigi
 * gh-pages -d dist -r git@github.com:luigi/webvr-oculus.git
 *
 * % node ./scripts/gh-pages git@github.com:wario/webvr-oculus.git
 * gh-pages -d dist -r git@github.com:wario/webvr-oculus.git
 *
 */

var spawn = require('child_process').spawn;

var ghpages = require('gh-pages');
var path = require('path');

var settings = {
  directory: '_prod',
  repo: {
    username: 'cvan',
    name: 'webvr-oculus'
  }
};

var arg = process.argv[2];
if (arg) {
  if (arg.indexOf(':') === -1) {
    settings.repo.username = arg;
  } else {
    settings.repo.url = arg;
    var usernameMatches = arg.match(':(.+)/');
    if (usernameMatches) {
      settings.repo.username = usernameMatches[1];
    }
  }
}

if (!settings.repo.url) {
  settings.repo.url = 'git@github.com:' + settings.repo.username + '/' +
                      settings.repo.name + '.git';
}

settings.repo.ghPagesUrl = 'https://' + settings.repo.username +
                           '.github.io/' + settings.repo.name + '/';

console.log('Publishing to', settings.repo.url);

function getCacheDir (repoUsername, repoName) {
  repoUsername = (repoUsername || '').toLowerCase().trim();
  repoName = (repoName || '').toLowerCase().trim();
  var pathAbsolute = path.resolve(
    __dirname,
    '..',
    '.cache', 'gh-pages', repoUsername, repoName
  );
  return path.relative(process.cwd(), pathAbsolute);
}

// Publish to GitHub Pages from `prod/` directory.
ghpages.publish(path.join(process.cwd(), settings.directory), {
  repo: settings.repo.url,
  dotfiles: true,
  logger: console.log.bind(console)
}, function () {
  console.log('Published');
  console.log(settings.repo.ghPagesUrl);
  spawn('open', [settings.repo.ghPagesUrl]);
});
