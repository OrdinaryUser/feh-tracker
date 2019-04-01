import {fetchJsonAndDo, updateIdWithScrape} from './crawlers/core';
import _ from 'lodash';

import cheerio from 'cheerio';
const cheerioParse = (str) => cheerio.load(str)('body > *');

/*
 * heroPageCrawler - a instance of Crawler
 * writes to db/heroes/:id
 * gets data from queued path
 */
const heroPageCrawler = new updateIdWithScrape('heroes', ($) => {
  const [color, weaponType] = _.last($('.field--name-field-attribute > .taxonomy-term').attr('about').split('/')).split('-');
  return {
    id: _.last($('link[rel=canonical]').attr('href').split('/')),
    color,
    weaponType,
    moveType: $('.field--name-field-movement .field--name-name').text(),
    name: $('.page-title .field--name-title').text(),
  };
});

fetchJsonAndDo('https://gamepress.gg/sites/default/files/aggregatedjson/hero-list-FEH.json', (data) => {
  const paths = _.map(data, ({title}) => cheerioParse(title).attr('href'));
  console.log(`Queueing to crawl ${paths.length+1} heroes`);
  _.each(paths, (path) => {
    heroPageCrawler.queue(`https://fireemblem.gamepress.gg${path}`);
  });
});


