
// Module Constructor
var utils = module.exports = function (){};

// Append the keys from srcObj object to dstObj object
utils.appendKeysToObject = function (srcObj, dstObj) {
  var keys = srcObj ? Object.keys(srcObj) : [];
  keys.forEach(function(key){
    dstObj[key] = srcObj[key];
  });
};

// Removes elements belonging to array subSetArr from array arr
utils.removeFromArray = function (arr, subSetArr) {
  subSetArr.forEach(function(element){
    var idx = arr.indexOf(element);
    if (idx!=-1) arr.splice(idx, 1);
  });
};

// Generates XML file from RSS Object
utils.generateXML = function (rssObj) {
  var channel = [];

  // First, we push the following fields in order:
  // title, description, link, image_url, generator, lastBuildDate, feed_url

  channel.push({ title          : { _cdata: rssObj.title }})

  channel.push({ description    : { _cdata: rssObj.description || rssObj.title } });

  channel.push({ link           : rssObj.site_url || 'http://change/my/site/url' });

  if (rssObj.image_url) {
    channel.push( { image       :  [ { url   : rssObj.image_url }
                                   , { title : rssObj.title }
                                   , { link  : rssObj.site_url }
                                   ]
                  });
  }

  channel.push({ generator      : rssObj.generator || 'Node.js juan-rss' });

  channel.push({ lastBuildDate  : new Date().toGMTString() });

  if (rssObj.feed_url) {
    channel.push( { 'atom:link' : { _attr: { href: rssObj.feed_url
                                  , rel: 'self'
                                  , type: 'application/rss+xml'
                                  }
                              }
                  });
  }

  // Then we push other fields, should they exist
  var mainKeys = Object.keys(rssObj)
  var keysToRemove =  [ 'title', 'description', 'feed_url', 'link', 'site_url'
                      , 'guid', 'image_url', 'author', 'date', 'categories'
                      , 'generator', 'xmlAddAttr', 'xml', 'item', 'items'];
  utils.removeFromArray(mainKeys, keysToRemove);

  // Add the other keys here!!!
  mainKeys.forEach(function(key){
    var obj = {};
    obj[key] = rssObj[key];
    channel.push(obj);
  });

  rssObj.items.forEach(function(item) {
    var item_values = []
      , itemKeys    = Object.keys(item);

    // We process certain keys first (order matters here)
    item_values.push({ title : { _cdata : item.title } });
    if (item.description) {
      item_values.push({ description: { _cdata: item.description } });
    }

    if (item.url) {
      item_values.push({ link: item.url });
    }

    if (item.link || item.guid || item.title) {
      item_values.push( { guid :  [ { _attr: { isPermaLink: !item.guid && !!item.url } }
                                  , item.guid || item.url || item.title
                                  ]
                        }
      );
    }

    if (item.author || rssObj.author) {
      item_values.push({ 'dc:creator': { _cdata: item.author || rssObj.author }});
    }

    if (item.date) {
      item_values.push({ pubDate:      new Date(item.date).toGMTString() });
    }

    if (item.categories && (item.categories.length > 0)) {
      item.categories.forEach(function(cat){
        item_values.push({ category: cat });
      });
    }

    var keysToRemove =  [ 'title', 'description', 'url', 'link', 'guid'
                        , 'author', 'date', 'categories'];

    utils.removeFromArray(itemKeys, keysToRemove);

    // Now, we are left with the other keys
    itemKeys.forEach(function(key){
        var obj = {};
        obj[key] = item[key];
        item_values.push(obj);
    });

    channel.push({ item: item_values });
  });

  var xmlAttr = { 'xmlns:dc'      : 'http://purl.org/dc/elements/1.1/'
                , 'xmlns:content' : 'http://purl.org/rss/1.0/modules/content/'
                , 'xmlns:atom'    : 'http://www.w3.org/2005/Atom'
                };

  if (rssObj._xmlAttr) utils.appendKeysToObject(rssObj._xmlAttr, xmlAttr);

  xmlAttr['version'] = '2.0';

  return  { rss: [ { _attr   : xmlAttr }
                 , { channel : channel }
                 ]
          };
};
