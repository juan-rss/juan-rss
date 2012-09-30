
// Module Dependencies and Variables
var XML   = require('xml')
  , utils = require('./rss_utils');

/*
 * Module Constructor
 *
 * @param {Object} options
 * @param {Object} items
 *
 * @api   public
 */
var RSS = module.exports = function (options, items) {
  utils.appendKeysToObject(options, this);
  if (!this.title)           this.title       = 'Untitled RSS Feed';
  if (!this.description)     this.description = '';
  if (!this.items)           this.items       = [];

  /*
   * Adds a item to the feed
   *
   * @param {Object} itemOptions
   *
   * @api   public
   */
  this.item = function (itemOptions) {
    var newItem = {};
    utils.appendKeysToObject(itemOptions, newItem);
    if (!newItem.title)       newItem.title       = 'No title';
    if (!newItem.description) newItem.description = '';
    if (!newItem.categories)  newItem.categories  = [];

    this.items.push(newItem);
    return this;
  };

  /*
   * Adds an Attribute to XML RSS Header
   *
   * @param {String} attrKey
   * @param {String} attrValue
   *
   * @api   public
   */
  this.xmlAddAttr = function (attrKey, attrValue) {
    if (!this._xmlAttr) this._xmlAttr = {};
    this._xmlAttr[attrKey] = attrValue;

    return this;
  };

  /*
   * Generates XML File
   *
   * @param {Bool} indent
   *
   * @api   public
   */
  this.xml = function (indent) {
    var xmlGenerated = '';

    xmlGenerated  = '<?xml version="1.0" encoding="UTF-8"?>'
                  + XML(utils.generateXML(this), indent);

    return xmlGenerated;
  };
};
