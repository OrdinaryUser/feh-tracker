const cheerio = require('cheerio');
const _ = require('lodash');
const { getJsonDataAndDo } = require('./core');

const cheerioParse = (str) => cheerio.load(str)('body > *');

exports.getHeroPaths = function() {
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