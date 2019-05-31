const _ = require('lodash');
const getHeroPaths = require('./crawlers/getHeroPaths.js');
const updateHero = require('./crawlers/updateHero.js');

process.env.FIREBASE_CONFIG = require('../src/config.js');

getHeroPaths()
  .then((paths)=>{
    console.log(`${paths.length} paths found... updating now.`)
    _.each(paths, (path)=>{
      updateHero(path);
    })
  });
