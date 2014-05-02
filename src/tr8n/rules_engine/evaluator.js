
var Evaluator = function(ctx) {
  this.vars = {};
  this.ctx = ctx || {
    'atom':     function(a){ return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'set':      function(l, r){ this.vars[l] = this.ctx[l] = r; return r; }.bind(this),

    '=':        function(args){ return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      for (var index = 0; index < args.length; ++index) {
        if (!this.evaluate(args[index])) return false;
      }
      return true;
    }.bind(this),
    'and':      function(args){ return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      for (var index = 0; index < args.length; ++index) {
        if (this.evaluate(args[index])) return true;
      }
      return false;
    }.bind(this),
    'or':      function(args){ return this.ctx['||'](args); }.bind(this),
  };
  return this;
}

Evaluator.prototype = {
  apply: function(fn, args) {
    if (typeof this.ctx[fn] == 'function') {
      return this.ctx[fn](args);
    }
    return this.ctx[fn];
  },
  evaluate: function(sexpr) {
    if (this.ctx['atom'](sexpr)) {
      return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    var fn = sexpr[0];
    var args = sexpr.slice(1);

    if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      args = args.map(function(arg) {
        return this.evaluate(arg);
      }.bind(this));
    }

    return this.apply(fn, args);
  }
}

exports.Evaluator = Evaluator;