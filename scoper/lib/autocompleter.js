var snippets = require('../keywords/snippets');

function pushType(arr, k, type) {
	var s = null,
		t = '',
		p = '';

	if (type == 'function' && k.with_parenthases) {
		s = '(${1:value...})';
		t = '()';
	}
	if (type == 'preprocessor') {
		p = '&';
		s = '';
	}
	var o = {};
	o.text = k.keyword.toUpperCase();
	o.displayText = p + k.keyword.toUpperCase() + t;
	o.type = type;
	if (s !== null) o.snippet = p + o.text + s;
	arr.push(o);

	if (k.abbreviation !== null) {
		o = {};
		o.text = k.abbreviation.toUpperCase();
		o.displayText = p + k.abbreviation.toUpperCase() + t;
		o.type = type;
		if (s !== null) o.snippet = p + o.text + s;
		arr.push(o);
	}
}

module.exports.run = function (objects) {
	var completions = [],
		found, k;
	for (var i in objects) {
		k = objects[i];
		if (k.ignore === true) continue;
		found = false;
		if (k['function']) {
			pushType(completions, k, 'function');
		}
		if (k.statement || k.system_reference) {
			found = true;
			if (k.preprocessor) {
				pushType(completions, k, 'preprocessor');
			} else {
				pushType(completions, k, 'keyword');
			}
		}
		if (k.datatype) {
			found = true;
			pushType(completions, k, 'datatype');
		}
		if (!found) {
			if (k.preprocessor) {
				pushType(completions, k, 'preprocessor');
			} else {
				pushType(completions, k, 'keyword');
			}
		}
	}

	for (var j in snippets) {
		var snippet = snippets[j];
		found = false;
		for (var c in completions) {
			var text = completions[c];
			if (snippet.text === text.text && snippet.type === text.type) {
				found = true;
				if (snippet.displayText !== text.displayText) text.displayText = snippet.displayText;
				if (snippet.snippet !== text.snippet) text.snippet = snippet.snippet;
				if (snippet.description !== text.description) text.description = snippet.description;
			}
		}
		if (!found) {
			completions.push(snippet);
		}
	}
	completions.sort(function (a, b) {
		if (a.text > b.text) return 1;
		if (a.text < b.text) return -1;
		return 0;
	});
	return completions;
};