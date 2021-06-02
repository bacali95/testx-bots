const fs = require('fs');
const {keywords} = require('@nan-team/testx-utils');
const {testxLogger} = require('@nan-team/testx-utils/lib/utils/logger');

require('dotenv').config();

exports.config = {
  directConnect: true,
  specs: [],
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: false,
    maxInstances: 1,
    chromeOptions: {
      args: [
        'disable-dev-shm-usage',
        'no-sandbox',
        'window-size=1920,1080',
        'disable-gpu',
        'incognito',
        ...(Boolean(process.env.PRODUCTION ?? false) ? ['headless'] : []),
        'user-data-dir=./.protractor'
      ],
      prefs: {
        profile: {
          default_content_settings: {
            popups: 0
          }
        },
        download: {
          prompt_for_download: false,
          default_directory: `${process.cwd()}/tmp/'`,
          directory_upgrade: true
        }
      }
    }
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    silent: true,
    defaultTimeoutInterval: 30000000,
    includeStackTrace: false
  },
  baseUrl: '',
  onPrepare: () => {
    const testx = require('testx');

    testx.keywords.add(keywords);
    testxLogger(testx.events, true, true);
    testx.objects.add(require('@testx/objects-standard'));

    console.log("================= Loading Objects and Keywords =================\n")

    const objects = fs.readdirSync('./objects');
    objects.forEach((fileName) => {
      const prefix = fileName.replace('.js', '.');
      const object = require(`./objects/${fileName}`);
      testx.objects.add(object, prefix);
      console.log(`Object loaded from "${fileName}" with prefix "${prefix}"`);
    });

    const keywordsDir = fs.readdirSync('./keywords');
    keywordsDir.forEach((fileName) => {
      const keyword = require(`./keywords/${fileName}`);
      testx.keywords.add(keyword);
      console.log(`Keywords loaded from "${fileName}"`);
    });

    console.log("\n============================= Done =============================")

    browser.waitForAngularEnabled(false);
  }
};
