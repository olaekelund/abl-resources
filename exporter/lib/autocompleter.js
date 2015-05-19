/*
https://github.com/atom/autocomplete-plus/wiki
*/
module.exports.run = function (objects) {
	var completions = [];

	function pushOjb(obj, name, type) {
		if (obj.ignore) return;
		var t = {};
		t.text = name;
		t.snippet = obj.snippet;
		t.displayText = obj.displayText;
		t.prefix = obj.prefix;
		switch (type) {
		case 'attributes':
			t.type = "attribute";
			break;
		case 'datatypes':
			t.type = "datatype";
			break;
		case 'functions_with_parenthases':
			t.type = 'function';
			if (!obj.displayText) t.displayText = name + '()';
			if (!obj.snippet) t.snippet = name + '(${1:value...})';
			break;
		case 'functions_without_parenthases':
			t.type = 'function';
			break;
		case 'handles':
			t.type = "handle";
			break;
		case 'methods':
			t.type = "method";
			t.displayText = name + '()';
			if (!obj.snippet) t.snippet = name + '(${1:value...})';
			break;
		case 'preprocessor_directives':
			t.type = 'preprocessor';
			if (obj.parenthases) t.displayText = name + '()';
			else t.displayText = '&' + name;
			break;
		case 'statements':
			t.type = "statement";
			break;
		case 'system_references':
			t.type = 'keyword';
			break;
		case 'widgets':
			t.type = "widget";
			break;
		case 'unknowns':
			t.type = 'keyword';
			break;
		case 'webspeed':
			if (obj.preprocessor) {
				t.type = 'preprocessor';
				t.displayText = '&' + name;
			} else t.type = 'variable';
			break;
		case 'snippets':
			t = obj;
			break;

		}
		completions.push(t);
	}
	for (var o in objects) {
		var arr = objects[o];
		for (var i in arr) {
			var obj = arr[i];
			pushOjb(obj, obj.name, o);
			if (obj.abbreviation) {
				/*var temp = obj.name;
				while (temp.length > obj.abbreviation.length) {
					temp = temp.substring(0, temp.length - 1);
					pushOjb(obj, temp, o);
				}*/
				pushOjb(obj, obj.abbreviation, o);
			}
		}
	}
	completions.sort(function (a, b) {
		if (a.text < b.text) return -1;
		if (a.text > b.text) return 1;
		return 0;
	});
	return completions;
};