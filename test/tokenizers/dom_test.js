//var Tr8n = require("../../lib/tr8n");
var DomTokenizer = require("../../lib/tokenizers/dom.js");
var assert = require("assert");

describe('Dom', function() {
  describe('parsing', function() {
    it('should properly parse the document', function(){
      var jsdom = require("jsdom");

      var original = '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>';
      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//      var window = doc.parentWindow;
//      console.log(doc);

//      var tokenizer = new DomTokenizer(doc);
//      console.log(original);
//      console.log(tokenizer.translate());


      var expectations = [
        ['Hello World', '{{{Hello World}}}'],
        ['<div>Hello World</div>', '<div>{{{Hello World}}}</div>'],
        []
      ];

//      var original = '<div>Hello <strong>World</strong></div>';
//      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//      var tokenizer = new DomTokenizer(doc);
//      console.log(original);
//      console.log(tokenizer.translate());
//      tokenizer.debug(doc);

//      var original = '<p><strong>Apollo 11</strong> was the spaceflight that landed the first humans, Americans <a href="http://en.wikipedia.org/wiki/Neil_Armstrong" title="Neil Armstrong">Neil Armstrong</a> and <a href="http://en.wikipedia.org/wiki/Buzz_Aldrin" title="Buzz Aldrin">Buzz Aldrin</a>, on the Moon on July 20, 1969, at 20:18 UTC. Armstrong became the first to step onto the lunar surface 6 hours later on July 21 at 02:56 UTC.</p>';
//      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//      var tokenizer = new DomTokenizer(doc, {}, {debug_format: "{$0}"});
//
//      console.log("");
//      console.log(original);
//
//      console.log("");
//      tokenizer.debug(doc);
//
//      console.log("");
//      console.log(tokenizer.translate());
//      console.log("");
//
//      var original = ' \
//        <table align="right" border="1" bordercolor="#ccc" cellpadding="5" cellspacing="0" style="border-collapse:collapse; margin:10px 0 10px 15px"> \
//          <caption><strong>Mission crew</strong></caption> \
//          <thead>\
//            <tr>\
//              <th scope="col">Position</th>\
//              <th scope="col">Astronaut</th>\
//            </tr>\
//          </thead>\
//          <tbody>\
//            <tr>\
//              <td>Commander</td>\
//              <td>Neil A. Armstrong</td>\
//            </tr>\
//            <tr>\
//              <td>Command Module Pilot</td>\
//              <td>Michael Collins</td>\
//            </tr>\
//            <tr>\
//              <td>Lunar Module Pilot</td>\
//              <td>Edwin &quot;Buzz&quot; E. Aldrin, Jr.</td>\
//            </tr>\
//          </tbody>\
//        </table>\
//      ';
//
//      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//      var tokenizer = new Tr8n.Tokenizers.Dom(doc, {});
//
//      console.log("");
//      console.log(original);
//
//      console.log("");
//      tokenizer.debug(doc);
//
//      console.log("");
//      console.log(tokenizer.translate());
//      console.log("");
//
//
//
//      var original = ' \
//        <ol> \
//          <li><strong>Command Module</strong> with a cabin for the three astronauts which was the only part which landed back on Earth</li> \
//          <li><strong>Service Module</strong> which supported the Command Module with propulsion, electrical power, oxygen and water</li> \
//          <li><strong>Lunar Module</strong> for landing on the Moon.</li> \
//        </ol> \
//      ';
//
//      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//      var tokenizer = new Tr8n.Tokenizers.Dom(doc, {});
//
//      console.log("");
//      console.log(original);
//
//      console.log("");
//      tokenizer.debug(doc);
//
//      console.log("");
//      console.log(tokenizer.translate());
//      console.log("");

//      var original = ' <body>\
//        <style>.h {}</style>\
//        \
//        <div class="h">Hello World</div>\
//        </body>\
//      ';
//
//      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//      var tokenizer = new Tr8n.Tokenizers.Dom(doc, {});
//
//      console.log("");
//      console.log(original);
//
//      console.log("");
//      tokenizer.debug(doc);
//
//      console.log("");
//      console.log(tokenizer.translate());
//      console.log("");


      var original = '<body> <a href="a">Hello</a> \
      <a href="b">World</a>\
      <a href="c">World1</a>\
      </body>';

      var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
      var tokenizer = new DomTokenizer(doc, {});
//      console.log("");
//      console.log(original);
//
//      console.log("");
//      tokenizer.debug(doc);
//
//      console.log("");
//      console.log(tokenizer.translate());
//      console.log("");

      assert.deepEqual("<body>{{{ [link: Hello]       [link1: World]      [link2: World1]      }}}</body>", tokenizer.translate());

    });
  });
});