import Crawler from 'crawler';
import _ from 'lodash';
const admin = require('firebase-admin');
const functions = require('firebase-functions');
import axios from 'axios';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();\

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

export function crawlAndDo(url, callback) {
  callbackCrawler(callback).queue(url);
}

export function getJsonDataAndDo(url) {
  return axios.get(url)
    .catch(console.log)
    .then(({data}) => data); // only get .data from the response
}

export function scrapeAndUpdate({url, dbCollection, scraper}) {
  crawlAndDo(url, ({$}) => {
    const data = scraper($);
    const cleanedData = _.mapValues(data, _.trim);
    const {id} = cleanedData;
    console.log(`writing to ${dbCollection}/${id}:`);
    console.log(JSON.stringify(cleanedData, null, 2));
    db.collection(dbCollection).doc(id).set(cleanedData);
  });
}