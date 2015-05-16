module.exports.run = function (objects) {
	var scopes = {
		'keyword.function': [],
		'keyword.function.parenthases': [],
		'keyword.statement': [],
		'keyword.systemreference': [],
		'keyword.phrase': [],
		'keyword.other': []
	};

	for (var i in objects) {
		var k = objects[i];
		var f = false;
		if (k.ignore === true) continue;
		if (k['function']) {
			if (k.with_parenthases) {
				scopes['keyword.function.parenthases'].push(objects[i].keyword);
				if (k.abbreviation !== null) {
					scopes['keyword.function.parenthases'].push(objects[i].abbreviation);
				}
			} else {
				scopes['keyword.function'].push(objects[i].keyword);
				if (k.abbreviation !== null) {
					scopes['keyword.function'].push(objects[i].abbreviation);
				}
			}
		}
		if (k.statement) {
			f = true;
			scopes['keyword.statement'].push(objects[i].keyword);
			if (k.abbreviation !== null) {
				scopes['keyword.statement'].push(objects[i].abbreviation);
			}
		}
		if (k.system_reference) {
			f = true;
			scopes['keyword.systemreference'].push(objects[i].keyword);
			if (k.abbreviation !== null) {
				scopes['keyword.systemreference'].push(objects[i].abbreviation);
			}
		}
		/*if (k['phrase']) {
			f = true;
			scopes['keyword.phrase'].push(objects[i].keyword);
			if (k.abbreviation !== null) {
				scopes['keyword.phrase'].push(objects[i].abbreviation);
			}
		}*/
		if (k.unknown && !f && !k.preprocessor) {
			scopes['keyword.other'].push(objects[i].keyword);
			if (k.abbreviation !== null) {
				scopes['keyword.other'].push(objects[i].abbreviation);
			}
		}
	}
	/*
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.phrase'].join('|') + ')(?!-)\\b',
		'name': 'keyword.phrase.abl'
	*/
	var complete_scopes = [{
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.other'].join('|') + ')(?!-)\\b',
		'name': 'keyword.other.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.function'].join('|') + ')(?!-)\\b',
		'name': 'keyword.function.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.statement'].join('|') + ')(?!-)\\b',
		'name': 'keyword.statement.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.systemreference'].join('|') + ')(?!-)\\b',
		'name': 'keyword.systemreference.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.function.parenthases'].join('|') + ')(?!-)(?=\\s*\\()\\b',
		'name': 'keyword.function.parenthases.abl'
	}];
	return complete_scopes;
};