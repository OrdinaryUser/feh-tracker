import Crawler from 'crawler';
import _ from 'lodash';
import firebase from 'firebase';
import 'firebase/functions';
import config from './config.js'

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

export function fetchJsonAndDo(url, callback) {
  callbackCrawler( ({body}) => callback(JSON.parse(body)))
    .queue(url);
}

export function updateIdWithScrape(dbPath, scrape) {
  return callbackCrawler(({$}) => {
    const data = scrape($);
    const cleanedData = _.mapValues(data, _.trim);
    const {id} = cleanedData;
    console.log(`writing to ${dbPath}/${id}:`);
    console.log(JSON.stringify(cleanedData, null, 2));
    //db.collection(dbPath).doc(id).set(cleanedData);
  });
}

const firebaseFunctionCrawler = new Crawler({
  maxConnections: 1,
  rateLimit: 1000,
})

export function firebaseFunctionTrigger(functionName, data={}) {
}
