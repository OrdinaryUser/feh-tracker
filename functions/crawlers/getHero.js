import {updateIdWithScrape, firebaseFunctionTrigger} from './core';
import _ from 'lodash';

/*
 * getHero - a instance of Crawler
 * writes to db/heroes/:id
 * gets data from queued path
 */
export let updateHero = new updateIdWithScrape('heroes', ($) => {
  const [color, weaponType] = _.last($('.field--name-field-attribute > .taxonomy-term').attr('about').split('/')).split('-');
  return {
    id: _.last($('link[rel=canonical]').attr('href').split('/')),
    name: $('.page-title .field--name-title').text(),
    title: $('#hero-details-table .field--name-title+span').text().replace(" - ", ""),
    tier: ($('.tipso-tier') ? $('.tipso-tier').attr('title').replace('Tier ', '') : ""),
    moveType: $('.field--name-field-movement .field--name-name').text(),
    color,
    weaponType,
    heroLegendary: ($('.tipso-legendary').attr('title') ? $('.tipso-legendary').attr('title').match(/^[a-zA-Z]{1,}/gm) : ""), // TODO: Get specific boost stats (should be in the same element)
    heroDefaultImg: 'https://fireemblem.gamepress.gg' + $('#tab-1-img .modal-img-target').attr('onclick').replace("imageClicked('", "").replace("')", ""),
    heroAttackImg: 'https://fireemblem.gamepress.gg' + $('#tab-2-img .modal-img-target').attr('onclick').replace("imageClicked('", "").replace("')", ""),
    heroSpecialImg: 'https://fireemblem.gamepress.gg' + $('#tab-3-img .modal-img-target').attr('onclick').replace("imageClicked('", "").replace("')", ""),
    heroInjuredImg: 'https://fireemblem.gamepress.gg' + $('#tab-4-img .modal-img-target').attr('onclick').replace("imageClicked('", "").replace("')", "")
  };
});

export triggerHeroUpdate = new firebaseFunctionTrigger('')


