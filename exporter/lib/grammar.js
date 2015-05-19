var classes = require('../grammar/classes');
var comments = require('../grammar/comments');
var constants = require('../grammar/constants');
var datatypes = require('../grammar/datatypes');
var define = require('../grammar/define');
var operators = require('../grammar/operators');
var preprocessor = require('../grammar/preprocessor');
var procedure = require('../grammar/procedure');
var strings = require('../grammar/strings');
var userdefined = require('../grammar/userdefined');
var webspeed = require('../grammar/webspeed');
/*
http://manual.macromates.com/en/language_grammars
http://manual.macromates.com/en/regular_expressions
*/
module.exports.run = function (objects) {
	var grammar = {
		scopeName: "source.abl",
		name: "OpenEdge ABL",
		fileTypes: ["p", "i", "cls"],
		patterns: []
	};
	var scopes = {
		'keyword.function': [],
		'keyword.function.parenthases': [],
		'entity.method': [],
		'entity.attribute': [],
		'keyword.statement': [],
		'keyword.systemreference': [],
		'keyword.other': [],
		'keyword.widget': [],
		'keyword.option': [],
		'keyword.handle': []
	};

	function pushOjb(obj, name, type) {
		var t = {};
		switch (type) {
		case 'attributes':
			scopes['entity.attribute'].push(name.toLowerCase());
			break;
		case 'methods':
			scopes['entity.method'].push(name.toLowerCase());
			break;
		case 'functions_with_parenthases':
			scopes['keyword.function.parenthases'].push(name.toLowerCase());
			break;
		case 'functions_without_parenthases':
			scopes['keyword.function'].push(name.toLowerCase());
			break;
		case 'handles':
			scopes['keyword.handle'].push(name.toLowerCase());
			break;
		case 'statements':
			scopes['keyword.statement'].push(name.toLowerCase());
			break;
		case 'system_references':
			scopes['keyword.systemreference'].push(name.toLowerCase());
			break;
		case 'widgets':
			scopes['keyword.widget'].push(name.toLowerCase());
			break;
		case 'options':
			scopes['keyword.option'].push(name.toLowerCase());
			break;
		case 'unknowns':
			scopes['keyword.other'].push(name.toLowerCase());
			break;
		}
	}
	for (var o in objects) {
		var arr = objects[o];
		for (var i in arr) {
			var obj = arr[i];
			pushOjb(obj, obj.name, o);
			if (obj.abbreviation) {
				var temp = obj.name;
				while (temp.length > obj.abbreviation.length) {
					temp = temp.substring(0, temp.length - 1);
					pushOjb(obj, temp, o);
				}
				pushOjb(obj, temp, o);
			}
		}
	}
	scopes['entity.attribute'].sort();
	scopes['entity.method'].sort();
	scopes['keyword.function.parenthases'].sort();
	scopes['keyword.function'].sort();
	scopes['keyword.handle'].sort();
	scopes['keyword.statement'].sort();
	scopes['keyword.systemreference'].sort();
	scopes['keyword.widget'].sort();
	scopes['keyword.option'].sort();
	scopes['keyword.other'].sort();
	grammar.patterns = grammar.patterns.concat(define, datatypes, classes, comments, constants, strings, procedure, operators, preprocessor);
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.other'].join('|') + ')(?!-)\\b',
		'name': 'keyword.other.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.function'].join('|') + ')(?!-)\\b',
		'name': 'keyword.function.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.statement'].join('|') + ')(?!-)\\b',
		'name': 'keyword.statement.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.systemreference'].join('|') + ')(?!-)\\b',
		'name': 'keyword.systemreference.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.handle'].join('|') + ')(?!-)\\b',
		'name': 'keyword.handle.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.widget'].join('|') + ')(?!-)\\b',
		'name': 'keyword.widget.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.option'].join('|') + ')(?!-)\\b',
		'name': 'keyword.option.abl'
	});
	grammar.patterns.push({
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.function.parenthases'].join('|') + ')(?!-)(?=\\s*\\()\\b',
		'name': 'keyword.function.parenthases.abl'
	});
	grammar.patterns.push({
		"captures": {
			"2": {
				"name": 'entity.other.attribute.predefined.abl'
			}
		},
		'match': '(?i)(:|\\b)(' + scopes['entity.attribute'].join('|') + ')\\b'
	});
	grammar.patterns.push({
		"captures": {
			"2": {
				'name': 'entity.other.method.predefined.abl'
			}
		},
		'match': '(?i)(:|\\b)(' + scopes['entity.method'].join('|') + ')(?!-)(?=\\s*\\()\\b'
	});
	grammar.patterns = grammar.patterns.concat(webspeed, userdefined);
	return grammar;
};