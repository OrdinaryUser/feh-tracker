const core = require('./core');
const _ = require('lodash');

const scraper = ($) => {
  const colorWepTypeArr = _.last($('.field--name-field-attribute > .taxonomy-term').attr('about').split('/')).split('-');
  const color = colorWepTypeArr[0];
  const weaponType = colorWepTypeArr[1];

  let title = $('#hero-details-table .field--name-title+span').text();
  title = _.isEmpty(title) ? false : title.replace(" - ", "")

  let tier = $('.tipso-tier').attr('title');
  tier = _.isEmpty(tier) ? false : tier.replace('Tier ', '');

  // TODO: Get specific boost stats (should be in the same element)
  let isLegendary = $('.tipso-legendary').attr('title');
  isLegendary = _.isEmpty(title) ? false : title.match(/^[a-zA-Z]{1,}/gm)

  function getImage(n) {
    let imageOnclick = $(`#tab-${n}-img .modal-img-target`).attr('onclick');
    if (_.isEmpty(imageOnclick)) return false;
    let imageUrl = imageOnclick.replace("imageClicked('", "").replace("')", "");
    return 'https://fireemblem.gamepress.gg' + imageUrl;
  }

  return {
    id: _.last($('link[rel=canonical]').attr('href').split('/')),
    name: $('#page-title h1').text(),
    title: title,
    tier: tier,
    moveType: $('.field--name-field-movement .field--name-name').text(),
    color,
    weaponType,
    heroLegendary: isLegendary, 
    heroDefaultImg: getImage(1),
    heroAttackImg: getImage(2),
    heroSpecialImg: getImage(3),
    heroInjuredImg: getImage(4),
  };
}

const updateHero = (path) => {
  core.scrapeAndUpdate(
    path,
    'heroes',
    scraper
  )
}

module.exports = updateHero;
