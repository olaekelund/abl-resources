var snippets = require('../keywords/snippets');

module.exports.run = function (objects) {
	var scopes = {
		'keyword.function': [],
		'keyword.function.parenthases': [],
		'keyword.statement': [],
		'keyword.systemreference': [],
		'keyword.phrase': [],
		'keyword.other': []
	};
	var texts = [];
	for (var i in objects) {
		var k = objects[i];
		var f = false;
		if (k.ignore === true) continue;
		if (k['function']) {
			if (k.with_parenthases) {
				texts.push({
					text: k.keyword.toUpperCase() + '()',
					displayText: k.keyword.toUpperCase() + '()',
					snippet: k.snippet || k.keyword.toUpperCase() + '(${1:})',
					type: 'function'
				});
				if (k.abbreviation !== null) {
					texts.push({
						text: k.abbreviation.toUpperCase() + '()',
						displayText: k.abbreviation.toUpperCase() + '()',
						snippet: k.snippet || k.abbreviation.toUpperCase() + '(${1:})',
						type: 'function'
					});
				}
			} else {
				texts.push({
					text: k.keyword.toUpperCase(),
					displayText: k.keyword.toUpperCase(),
					type: 'function'
				});
				if (k.abbreviation !== null) {
					texts.push({
						text: k.abbreviation.toUpperCase(),
						displayText: k.abbreviation.toUpperCase(),
						type: 'function'
					});
				}
			}
		}
		if (k.statement || k.system_reference) {
			f = true;
			texts.push({
				text: k.keyword.toUpperCase(),
				displayText: k.keyword.toUpperCase(),
				type: 'keyword'
			});
			if (k.abbreviation !== null) {
				texts.push({
					text: k.abbreviation.toUpperCase(),
					displayText: k.abbreviation.toUpperCase(),
					type: 'keyword'
				});
			}
		}
		if (k.unknown && !f) {
			texts.push({
				text: k.keyword.toUpperCase(),
				displayText: k.keyword.toUpperCase(),
				type: 'keyword'
			});
			if (k.abbreviation !== null) {
				texts.push({
					text: k.abbreviation.toUpperCase(),
					displayText: k.abbreviation.toUpperCase(),
					type: 'keyword'
				});
			}
		}
	}

	for(var j in snippets) {
		var snippet = snippets[j];
		var found = false;
		for(var t in texts){
			var text = texts[t];
			if(snippet.text === text.text){
				found = true;
				if(snippet.displayText) text.displayText = snippet.displayText;
				if(snippet.snippet) text.snippet = snippet.snippet;
				if(snippet.type) text.type = snippet.type;
			}
		}
		if(!found){
			texts.push(snippet);
		}
	}
	texts.sort(function(a,b){
		if(a.text > b.text) return 1;
		if(a.text < b.text) return -1;
		return 0;
	});
	return texts;
};
