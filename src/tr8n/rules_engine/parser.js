var Parser = function(expression) {
  this.tokenize(expression);
}

Parser.prototype = {
  tokenize: function(expression) {
	this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);	
  },

  parse: function() {
  	token = this.tokens.shift();
  	if (!token) return;
  	if (token == "(") return this.parseList();
  	if (token.match(/^['"].*/)) return token.slice(1, -1);
  	if (token.match(/\d+/)) return parseInt(token);
  	return String(token);
  },

  parseList: function() {
  	var list = [];
  	while (this.tokens.length > 0 && this.tokens[0] != ')')
  		list.push(this.parse());
  	this.tokens.shift();
  	return list;
  }
}

exports.Parser = Parser;