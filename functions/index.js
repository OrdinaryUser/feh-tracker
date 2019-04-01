const functions = require('firebase-functions');

import {heroPageCrawler} from './crawl';

exports.crawlHeroes = functions.https.onRequest((request, response) => {
  response.send("Crawling Heroes...");
});
