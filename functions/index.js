const functions = require('firebase-functions');
const _ = require('lodash');

const {getHeroPaths, updateHero} = require('./crawlers');
const {triggerUpdateHero} = require('./triggers');

exports.updateAllHeroes = functions.https.onRequest((request, response) => {
  getHeroPaths()
    .then((paths)=>{
      response.send(`Updating ${paths.length} Heroes... This should take about 5 minutes.`);
      _.each(paths, triggerUpdateHero);
    });
});

exports.updateHero = functions.https.onRequest((request, response) => {
  const {path} = request.params;
  response.send(`Crawling Hero: ${path}`);
  updateHero.queue(path);
});