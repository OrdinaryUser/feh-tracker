const Crawler = require('crawler');

const firebaseFunctionCrawler = new Crawler({
  maxConnections: 1,
  rateLimit: 1000,
})

function firebaseFunctionTrigger(functionName, data={}) {
  firebaseFunctionCrawler.queue(Object.assign(
    {uri:`https://us-central1-feh-tracker.cloudfunctions.net/${functionName}`},
    data
  ));
}

exports.triggerUpdateHero = (path) => firebaseFunctionTrigger('crawlHero', {path});