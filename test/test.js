
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

    assert.equal(actualResult, expectedResult);
  };

  function CreateAnEmptyItemTest () {
    rssFeed.item();

    var actualResult    = rssFeed.xml();

    var expectedResult  = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><item><title><![CDATA[No title]]></title><guid isPermaLink="false">No title</guid></item></channel></rss>'

    assert.equal(actualResult, expectedResult);
  };
};

function FillingFeedTests () {
  it('Should fill main fields on RSS Feed'
    , FillMainFieldsOnRSSTest);
  it('Should create an RSS Object and fill its main fields inmediately'
    , CreateAndFillRSSObjectTest);
  it('Should create and fill an item in an RSS Object'
    , CreateAndFillItemFieldsTest);
  it('Should create and fill several items in an RSS Object'
    , CreateAndFillSeveralItemFieldsTest);
  it('Should create and fill several items with variable and extra fields in an RSS Object'
    , CreateAndFillSeveralItemFieldsVariableAndExtraFieldsTest);
  it('Should add an Attribute to the XML RSS Object'
    , AddAnAttributeToXMLRSSObjectTest)

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
    var expectedResult    = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[My Title]]></title><description><![CDATA[My Description]]></description><link>http://domain/path/to/</link><image><url>http://domain/path/to/icon.png</url><title>My Title</title><link>http://domain/path/to/</link></image><generator>My Company</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://domain/path/to/rss.xml" rel="self" type="application/rss+xml"/><anyOtherField>Lorem Ipsum</anyOtherField></channel></rss>';

    assert.equal(actualResult, expectedResult);
  };

  function CreateAndFillRSSObjectTest () {
    var rssFeed = new RSS({
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

    var actualResult   = rssFeed.xml();
    var expectedResult = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[My Title]]></title><description><![CDATA[My Description]]></description><link>http://domain/path/to/</link><image><url>http://domain/path/to/icon.png</url><title>My Title</title><link>http://domain/path/to/</link></image><generator>My Company</generator><lastBuildDate>' + new Date().toUTCString() +'</lastBuildDate><atom:link href="http://domain/path/to/rss.xml" rel="self" type="application/rss+xml"/><anyOtherField>Lorem Ipsum</anyOtherField><domain:otherKey>Random Value</domain:otherKey></channel></rss>';

    assert.equal(actualResult, expectedResult);
  };

  function CreateAndFillItemFieldsTest () {
    var rssFeed = new RSS();

    rssFeed.item({
        title           : 'item 1'
      , description     : 'description 1'
      , url             : 'http://domain/path/to/post-1'
      , date            : 'Sep 30, 2012 04:58:00 GMT'
    });

    var actualResult   = rssFeed.xml();
    var expectedResult = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate><item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://domain/path/to/post-1</link><guid isPermaLink="true">http://domain/path/to/post-1</guid><pubDate>Sun, 30 Sep 2012 04:58:00 GMT</pubDate></item></channel></rss>';

    assert.equal(actualResult, expectedResult)
  };

  function CreateAndFillSeveralItemFieldsTest () {
    var rssFeed = new RSS();

    rssFeed
    .item({
        title           : 'item 1'
      , description     : 'description 1'
      , url             : 'http://domain/path/to/post-1'
      , date            : 'Feb 22, 2010 10:45:43 GMT'
    })
    .item({
        title           : 'item 2'
      , description     : 'description 2'
      , url             : 'http://domain/path/to/post-2'
      , date            : 'Jun 04, 2007 14:58:31 GMT'
    })
    .item({
        title           : 'item 3'
      , description     : 'description 3'
      , url             : 'http://domain/path/to/post-3'
      , date            : 'Jun 24, 2011 08:57:19 GMT'
    })
    .item({
        title           : 'item 4'
      , description     : 'description 4'
      , url             : 'http://domain/path/to/post-4'
      , date            : 'Sep 26, 2011 22:40:19 GMT'
    });

    var actualResult   = rssFeed.xml();
    var expectedResult = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate><item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://domain/path/to/post-1</link><guid isPermaLink="true">http://domain/path/to/post-1</guid><pubDate>Mon, 22 Feb 2010 10:45:43 GMT</pubDate></item><item><title><![CDATA[item 2]]></title><description><![CDATA[description 2]]></description><link>http://domain/path/to/post-2</link><guid isPermaLink="true">http://domain/path/to/post-2</guid><pubDate>Mon, 04 Jun 2007 14:58:31 GMT</pubDate></item><item><title><![CDATA[item 3]]></title><description><![CDATA[description 3]]></description><link>http://domain/path/to/post-3</link><guid isPermaLink="true">http://domain/path/to/post-3</guid><pubDate>Fri, 24 Jun 2011 08:57:19 GMT</pubDate></item><item><title><![CDATA[item 4]]></title><description><![CDATA[description 4]]></description><link>http://domain/path/to/post-4</link><guid isPermaLink="true">http://domain/path/to/post-4</guid><pubDate>Mon, 26 Sep 2011 22:40:19 GMT</pubDate></item></channel></rss>';

    assert.equal(actualResult, expectedResult)
  };

  function CreateAndFillSeveralItemFieldsVariableAndExtraFieldsTest () {
    var rssFeed = new RSS();

    rssFeed
    .item({
        title                   : 'item 1'
      , description             : 'description 1'
      , url                     : 'http://domain/path/to/post-1'
      , date                    : 'Feb 22, 2010 10:45:43 GMT'
      , categories              : ['Food', 'Travels', 'Celebrities']
      , 'myNamespace:myField'   : 'Some Value'
    })
    .item({
        title                   : 'item 2'
      , description             : 'description 2'
      , url                     : 'http://domain/path/to/post-2'
      , date                    : 'Jun 04, 2007 14:58:31 GMT'
    })
    .item({
        title                   : 'item 3'
      , description             : 'description 3'
      , url                     : 'http://domain/path/to/post-3'
      , date                    : 'Jun 24, 2011 08:57:19 GMT'
      , 'myNamespace:myField'   : 'Other Value'
    })
    .item({
        title                   : 'item 4'
      , description             : 'description 4'
      , url                     : 'http://domain/path/to/post-4'
    });

    var actualResult   = rssFeed.xml();
    var expectedResult = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate><item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://domain/path/to/post-1</link><guid isPermaLink="true">http://domain/path/to/post-1</guid><pubDate>Mon, 22 Feb 2010 10:45:43 GMT</pubDate><category>Food</category><category>Travels</category><category>Celebrities</category><myNamespace:myField>Some Value</myNamespace:myField></item><item><title><![CDATA[item 2]]></title><description><![CDATA[description 2]]></description><link>http://domain/path/to/post-2</link><guid isPermaLink="true">http://domain/path/to/post-2</guid><pubDate>Mon, 04 Jun 2007 14:58:31 GMT</pubDate></item><item><title><![CDATA[item 3]]></title><description><![CDATA[description 3]]></description><link>http://domain/path/to/post-3</link><guid isPermaLink="true">http://domain/path/to/post-3</guid><pubDate>Fri, 24 Jun 2011 08:57:19 GMT</pubDate><myNamespace:myField>Other Value</myNamespace:myField></item><item><title><![CDATA[item 4]]></title><description><![CDATA[description 4]]></description><link>http://domain/path/to/post-4</link><guid isPermaLink="true">http://domain/path/to/post-4</guid></item></channel></rss>';

    assert.equal(actualResult, expectedResult)
  };

  function AddAnAttributeToXMLRSSObjectTest () {
    var rssFeed = new RSS();

    rssFeed
    .item({
        title           : 'item 1'
      , description     : 'description 1'
      , url             : 'http://domain/path/to/post-1'
      , date            : 'Feb 22, 2010 10:45:43 GMT'
    })
    .item({
        title           : 'item 2'
      , description     : 'description 2'
      , url             : 'http://domain/path/to/post-2'
      , date            : 'Jun 04, 2007 14:58:31 GMT'
    })
    .item({
        title           : 'item 3'
      , description     : 'description 3'
      , url             : 'http://domain/path/to/post-3'
      , date            : 'Jun 24, 2011 08:57:19 GMT'
    })
    .item({
        title           : 'item 4'
      , description     : 'description 4'
      , url             : 'http://domain/path/to/post-4'
      , date            : 'Sep 26, 2011 22:40:19 GMT'
    });

    rssFeed.xmlAddAttr('myNameSpace:MyField', 'Special Value');
    rssFeed.xmlAddAttr('myNameSpace:OtherField', 'More Specials Values');

    var actualResult   = rssFeed.xml();
    var expectedResult = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" myNameSpace:MyField="Special Value" myNameSpace:OtherField="More Specials Values" version="2.0"><channel><title><![CDATA[Untitled RSS Feed]]></title><description><![CDATA[Untitled RSS Feed]]></description><link>http://change/my/site/url</link><generator>Node.js juan-rss</generator><lastBuildDate>' + new Date().toUTCString() + '</lastBuildDate><item><title><![CDATA[item 1]]></title><description><![CDATA[description 1]]></description><link>http://domain/path/to/post-1</link><guid isPermaLink="true">http://domain/path/to/post-1</guid><pubDate>Mon, 22 Feb 2010 10:45:43 GMT</pubDate></item><item><title><![CDATA[item 2]]></title><description><![CDATA[description 2]]></description><link>http://domain/path/to/post-2</link><guid isPermaLink="true">http://domain/path/to/post-2</guid><pubDate>Mon, 04 Jun 2007 14:58:31 GMT</pubDate></item><item><title><![CDATA[item 3]]></title><description><![CDATA[description 3]]></description><link>http://domain/path/to/post-3</link><guid isPermaLink="true">http://domain/path/to/post-3</guid><pubDate>Fri, 24 Jun 2011 08:57:19 GMT</pubDate></item><item><title><![CDATA[item 4]]></title><description><![CDATA[description 4]]></description><link>http://domain/path/to/post-4</link><guid isPermaLink="true">http://domain/path/to/post-4</guid><pubDate>Mon, 26 Sep 2011 22:40:19 GMT</pubDate></item></channel></rss>';

    assert.equal(actualResult, expectedResult);
  };
};
