module.exports.run = function (objects) {
	var scopes = {
		'keyword.function': [],
		'keyword.function.parenthases': [],
		'keyword.method': [],
		'keyword.attribute': [],
		'keyword.statement': [],
		'keyword.systemreference': [],
		'keyword.other': [],
		'keyword.widget': [],
		'keyword.handle': []
	};

	function pushOjb(obj, name, type) {
		var t = {};

		if (type == 'attributes') {
			scopes['keyword.attribute'].push(name.toLowerCase());
		} else if (type == 'functions_with_parenthases') {
			scopes['keyword.function.parenthases'].push(name.toLowerCase());
		} else if (type == 'functions_without_parenthases') {
			scopes['keyword.function'].push(name.toLowerCase());
		} else if (type == 'handles') {
			scopes['keyword.handle'].push(name.toLowerCase());
		} else if (type == 'methods') {
			scopes['keyword.method'].push(name.toLowerCase());
		} else if (type == 'statements') {
			scopes['keyword.statement'].push(name.toLowerCase());
		} else if (type == 'system_references') {
			scopes['keyword.systemreference'].push(name.toLowerCase());
		} else if (type == 'widgets') {
			scopes['keyword.widget'].push(name.toLowerCase());
		} else if (type == 'unknowns') {
			scopes['keyword.other'].push(name.toLowerCase());
		}
	}
	for (var o in objects) {
		var arr = objects[o];
		for (var i in arr) {
			var obj = arr[i];
			pushOjb(obj, obj.name, o);
			if (obj.abbreviation) {
				pushOjb(obj, obj.abbreviation, o);
			}
		}
	}
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
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.attribute'].join('|') + ')(?!-)\\b',
		'name': 'keyword.attribute.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.handle'].join('|') + ')(?!-)\\b',
		'name': 'keyword.handle.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.widget'].join('|') + ')(?!-)\\b',
		'name': 'keyword.widget.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.function.parenthases'].join('|') + ')(?!-)(?=\\s*\\()\\b',
		'name': 'keyword.function.parenthases.abl'
	}, {
		'match': '(?i)(?<![a-zA-Z0-9_-])(' + scopes['keyword.method'].join('|') + ')(?!-)(?=\\s*\\()\\b',
		'name': 'keyword.method.abl'
	}];
	return complete_scopes;
};