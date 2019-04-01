import Crawler from './crawler';
import db from './db.js'

function coreCrawler(path, callback) {
  return new Crawler({
    maxConnections: 2,
    rateLimit: 5000,
    callback: (err, {$}, done) => {
      if (err) {
        console.log(err);
      } else {
        const data = callback($);
        db.collection(path).set(data);
      }
      done();
    }
  });
}

export let heroPageCrawler = new coreCrawler('heroes', ($) => {
  return {
  }
});