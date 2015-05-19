module.exports.run = function (objects) {
	var completions = [];

	function pushOjb(obj, name, type) {
		var t = {};
		t.text = name;
		t.snippet = obj.snippet;
		t.displayText = obj.displayText;
		t.prefix = obj.prefix;
		if (type == 'attributes') {
			t.type = "attribute";
		} else if (type == 'datatypes') {
			t.type = "datatype";
		} else if (type == 'functions_with_parenthases') {
			t.type = 'function';
			if (!obj.displayText) t.displayText = name + '()';
			if (!obj.snippet) t.snippet = name + '(${1:value...})';
		} else if (type == 'functions_without_parenthases') {
			t.type = 'function';
		} else if (type == 'handles') {
			t.type = "handle";
		} else if (type == 'methods') {
			t.type = "method";
			t.displayText = name + '()';
			if (!obj.snippet) t.snippet = name + '(${1:value...})';
		} else if (type == 'preprocessor_directives') {
			t.type = 'preprocessor';
			if (obj.parenthases) t.displayText = name + '()';
		} else if (type == 'statements') {
			t.type = "statement";
		} else if (type == 'system_references') {
			t.type = 'keyword';
		} else if (type == 'widgets') {
			t.type = "widget";
		} else if (type == 'unknowns') {
			t.type = 'keyword';
		} else if (type == 'snippets') {
			t = obj;
		}

		completions.push(t);
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
	completions.sort(function (a, b) {
		if (a.text < b.text) return -1;
		if (a.text > b.text) return 1;
		return 0;
	});
	return completions;
};