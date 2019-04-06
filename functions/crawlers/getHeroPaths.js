import cheerio from 'cheerio';
import _ from 'lodash';
import { getJsonDataAndDo } from './core';

const cheerioParse = (str) => cheerio.load(str)('body > *');

export function getHeroPaths() {
  return getJsonDataAndDo('https://gamepress.gg/sites/default/files/aggregatedjson/hero-list-FEH.json')
    .then((data) => {
      let paths = _.map(data, ({title}) => cheerioParse(title).attr('href'));
      paths = _.difference(paths, [
        "/hero/green-bow",
        "/hero/lance-knight",
        "/hero/red-flier",
      ]);
      return paths;
    });
}