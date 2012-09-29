
//
// Module Dependencies and Variables
var XML   = require('xml')
  , RSS   = {}
  , utils = require('./rss_utils');

/*
 * Module Constructor
 *
 * @param {Object} options
 * @param {Object} items
 *
 * @api   public
 */
module.exports = function (options, items) {
  utils.appendKeysToObject(options, RSS);
  if (!RSS.title)           RSS.title       = 'Untitled RSS Feed';
  if (!RSS.description)     RSS.description = '';
  if (!RSS.items)           RSS.items       = [];
  return RSS;
};

/*
 * Adds a item to the feed
 *
 * @param {Object} itemOptions
 *
 * @api   public
 */
RSS.item = function (itemOptions) {
  var newItem = {};
  utils.appendKeysToObject(itemOptions, newItem);
  if (!newItem.title)       newItem.title       = 'No title';
  if (!newItem.description) newItem.description = '';
  if (!newItem.categories)  newItem.categories  = [];

  RSS.items.push(newItem);
  return RSS;
};

/*
 * Adds an Attribute to XML RSS Header
 *
 * @param {String} attrKey
 * @param {String} attrValue
 *
 * @api   public
 */
RSS.xmlAddAttr = function (attrKey, attrValue) {
  if (!RSS._xmlAttr) RSS._xmlAttr = {};
  RSS._xmlAttr[attrKey] = attrValue;
};

/*
 * Generates XML File
 *
 * @param {Bool} indent
 *
 * @api   public
 */
RSS.xml = function (indent) {
  var xmlGenerated = '';

  xmlGenerated  = '<?xml version="1.0" encoding="UTF-8"?>'
                + XML(utils.generateXML(RSS), indent);

  return xmlGenerated;
};
