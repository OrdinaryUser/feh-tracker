const Crawler = require('crawler');
const _ = require('lodash');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const callbackCrawler = (callback) => (
  new Crawler({
    maxConnections: 2,
    rateLimit: 500,
    callback: (err, response, done) => {
      if (err) {
        console.log(err);
      } else {
        callback(response);
      }
      done();
    }
  })
);

const crawlAndDo = function(url, callback) {
  callbackCrawler(callback).queue(url);
}

const getJsonDataAndDo = function(url) {
  return axios.get(url)
    .catch(console.log)
    .then((response) => response.data); // only get .data from the response
}

const scrapeAndUpdate = function(url, dbCollection, scraper) {
  crawlAndDo(url, (scrape) => {
    const data = scraper(scrape.$);
    const cleanedData = _.mapValues(data, _.trim);
    const id = cleanedData.id;
    console.log(`writing to ${dbCollection}/${id}:`);
    console.log(JSON.stringify(cleanedData, null, 2));
    db.collection(dbCollection).doc(id).set(cleanedData);
  });
}

module.exports = {
  crawlAndDo: crawlAndDo,
  getJsonDataAndDo: getJsonDataAndDo,
  scrapeAndUpdate: scrapeAndUpdate
}