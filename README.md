juan-rss
========

Fork from [dylang's node-rss version 0.0.4](https://github.com/dylang/node-rss/commit/52011922b678891ef687dfa6a96f96588ed3075c), refactored to allow more flexibility.

## Installation

    $ npm install juan-rss

## Use

### Require the Module

    var RSS = require('juan-rss');

### Create an RSS Feed Object

#### Just create the object:

    var rssFeed = new RSS();


#### You can fill the main fields here:

    // The object rssFeed being created before ...

    rssFeed.title         = 'My Title';
    rssFeed.description   = 'My Description';
    rssFeed.feed_url      = 'http://domain/path/to/rss.xml';
    rssFeed.site_url      = 'http://domain/path/to/';
    rssFeed.image_url     = 'http://domain/path/to/icon.png';
    rssFeed.author        = 'John Doe';

#### You can, of course, create the object and assign the fields inmediately:

    var rssFeed = new RSS({}
      title         : 'My Title',
      description   : 'My Description',
      feed_url      : 'http://domain/path/to/rss.xml',
      site_url      : 'http://domain/path/to/',
      image_url     : 'http://domain/path/to/icon.png',
      author        : 'John Doe'
    });

### Add Items to the RSS Feed Object

#### Create an empty Item and fill it:

    // The object rssFeed being created before ...
    rssFeed.item({
        title           : 'item 1'
      , description     : 'description 1'
      , url             : 'http://domain/path/to/post-1'
      , date            : 'Sep 30, 2012 04:58:00 GMT'
    });

#### Several items can be created at once, just chaining the function:

    // The object rssFeed being created before ...
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

#### Now, of course, you may need to include more fields in your RSS items

    // The object rssFeed being created before ...
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

### Add Attributes to the XML RSS Header

#### By default, I'm including these XML RSS Headers:
  * 'xmlns:dc'      : 'http://purl.org/dc/elements/1.1/'
  * 'xmlns:content' : 'http://purl.org/rss/1.0/modules/content/'
  * 'xmlns:atom'    : 'http://www.w3.org/2005/Atom'

#### Perhaps You want to include more. Use `xmlAddAttr()` this way:


    // The object rssFeed being created before ...
    rssFeed.xmlAddAttr('myNameSpace:MyField', 'Special Value');
    rssFeed.xmlAddAttr('myNameSpace:OtherField', 'More Specials Values');

#### The result:

    <?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" myNameSpace:MyField="Special Value" myNameSpace:OtherField="More Specials Values" version="2.0"><channel>

### Generate XML from the RSS Feed Object

#### To generate your XML:

    // The object rssFeed being created before ...
    rssFeed.xml();

## Tests

To run the tests use [mocha](https://github.com/visionmedia/mocha).

    $ mocha

Personally, I like this reporter better:

    $ mocha --reporter spec

## License

(The MIT License)

Copyright (c) 2012 Herman Junge (<haj@neosource.cl>)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
