/**
 * Copyright (c) 2014 Michael Berkovich, TranslationExchange.com
 *
 *  _______                  _       _   _             ______          _
 * |__   __|                | |     | | (_)           |  ____|        | |
 *    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___
 *    | | '__/ _` | '_ \/ __| |/ _` | __| |/ _ \| '_ \|  __| \ \/ / __| '_ \ / _` | '_ \ / _` |/ _ \
 *    | | | | (_| | | | \__ \ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/
 *    |_|_|  \__,_|_| |_|___/_|\__,_|\__|_|\___/|_| |_|______/_/\_\___|_| |_|\__,_|_| |_|\__, |\___|
 *                                                                                        __/ |
 *                                                                                       |___/
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

Tr8n.LanguageContext = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.rules = {};
  for(var key in Tr8n.Utils.keys(attrs.rules || {})) {
    rules[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.rules[key], {language: this}));
  }

};

Tr8n.LanguageContext.isAppliedToToken = function(token) {
  return token.match(new RegExp(this.token_expression)) != null;
};

Tr8n.LanguageContext.getFallbackRule = function() {
  if (!this.fallback_rule) {
    Object.keys(this.rules).forEach(function(key) {
      if (this.rules[key].isFallback()) {
        this.fallback_rule = rule;
      }
    }.bind(this));
  }
  return this.fallback_rule;
};

Tr8n.LanguageContext.getVars = function(obj) {
  var vars = {};
  var config = Tr8n.config.getContextRules(this.keyword);

  this.variables.forEach(function(key) {
    if (!config.variables || !config.variables[key]) {
      vars[key] = obj;
    } else {
      var method = config.variables[key];
      if (typeof method === "string") {
        if (obj.object) obj = obj.object;
        vars[key] = obj[method];
      } else if (typeof method === "function") {
        vars[key] = method(obj);
      } else {
        vars[key] = obj;
      }
    }
  });

  return vars;
};

Tr8n.LanguageContext.findMatchingRule = function(obj) {
  var token_vars = this.getVars(obj);

  for (var key in Tr8n.Utils.keys(this.rules)) {
    var rule = this.rules[key];
    if (!rule.isFallback() && rule.evaluate(token_vars))
        return rule;
  }

  return this.getFallbackRule();
};
