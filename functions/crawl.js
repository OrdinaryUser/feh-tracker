import {getDataAndDo, updateIdWithScrape} from './crawlers/core';
import lodash;
import cheerio from 'cheerio';

const $ = cheerio.load;

const heroPageCrawler = new updateIdWithScrape('heroes', ($) => {
  return {}
});

getDataAndDo('https://gamepress.gg/sites/default/files/aggregatedjson/hero-list-FEH.json', (data) => {
  const ids = _.map(data, ({title})=>$(title).href);
  console.log(ids);
  /*
  _.each(ids, (titleHtml) => {
    heroPageCrawler.queue(`https://fireemblem.gamepress.gg/hero/${id}`);
  });
  */
});


