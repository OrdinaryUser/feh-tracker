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
    name: $('.page-title .field--name-title').text(),
    title: $('#hero-details-table .field--name-title+span').text().replace(" - ", ""),
    tier: $('.tipso-tier').attr('title').replace('Tier ', ''),
    moveType: $('.field--name-field-movement .field--name-name').text(),

    color,
    weaponType,
    
    /*
		$heroWeaponType = explode(' ', $html->find('.field--name-field-attribute div h2 a div.field--name-name', 0)->innertext)[1];
		$heroLegendary = get_string_between($html->find('.tipso-legendary noscript img', 0)->src, 'Legendary_Effect_', '.png');
		$heroDefaultImg = $siteUrl . get_string_between($html->find('#tab-1-img img', 0)->onclick, "imageClicked('", "')");
		$heroAttackImg = $siteUrl . get_string_between($html->find('#tab-2-img img', 0)->onclick, "imageClicked('", "')");
		$heroSpecialImg = $siteUrl . get_string_between($html->find('#tab-3-img img', 0)->onclick, "imageClicked('", "')");
		$heroInjuredImg = $siteUrl . get_string_between($html->find('#tab-4-img img', 0)->onclick, "imageClicked('", "')");
  */
  };
});

fetchJsonAndDo('https://gamepress.gg/sites/default/files/aggregatedjson/hero-list-FEH.json', (data) => {
  const paths = _.map(data, ({title}) => cheerioParse(title).attr('href'));
  console.log(`Queueing to crawl ${paths.length+1} heroes`);
  _.each(paths, (path) => {
    heroPageCrawler.queue(`https://fireemblem.gamepress.gg${path}`);
  });
});


