import _ from 'lodash';

import {getHeroPaths, updateHero} from './crawlers';

getHeroPaths()
  .then((paths)=>{
    console.log(`Crawling ${paths.length} Heroes...`);
    _.each(paths, updateHero);
  });