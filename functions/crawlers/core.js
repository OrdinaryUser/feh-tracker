import Crawler from 'crawler';
import db from '../src/db.js'

const callbackCrawler = (callback) => (
  new Crawler({
    maxConnections: 2,
    rateLimit: 5000,
    callback: (err, response, done) => {
      if (err) {
        console.log(err);
      } else {
        callback(response);
      }
      done();
    }
  });
);

export function getDataAndDo(url, callback) {
  callbackCrawler(callback).queue(url);
}

export function updateIdWithScrape(dbPath, id, scrape) {
  return callbackCrawler(({$}) => {
    const data = scrape($);
    console.log(data);
    //db.collection(dbPath).doc(data.id).set(data);
  });
}
