import Crawler from 'crawler';
import _ from 'lodash';
import firebase from 'firebase';
import 'firebase/functions';
import config from '../config.js'
import axios from 'axios';

firebase.initializeApp()

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
    //db.collection(dbPath).doc(id).set(cleanedData);
  });
}