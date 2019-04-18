const functions = require('firebase-functions');
const _ = require('lodash');

const crawlers = require('./crawlers');
const triggers = require('./triggers');

exports.updateAllHeroes = functions.https.onRequest((request, response) => {
  crawlers.getHeroPaths()
    .then((paths)=>{
      response.send(`Updating ${paths.length} Heroes... This should take about 5 minutes.`);
      _.each(paths, triggers.triggerUpdateHero);
    });
});

exports.updateHero = functions.https.onRequest((request, response) => {
  const {path} = request.params;
  response.send(`Crawling Hero: ${path}`);
  crawlers.updateHero.queue(path);
});