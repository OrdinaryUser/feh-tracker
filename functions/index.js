const functions = require('firebase-functions');
import _ from 'lodash';

import {getHeroList} from './crawlers';

exports.crawlHeroesList = functions.https.onRequest((request, response) => {
  response.send("Crawling Heroes List");
  const heroList = getHeroList();
  _.each(heroList, (path) => {
    heroPageCrawler.queue(`https://fireemblem.gamepress.gg${path}`);
  });
});

exports.crawlHero = functions.https.onRequest((request, response) => {
  const path = JSON.parse(request.body);
  console.log(path);
  response.send(`Crawling Hero: ${path}`);
  const hero = scrapeHero(path);
});