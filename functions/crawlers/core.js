const Crawler = require('crawler');
const _ = require('lodash');
const axios = require('axios');
const db = require('../db.js');



const callbackCrawler = (callback) => (
  new Crawler({
    maxConnections: 2,
    rateLimit: 500,
    callback: (err, response, done) => {
      if (err) {
        console.log(err);
      } else {
        callback(response);
      }
      done();
    }
  })
);

const crawlAndDo = function(url, callback) {
  callbackCrawler(callback).queue(url);
}

const getJsonDataAndDo = function(url) {
  return axios.get(url)
    .catch(console.log)
    .then((response) => response.data); // only get .data from the response
}

function handleError(path, obj) {
  const errorId = _.kebabCase(path);
  db.collection(`errors`).doc(errorId).set(obj);
  console.log(`${path} - ${obj.errorType}`)
}

const scrapeAndUpdate = function(path, dbCollection, scraper) {
  const url = `https://fireemblem.gamepress.gg${path}`;
  crawlAndDo(url, (scrape) => {
    try {
      const data = scraper(scrape.$);
      let cleanedData = _.mapValues(data, _.trim);
      const id = cleanedData.id;
      cleanedData.url = url;
      const doc = db.collection(dbCollection).doc(id);
      doc.set(cleanedData)
        .then(function(){
          console.log(`${path} - updated`)
        })
        .catch(function(err) {
          handleError(path, {url: url, errorMessage: err.toString(), errorType: "dbError"});
        });
    } catch(err) {
      handleError(path, {url: url, errorMessage: err.toString(), errorType: "parseError"});
    }
  });
}

module.exports = {
  crawlAndDo: crawlAndDo,
  getJsonDataAndDo: getJsonDataAndDo,
  scrapeAndUpdate: scrapeAndUpdate
}