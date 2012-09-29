
/*
 *  To run the tests install mocha
 *
 *  $ [sudo] npm install mocha -g
 *
 *  Then, step in the root directory of this module and just type
 *
 *  $ mocha
 */

// Module Dependencies
var assert  = require("assert")
  ,  RSS     = require('../lib/rss');

describe('RSS Feed', RSSFeedTests);

function RSSFeedTests () {
  describe('Empty Feed', EmptyFeedTests);
  describe('Filling Feed', FillingFeedTests);
};

function EmptyFeedTests () {
  it('Should create an empty RSS Feed', CreateAnEmptyFeedTest);
  it('Should create an empty RSS Item', CreateAnEmptyItemTest);

  var rssFeed = new RSS();

  function CreateAnEmptyFeedTest () {
    var actualResult    = rssFeed.xml();
    var expectedResult  = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate></channel></rss>'

    assert.equal(expectedResult, actualResult);
  };

  function CreateAnEmptyItemTest () {
    var actualResult      = rssFeed.xml();
    var expectedResult    = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate></channel></rss>';

    assert.equal(expectedResult, actualResult);
  };
};

function FillingFeedTests () {
  it('Should fill main fields on RSS Feed', FillMainFieldsOnRSSTest);
  it('Should create an RSS Object and fill its main fields inmediately', CreateAndFillRSSObjectTest);

  function FillMainFieldsOnRSSTest () {
    var rssFeed = new RSS();

    rssFeed.title           = 'My Title';
    rssFeed.description     = 'My Description';
    rssFeed.feed_url        = 'http://domain/path/to/rss.xml';
    rssFeed.site_url        = 'http://domain/path/to/';
    rssFeed.image_url       = 'http://domain/path/to/icon.png';
    rssFeed.author          = 'John Doe';
    rssFeed.generator       = 'My Company';
    rssFeed.anyOtherField   = 'Lorem Ipsum';

    var actualResult      = rssFeed.xml();
    var expectedResult    = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[My Title]]></title><description><![CDATA[My Description]]></description><link>http://domain/path/to/</link><image><url>http://domain/path/to/icon.png</url><title>My Title</title><link>http://domain/path/to/</link></image><generator>My Company</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://domain/path/to/rss.xml" rel="self" type="application/rss+xml"/><generator>My Company</generator><anyOtherField>Lorem Ipsum</anyOtherField></channel></rss>';

    assert.equal(expectedResult, actualResult);
  };

  function CreateAndFillRSSObjectTest () {
    var otherRSSFeed = new RSS({
        title             : 'My Title'
      , description       : 'My Description'
      , feed_url          : 'http://domain/path/to/rss.xml'
      , site_url          : 'http://domain/path/to/'
      , image_url         : 'http://domain/path/to/icon.png'
      , author            : 'John Doe'
      , generator         : 'My Company'
      , anyOtherField     : 'Lorem Ipsum'
      , 'domain:otherKey' : 'Random Value'
    });

    var actualResult   = otherRSSFeed.xml();
    var expectedResult = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[My Title]]></title><description><![CDATA[My Description]]></description><link>http://domain/path/to/</link><image><url>http://domain/path/to/icon.png</url><title>My Title</title><link>http://domain/path/to/</link></image><generator>My Company</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://domain/path/to/rss.xml" rel="self" type="application/rss+xml"/><generator>My Company</generator><anyOtherField>Lorem Ipsum</anyOtherField><domain:otherKey>Random Value</domain:otherKey></channel></rss>';

    assert.equal(expectedResult, actualResult);
  };
};
