juan-rss
========

Fork from [dylang's node-rss version 0.0.4](https://github.com/dylang/node-rss), refactored to allow more flexibility.

## Installation

````bash
$ npm install juan-rss
````

## Use

### Require the Module

````javascript

var RSS = require('juan-rss');
````

### Create an RSS Feed Object

* Just create the object:

````javascript

var rssFeed = new RSS();
````

* You can fill the main fields here:

````javascript
// The object rssFeed being created before ...

rssFeed.title         = 'My Title';
rssFeed.description   = 'My Description';
rssFeed.feed_url      = 'http://domain/path/to/rss.xml';
rssFeed.site_url      = 'http://domain/path/to/';
rssFeed.image_url     = 'http://domain/path/to/icon.png';
rssFeed.author        = 'John Doe';
````

* You can, of course, create the object and assign the fields inmediately:

````javascript
var rssFeed = new RSS({}
  title         : 'My Title',
  description   : 'My Description',
  feed_url      : 'http://domain/path/to/rss.xml',
  site_url      : 'http://domain/path/to/',
  image_url     : 'http://domain/path/to/icon.png',
  author        : 'John Doe'
});
````

### Add Items to the RSS Feed Object

* Create an empty Item, filling it later:

(TODO)
````javascript


````

* Or create and fill the item inmediately:

(TODO)
````javascript


````


### Add Attributes to the XML RSS Header

(TODO)
````javascript
````

### Generate XML from the RSS Feed Object

(TODO)
````javascript
````

## Tests

To run the tests use [mocha](https://github.com/visionmedia/mocha).

````bash
$ mocha
````

Personally, I like this reporter better:

````bash
$ mocha --reporter spec
````

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
