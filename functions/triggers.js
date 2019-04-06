import {firebaseFunctionTrigger} from './crawlers/core';

const firebaseFunctionCrawler = new Crawler({
  maxConnections: 1,
  rateLimit: 1000,
})

function firebaseFunctionTrigger(functionName, data={}) {
  firebaseFunctionCrawler.queue({
    uri:`https://feh-tracker.cloudfunctions.net/${functionName}`,
    ...data
  });
}

export const triggerUpdateHero = (path) => firebaseFunctionTrigger('crawlHero', {path});