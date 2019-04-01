import Crawler from './crawler';

function coreCrawler(callback) {
  return new Crawler({
    maxConnections: 2,
    rateLimit: 5000,
    callback: (err, {$}, done) => {
      if (err) {
        console.log(err);
      } else {
        callback($);
      }
      done();
    }
  });
}

export let heroPageCrawler = new coreCrawler(($) => {
  
});