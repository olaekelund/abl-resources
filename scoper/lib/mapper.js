module.exports.run = function (files) {

	var all = {};

	function add(k) {
		if (all[k.keyword]) {
			if (all[k.keyword].keyword === null) {
				all[k.keyword].keyword = k.keyword;
			}
			if (all[k.keyword].without_parenthases === null) {
				all[k.keyword].without_parenthases = k.without_parenthases;
			}
			if (all[k.keyword].with_parenthases === null) {
				all[k.keyword].with_parenthases = k.with_parenthases;
			}
			if (all[k.keyword].reserved === null) {
				all[k.keyword].reserved = k.reserved;
			}
			if (all[k.keyword].abbreviation === null) {
				all[k.keyword].abbreviation = k.abbreviation;
			}
			if (all[k.keyword]['function'] === null) {
				all[k.keyword]['function'] = k['function'];
			}
			if (all[k.keyword].statement === null) {
				all[k.keyword].statement = k.statement;
			}
			if (all[k.keyword].system_reference === null) {
				all[k.keyword].system_reference = k.system_reference;
			}
			if (all[k.keyword].phrase === null) {
				all[k.keyword].phrase = k.phrase;
			}
			if (all[k.keyword].ignore === null) {
				all[k.keyword].ignore = k.ignore;
			}
			if (all[k.keyword].unknown === null) {
				all[k.keyword].unknown = k.unknown;
			}
			if (all[k.keyword].snippet === null) {
				all[k.keyword].snippet = k.snippet;
			}
		} else {
			all[k.keyword] = k;
		}
	}

	function loop(list) {
		for (var i in list) {
			var k = {};
			k.keyword = list[i].keyword || null;
			k.with_parenthases = list[i].with_parenthases || null;
			k.without_parenthases = list[i].without_parenthases || null;
			k.reserved = list[i].reserved || null;
			k.abbreviation = list[i].abbreviation || null;
			k['function'] = list[i]['function'] || null;
			k.statement = list[i].statement || null;
			k.system_reference = list[i].system_reference || null;
			k.phrase = list[i].phrase || null;
			k.ignore = list[i].ignore || null;
			k.unknown = list[i].unknown || null;
			k.snippet = list[i].snippet || null;
			add(k);
		}
	}
	for (var i in files) {
		loop(require('../keywords/' + files[i]));
	}
	return all;
};
