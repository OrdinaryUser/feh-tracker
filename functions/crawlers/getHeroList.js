import cheerio from 'cheerio';
import _ from 'lodash';
import axios from 'axios';

const cheerioParse = (str) => cheerio.load(str)('body > *');

export async function getHeroList() {
  const response = await axios.get('https://gamepress.gg/sites/default/files/aggregatedjson/hero-list-FEH.json');
  const {data} = response;
  let paths = _.map(data, ({title}) => cheerioParse(title).attr('href'));
  paths = _.difference(paths, [
    "/hero/green-bow",
    "/hero/lance-knight",
    "/hero/red-flier",
  ]);
  return paths;
}