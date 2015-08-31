var Language = require("../../lib/language.js");
var DataToken = require("../../lib/tokens/data.js");

var assert = require("assert");
var helper = require("./../test_helper");

describe('Tokens.Data', function(){
  describe('creation', function(){
    it('should correctly create a token', function() {
      var token = new DataToken("{user}");

      assert.deepEqual("{user}", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual([], token.context_keys);
      assert.deepEqual([], token.case_keys);

      token = new DataToken("{ user }");
      assert.deepEqual("{ user }", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual([], token.context_keys);
      assert.deepEqual([], token.case_keys);

      token = new DataToken("{user:gender}");
      assert.deepEqual("{user:gender}", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual(["gender"], token.context_keys);
      assert.deepEqual([], token.case_keys);

      token = new DataToken("{user : gender}");
      assert.deepEqual("{user : gender}", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual(["gender"], token.context_keys);
      assert.deepEqual([], token.case_keys);

      token = new DataToken("{user :: gen}");
      assert.deepEqual("{user :: gen}", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual([], token.context_keys);
      assert.deepEqual(["gen"], token.case_keys);

      token = new DataToken("{user::gen}");
      assert.deepEqual("{user::gen}", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual([], token.context_keys);
      assert.deepEqual(["gen"], token.case_keys);

      token = new DataToken("{user:gender::gen}");
      assert.deepEqual("{user:gender::gen}", token.full_name);
      assert.deepEqual("user", token.short_name);
      assert.deepEqual(["gender"], token.context_keys);
      assert.deepEqual(["gen"], token.case_keys);

      token = new DataToken("{count:number::ordinal::ord}");
      assert.deepEqual("{count:number::ordinal::ord}", token.full_name);
      assert.deepEqual("count", token.short_name);
      assert.deepEqual(["number"], token.context_keys);
      assert.deepEqual(["ordinal", "ord"], token.case_keys);

      token = new DataToken("{count : number ::ordinal :: ord}");
      assert.deepEqual("{count : number ::ordinal :: ord}", token.full_name);
      assert.deepEqual("count", token.short_name);
      assert.deepEqual(["number"], token.context_keys);
      assert.deepEqual(["ordinal", "ord"], token.case_keys);

    });
  });

  describe('get token value', function(){
    it('should return object value', function() {

      var token = new DataToken("{user}");
      var user = {name: "Michael", gender: "male", toString: function() { return this.name; }};

      assert.deepEqual("{user}", token.getTokenValue());
      assert.deepEqual("{user}", token.getTokenValue({}));
      assert.deepEqual("test", token.getTokenValue({user: "test"}));
      assert.deepEqual(1, token.getTokenValue({user: 1}));
      assert.deepEqual("1", token.getTokenValue({user: "1"}));
      assert.deepEqual(1.5, token.getTokenValue({user: 1.5}));
      assert.deepEqual("Michael", token.getTokenValue({user: user}));
      assert.deepEqual("{user}", token.getTokenValue({user: []}));
      assert.deepEqual("Michael", token.getTokenValue({user: [user, user.name]}));
      assert.deepEqual("Michael", token.getTokenValue({user: [user]}));


      assert.deepEqual("Tom", token.getTokenValue({user: {object: user, value: "Tom"}}));
      assert.deepEqual("Michael", token.getTokenValue({user: {object: user, attribute: "name"}}));

    });
  });

  describe('get token object', function(){
    it('should return object', function() {

      var token = new DataToken("{user}");
      var user = {name: "Michael", gender: "male", toString: function() { return this.name; }};

      assert.deepEqual(user, token.getTokenObject({user: user}));
      assert.deepEqual(user, token.getTokenObject({user: [user]}));

    });
  });

  describe('sanitize', function(){
    it('should sanitize object value', function() {

      var token = new DataToken("{user}");
      var user = {name: "Michael", gender: "male", toString: function() { return this.name; }};

      assert.deepEqual("&lt;a&gt;Michael&lt;/a&gt;", token.sanitize("<a>Michael</a>"));

    });
  });


  describe('get token value from array', function(){
    it('should return object', function(done) {
      helper.fixtures.loadJSON("languages/en-US", function(data) {
        var language = new Language(data);

        var token = new DataToken("{users}");
        var users = [];
        [
          ["Michael", "male"],
          ["Tom", "male"],
          ["Anna", "female"],
          ["Peter", "male"],
          ["Kate", "female"],
          ["Olga", "female"]
        ].forEach(function(info) {
            users.push({name: info[0], gender: info[1], toString: function() { return info[0]; }})
        });

//        console.log("" + users[0]);

        var one_user = [users[0]];

        assert.deepEqual("Michael", token.getTokenValueFromArray([one_user], language));

        assert.deepEqual("Michael, Tom, Anna, Peter and 2 others", token.getTokenValueFromArray([users], language));
        assert.deepEqual("Michael, Tom, Anna, Peter and 2 others", token.getTokenValueFromArray([users, "@name"], language));

        assert.deepEqual("Michael, Tom, Anna, Peter, Kate and 1 other", token.getTokenValueFromArray([users, "@name", {
          limit: 5
        }], language));

        assert.deepEqual("Michael, Tom, Anna, Peter, Kate, Olga", token.getTokenValueFromArray([users, "@name", {
          limit: 5,
          joiner: ""
        }], language));

        assert.deepEqual("Michael, Tom, Anna, Peter, Kate and Olga", token.getTokenValueFromArray([users, "@name", {
          limit: 10
        }], language));

        assert.deepEqual("Michael, Tom, Anna, Peter and 2 others", token.getTokenValueFromArray([users, {
          attribute: "name"
        }], language));

        assert.deepEqual("Michael, Tom, Anna, Peter and 2 others", token.getTokenValueFromArray([users, {
          value: "<strong>{$0}</strong>"
        }], language));

        assert.deepEqual("<strong>Michael</strong>, <strong>Tom</strong>, <strong>Anna</strong>, <strong>Peter</strong> and 2 others", token.getTokenValueFromArray([users, {
          attribute: "name",
          value: "<strong>{$0}</strong>"
        }], language));

        assert.deepEqual("<strong>Michael</strong>, <strong>Tom</strong>, <strong>Anna</strong>, <strong>Peter</strong> and 2 others",
          token.getTokenValueFromArray([users, "<strong>{$0}</strong>"], language));
        assert.deepEqual("<strong>Michael</strong>, <strong>Tom</strong>, <strong>Anna</strong>, <strong>Peter</strong> and 2 others",
          token.getTokenValueFromArray([users, function(user) {
            return "<strong>" + user.name + "</strong>";
          }], language));


        assert.deepEqual('Michael, Tom, Anna, Peter<span id="tml_other_link_72a06b5c9851a0ef57c71c1fbea186d0"> and <a href="#" class="tml_other_list_link" onClick="document.getElementById(\'tml_other_link_72a06b5c9851a0ef57c71c1fbea186d0\').style.display=\'none\'; document.getElementById(\'tml_other_elements_72a06b5c9851a0ef57c71c1fbea186d0\').style.display=\'inline\'; return false;">2 others</a></span><span id="tml_other_elements_72a06b5c9851a0ef57c71c1fbea186d0" style="display:none">, Kate and Olga <a href="#" class="tml_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="document.getElementById(\'tml_other_link_72a06b5c9851a0ef57c71c1fbea186d0\').style.display=\'inline\'; document.getElementById(\'tml_other_elements_72a06b5c9851a0ef57c71c1fbea186d0\').style.display=\'none\'; return false;">&laquo; less</a></span>',
          token.getTokenValueFromArray([users, "@name", {
            expandable: true
          }], language));

        done();

      });
    });
  });

  describe('language cases', function(){
    it('should apply them correctly', function(done) {
      helper.fixtures.loadJSON("languages/en-US", function(data) {
        var language = new Language(data);

        var token = new DataToken("{user::pos}");
        var user = {name: "Michael", gender: "male", toString: function() { return this.name; }};

        assert.deepEqual("Michael's", token.getTokenValue({user: user}, language));

        token = new DataToken("{count::ord}");
        assert.deepEqual("5th", token.getTokenValue({count: 5}, language));

        done();
      });
    });
  });
});
