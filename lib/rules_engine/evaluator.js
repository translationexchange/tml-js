/**
 * Copyright (c) 2016 Translation Exchange, Inc.
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

var Evaluator = function(ctx) {
  this.vars = {};
  this.ctx = ctx || {

    'label'   : function(l, r)    { this.vars[l] = this.ctx[l] = r; return r; },
    'quote'   : function(expr)    { return expr; },
    'car'     : function(list)    { return list[1]; },
    'cdr'     : function(list)    { list.shift(); return list; },
    'cons'    : function(e, cell) { cell.unshift(e); return cell; },
    'eq'      : function(l, r)    { return (l == r); },
    'atom'    : function(a)       { return !(typeof a in {'object':1, 'array':1, 'function':1}); },
    'cond'    : function(c, t, f) { return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); },
  
    'set'     : function(l, r){ this.vars[l] = this.ctx[l] = r; return r; },

    '='       : function(l, r)    {return l == r; },                                                     // ['=', 1, 2]
    '!='      : function(l, r)    {return l != r; },                                                     // ['!=', 1, 2]
    '<'       : function(l, r)    {return l < r; },                                                      // ['<', 1, 2]
    '>'       : function(l, r)    {return l > r; },                                                      // ['>', 1, 2]
    '+'       : function(l, r)    {return l + r; },                                                      // ['+', 1, 2]
    '-'       : function(l, r)    {return l - r; },                                                      // ['-', 1, 2]
    '*'       : function(l, r)    {return l * r; },                                                      // ['*', 1, 2]
    '%'       : function(l, r)    {return l % r; },                                                      // ['%', 14, 10]
    'mod'     : function(l, r)    {return l % r; },                                                      // ['mod', '@n', 10]
    '/'       : function(l, r)    {return (l * 1.0) / r; },                                              // ['/', 1, 2]
    '!'       : function(expr)    {return !expr; },                                                      // ['!', ['true']]
    'not'     : function(val)     {return !val; },                                                       // ['not', ['true']]

    '&&'      : function()        {return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this));},            // ['&&', [], [], ...]
    'and'     : function()        {return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this));},            // ['and', [], [], ...]
    '||'      : function()        {return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length;},  // ['||', [], [], ...]
    'or'      : function()        {return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length;},  // ['or', [], [], ...]

    'if'      : function(c,t,f)   {return this.evaluate(c) ? this.evaluate(t) : this.evaluate(f);},      // ['if', 'cond', 'true', 'false']
    'let'     : function(l, r)    {this.vars[l] = r; return r;},                                         // ['let', 'n', 5]
    'true'    : function()        {return true; },                                                       // ['true']
    'false'   : function()        {return false; },                                                      // ['false']

    'date'    : function(date)    {return new Date(date); },                                             // ['date', '2010-01-01']
    'today'   : function()        {return new Date(); },                                                 // ['today']
    'time'    : function(expr)    {return new Date(expr); },                                             // ['time', '2010-01-01 10:10:05']
    'now'     : function()        {return Date.now(); },                                                 // ['now']

    'append'  : function(l, r)    {return String(r) + String(l); },                                      // ['append', 'world', 'hello ']
    'prepend' : function(l, r)    {return String(l) + String(r); },                                      // ['prepend', 'hello  ', 'world']

    'match'   : function(search, subject) {                                                             // ['match', /a/, 'abc']
      search = this._stringToRegexp(search);
      return !!subject.match(search);
    },

    'in'      : function(values, search) {                                                              // ['in', '1,2,3,5..10,20..24', '@n']
      var bounds, range = this._range;
      values = values
        .replace(/\s/g,'')
        .replace(/(\w+)\.\.(\w+)/g, function(x,f,l){
          bounds = range(f,l);
          bounds.push(l);
          return bounds.join();
        });
      return values
        .split(',')
        .indexOf(String(search)) != -1;
    },

    'within'  : function(values, search) {                                                             // ['within', '0..3', '@n']
      var 
        bounds = values.split('..').map(function(d){return parseInt(d);});
      return (bounds[0] <= search && search <= bounds[1]);
    },

    'replace' : function(search, replace, subject) {                                                  // ['replace', '/^a/', 'v', 'abc']
      search = this._stringToRegexp(search);
      return subject.replace(search, replace);
    },

    'count'   : function(list){                                                                       // ['count', '@genders']
      return (typeof(list) == "string" ? this.vars[list] : list).length;
    },

    'all'     : function(list, value) {                                                               // ['all', '@genders', 'male']
      list = (typeof(list) == "string") ? this.vars[list] : list;
      return (list instanceof Array) ? list.every(function(e){return e == value;}) : false;
    },
    
    'any'     : function(list, value) {                                                               // ['any', '@genders', 'female']
      list = (typeof(list) == "string") ? this.vars[list] : list;
      return (list instanceof Array) ? !!list.filter(function(e){return e == value;}) : false;
    }

  };
  return this;
};

Evaluator.prototype = {

  _range: function(start, end) {
    var 
      range = [],
      is_string = !String(start).match(/^\d+$/);

    start = (is_string) ? start.charCodeAt(0) : parseInt(start);
    end   = (is_string) ? end.charCodeAt(0)   : parseInt(end);

    while (end >= start) {
      range.push(is_string ? String.fromCharCode(start) : String(start));
      start += 1;
    }

    return range;
  },

  _stringToRegexp: function(str) {
    var re = new RegExp("^\/","g");
    if(!str.match(re)) {
      return new RegExp(str,"g");
    }
    str = str.replace(re, '');
    if (str.match(/\/i$/)) {
      str = str.replace(/\/i$/g, '');
      return new RegExp(str,"ig");
    }
    str = str.replace(/\/$/, '');
    return new RegExp(str,"g");
  },

  setVars: function(vars) {
    this.vars = vars;
  },

  getVars: function() {
    return this.vars;
  },

  apply: function(fn, args) {
    if (typeof this.ctx[fn] == 'function') {
      return this.ctx[fn].apply(this,args);
    }
    return this.ctx[fn];
  },

  evaluate: function(expr) {
    if (this.ctx.atom.call(this, expr)) {
      if (typeof expr == "string" && this.vars[expr]) return this.vars[expr];
      return (expr in this.ctx ? this.ctx[expr] : expr);
    }
    var 
      fn    = expr[0],
      args  = expr.slice(1);

    if(['quote','car','cdr','cond','if','&&','||','and','or','true','false','let','count','all','any'].indexOf(fn) == -1) {
      args = args.map(this.evaluate.bind(this));
    }
    return this.apply(fn,args);
  }
};

module.exports = Evaluator;
