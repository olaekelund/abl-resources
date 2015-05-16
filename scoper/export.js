var mapper = require('./lib/mapper');
var scoper = require('./lib/scoper');
var autocompleter = require('./lib/autocompleter');
var fs = require('fs');

var files = ['keyword_index', 'syntax_reference', 'with_parenthases', 'without_parenthases', 'preprocessor', 'random'];

var objTemp = mapper.run(files);
var objArr = [];
var objects = {};
var o, i;
for (o in objTemp) {
	objArr.push(objTemp[o]);
}
objArr.sort(function (a, b) {
	if (a.keyword > b.keyword) return 1;
	if (a.keyword < b.keyword) return -1;
	return 0;
});
for (i in objArr) {
	objects[objArr[i].keyword] = objArr[i];
}

fs.writeFileSync('./export/objects.json', JSON.stringify(objects, undefined, 4), 'utf8', function (err) {
	console.log(err);
});
/*var random = require('./keywords/random');
var rlist = [];
for (var i in random) {
	var r = random[i];
	if (!objects[r.keyword]) {
		rlist.push(r);
	}
}
fs.writeFileSync('./keywords/random-export.json', JSON.stringify(rlist, undefined, 4), 'utf8', function (err) {
	console.log(err);
});*/
var scopes = scoper.run(objects);
fs.writeFileSync('./export/scopes.json', JSON.stringify(scopes, undefined, 4), 'utf8', function (err) {
	console.log(err);
});

var comlpetions = autocompleter.run(objects);
fs.writeFileSync('./export/completions.json', JSON.stringify(comlpetions, undefined, 4), 'utf8', function (err) {
	console.log(err);
});