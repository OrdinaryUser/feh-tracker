import _ from 'lodash';

import {getHeroList, heroCrawler} from './crawlers';

const heroPaths = getHeroList();

console.log(heroPaths);

_.each(heroPaths, (path)=>{
  heroCrawler.queue(`https://fireemblem.gamepress.gg${path}`);
});